"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ruxsat, setRuxsat] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      router.replace("/auth/kirish");
      return;
    }

    const supabase = createClient(url, key);
    let bekor = false;

    supabase.auth.getSession().then(({ data }) => {
      if (bekor) return;
      if (data.session) setRuxsat(true);
      else router.replace("/auth/kirish");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setRuxsat(false);
        router.replace("/auth/kirish");
      }
    });

    return () => {
      bekor = true;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  if (!ruxsat) {
    return (
      <main
        className="wrap"
        style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}
      >
        <p style={{ font: "600 24px/1.3 var(--display)", color: "var(--blue)" }}>
          Tekshirilmoqda...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
