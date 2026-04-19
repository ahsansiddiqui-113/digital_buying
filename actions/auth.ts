"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

let hasWarnedMissingUsersTable = false;

export type AuthActionResult = {
  ok: boolean;
  error?: string;
  code?: "invalid_credentials" | "rate_limited" | "unknown";
};

function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

async function ensureUserRecord(userId: string, email: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("users").upsert(
    {
      id: userId,
      email,
    },
    {
      onConflict: "id",
      ignoreDuplicates: true,
    }
  );

  if (error) {
    const isMissingUsersTable = error.message.includes(
      "Could not find the table 'public.users'"
    );

    if (isMissingUsersTable) {
      if (!hasWarnedMissingUsersTable) {
        hasWarnedMissingUsersTable = true;
        console.warn(
          "User sync skipped: public.users table is missing. Run the DB setup SQL to enable admin profile sync."
        );
      }
      return;
    }

    console.error("Failed to sync user record:", error.message);
  }
}

export async function signUp(email: string, password: string): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    const errorMessage = error.message || "Failed to create account";
    const isRateLimited = errorMessage.toLowerCase().includes("rate limit");

    return {
      ok: false,
      error: errorMessage,
      code: isRateLimited ? "rate_limited" : "unknown",
    };
  }

  if (data.user?.id && data.user.email) {
    await ensureUserRecord(data.user.id, data.user.email);
  }

  return { ok: true };
}

export async function signIn(email: string, password: string): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const errorMessage = error.message || "Failed to sign in";
    const lowerError = errorMessage.toLowerCase();

    if (lowerError.includes("invalid login credentials")) {
      return {
        ok: false,
        error: "Incorrect email or password. If this account was created with magic link, use magic link sign-in.",
        code: "invalid_credentials",
      };
    }

    if (lowerError.includes("rate limit")) {
      return {
        ok: false,
        error: "Too many attempts. Please wait a minute and try again.",
        code: "rate_limited",
      };
    }

    return {
      ok: false,
      error: errorMessage,
      code: "unknown",
    };
  }

  if (data.user?.id && data.user.email) {
    await ensureUserRecord(data.user.id, data.user.email);
  }

  return { ok: true };
}

export async function sendMagicLink(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getAppUrl()}/auth/callback`,
    },
  });

  if (error) {
    const errorMessage = error.message || "Failed to send magic link";
    throw new Error(errorMessage);
  }
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (user.email) {
    await ensureUserRecord(user.id, user.email);
  }

  return session;
}
