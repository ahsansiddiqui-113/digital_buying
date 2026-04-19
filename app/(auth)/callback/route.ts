import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

let hasWarnedMissingUsersTable = false;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle error parameters from Supabase
  if (error) {
    console.error("Auth error from Supabase:", { error, errorDescription });

    let errorMessage = "auth_error";
    if (error === "access_denied") {
      errorMessage = "access_denied";
    } else if (errorDescription?.includes("expired")) {
      errorMessage = "link_expired";
    }

    return NextResponse.redirect(
      new URL(`/login?error=${errorMessage}`, request.url)
    );
  }

  // Handle successful code exchange
  if (code) {
    try {
      const cookieStore = await cookies();

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            },
          },
        }
      );

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("Code exchange error:", exchangeError);
        return NextResponse.redirect(
          new URL(`/login?error=code_exchange_failed`, request.url)
        );
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id && user.email) {
        const admin = createAdminClient();
        const { error: profileError } = await admin.from("users").upsert(
          {
            id: user.id,
            email: user.email,
          },
          {
            onConflict: "id",
            ignoreDuplicates: true,
          }
        );

        if (profileError) {
          const isMissingUsersTable = profileError.message.includes(
            "Could not find the table 'public.users'"
          );

          if (isMissingUsersTable) {
            if (!hasWarnedMissingUsersTable) {
              hasWarnedMissingUsersTable = true;
              console.warn(
                "User sync skipped in callback: public.users table is missing. Run DB setup SQL."
              );
            }
          } else {
          console.error("Failed to sync user profile:", profileError.message);
          }
        }
      }

      // Successfully authenticated - redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL(`/login?error=callback_error`, request.url)
      );
    }
  }

  // No code or error - redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}
