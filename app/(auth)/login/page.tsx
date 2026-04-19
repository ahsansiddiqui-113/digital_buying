"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { sendMagicLink, signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle error from URL parameters
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      let errorText = "An error occurred";
      if (error === "link_expired") {
        errorText = "Your sign-in link has expired. Please request a new one.";
      } else if (error === "access_denied") {
        errorText = "Access denied. Please try again.";
      } else if (error === "code_exchange_failed") {
        errorText = "Failed to sign you in. Please try again.";
      }
      setMessage({ type: "error", text: errorText });
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await signIn(email, password);

      if (!result.ok) {
        setMessage({
          type: "error",
          text: result.error || "Unable to sign in. Please check your credentials.",
        });
        return;
      }

      const redirectTo = searchParams.get("redirect") || "/admin";
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      let displayMessage = "Unable to sign in. Please check your credentials.";

      if (errorMessage.includes("rate limit")) {
        displayMessage = "Too many requests. Please wait 1 minute before trying again.";
      } else if (errorMessage.includes("Invalid login credentials")) {
        displayMessage = "Incorrect email or password.";
      }

      setMessage({
        type: "error",
        text: displayMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    setMagicLoading(true);
    setMessage(null);

    try {
      await sendMagicLink(email);
      setMessage({
        type: "success",
        text: "Magic link sent. Check your email inbox.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send magic link";
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setMagicLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#cffafe_0%,transparent_40%),radial-gradient(circle_at_80%_0%,#bfdbfe_0%,transparent_35%),linear-gradient(160deg,#f8fafc_0%,#ecfeff_45%,#f1f5f9_100%)] px-4 py-14">
      <Card className="w-full max-w-md border-slate-200/80 bg-white/95 shadow-xl backdrop-blur">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Admin Access</p>
          <CardTitle className="text-slate-900">Sign In to DigitalMarket</CardTitle>
          <p className="mt-2 text-sm text-slate-600">Use your email and password. Magic link is optional.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || magicLoading}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={loading || magicLoading}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:opacity-60"
              />
            </div>

            {message && (
              <div
                className={`rounded-xl border p-4 text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || magicLoading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleMagicLink}
              disabled={!email || loading || magicLoading}
            >
              {magicLoading ? "Sending Link..." : "Use Magic Link Instead"}
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-cyan-700 hover:text-cyan-800">
                Create one
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
