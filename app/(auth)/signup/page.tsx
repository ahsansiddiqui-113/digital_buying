"use client";

import { useState } from "react";
import Link from "next/link";
import { sendMagicLink, signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await signUp(email, password);

      if (!result.ok) {
        const errorMessage = result.error || "Unable to create account. Please try again.";
        let displayMessage = "Unable to create account. Please try again.";

        if (result.code === "rate_limited" || errorMessage.includes("rate limit")) {
          displayMessage = "Too many requests. Please wait 1 minute before trying again.";
        } else if (errorMessage.toLowerCase().includes("password")) {
          displayMessage = "Password must be stronger. Use at least 8 characters.";
        }

        setMessage({
          type: "error",
          text: displayMessage,
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Account created successfully. You can now sign in.",
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      let displayMessage = "Unable to create account. Please try again.";

      if (errorMessage.includes("rate limit")) {
        displayMessage = "Too many requests. Please wait 1 minute before trying again.";
      } else if (errorMessage.toLowerCase().includes("password")) {
        displayMessage = "Password must be stronger. Use at least 8 characters.";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_10%_0%,#e0f2fe_0%,transparent_40%),radial-gradient(circle_at_90%_20%,#cffafe_0%,transparent_35%),linear-gradient(180deg,#f8fafc_0%,#f0fdfa_45%,#f8fafc_100%)] px-4 py-14">
      <Card className="w-full max-w-md border-slate-200/80 bg-white/95 shadow-xl backdrop-blur">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">New Account</p>
          <CardTitle className="text-slate-900">Create Your Account</CardTitle>
          <p className="mt-2 text-sm text-slate-600">Set your credentials once. No forced email-link login loop.</p>
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
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={loading || magicLoading}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Creating Account..." : "Create Account"}
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
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
