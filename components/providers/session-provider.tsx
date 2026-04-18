"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const supabase = createClient();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Session change detected
      if (event === "SIGNED_IN") {
        // User signed in - session is now active
      } else if (event === "SIGNED_OUT") {
        // User signed out - clear session
      } else if (event === "TOKEN_REFRESHED") {
        // Token automatically refreshed - user stays logged in
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return children;
}
