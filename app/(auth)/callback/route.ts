import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

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

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Supabase auth error:", error);
        return NextResponse.redirect(`${request.nextUrl.origin}/login?error=auth_failed`);
      }

      // Successfully authenticated
      return NextResponse.redirect(`${request.nextUrl.origin}/`);
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(`${request.nextUrl.origin}/login?error=callback_error`);
    }
  }

  // No code provided
  return NextResponse.redirect(`${request.nextUrl.origin}/login`);
}
