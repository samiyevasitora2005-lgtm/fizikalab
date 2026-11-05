"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { Footer, Navbar } from "../../components/Site";

export default function KirishSahifasi() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [parol, setParol] = useState("");
  const [xabar, setXabar] = useState("");
  const [yuklanmoqda, setYuklanmoqda] = useState(false);

  async function kirish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setXabar("");
    setYuklanmoqda(true);

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!url || !key) {
        setXabar("Supabase sozlamalari topilmadi.");
        return;
      }

      const supabase = createClient(url, key);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: parol,
      });

      if (error) {
        setXabar("Kirishda xatolik: " + error.message);
        return;
      }

      router.push("/sinflar");
      router.refresh();
    } catch {
      setXabar("Internetga ulanishda xatolik yuz berdi.");
    } finally {
      setYuklanmoqda(false);
    }
  }

  const inputStyle: CSSProperties = {
    width: "100%",
    minHeight: 54,
    padding: "0 18px",
    marginTop: 8,
    border: "3px solid #dbe7f5",
    borderRadius: 18,
    background: "#f7fbff",
    color: "var(--ink)",
    font: "700 17px/1 var(--text)",
    outlineOffset: 3,
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontWeight: 800,
  };

  return (
    <>
      <Navbar />
      <main className="wrap" style={{ paddingBlock: "20px 10px" }}>
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
            background: "var(--white)",
            borderRadius: 36,
            boxShadow: "0 12px 0 #c9deee",
            padding: "clamp(22px, 5vw, 40px)",
          }}
        >
          <div style={{ textAlign: "center", display: "grid", gap: 8, marginBottom: 26 }}>
            <span
              style={{
                justifySelf: "center",
                background: "var(--mint)",
                boxShadow: "0 4px 0 var(--mint-e)",
                padding: "6px 16px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              qaytganingiz bilan!
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)" }}>Akkauntga kirish</h1>
            <p style={{ color: "var(--muted)" }}>Fizikani tajriba orqali o‘rganing!</p>
          </div>

          <form onSubmit={kirish} style={{ display: "grid", gap: 18 }}>
            <label style={labelStyle}>
              Email manzilingiz
              <input
                type="email"
                placeholder="Emailingizni kiriting"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Parolingiz
              <input
                type="password"
                placeholder="Parolingizni kiriting"
                value={parol}
                onChange={(e) => setParol(e.target.value)}
                required
                style={inputStyle}
              />
            </label>

            <button
              type="submit"
              disabled={yuklanmoqda}
              className="btn blue"
              style={{ justifyContent: "center", marginTop: 8, opacity: yuklanmoqda ? 0.6 : 1 }}
            >
              {yuklanmoqda ? "Kirilmoqda..." : "Kirish"}
            </button>
          </form>

          {xabar && (
            <div
              role="alert"
              style={{
                marginTop: 20,
                padding: "14px 18px",
                borderRadius: 18,
                background: "var(--berry)",
                color: "var(--ink)",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {xabar}
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: 24 }}>
            Akkauntingiz yo‘qmi?{" "}
            <Link
              href="/auth/royxatdan-otish"
              style={{ color: "var(--blue)", textDecoration: "underline", fontWeight: 800 }}
            >
              Ro‘yxatdan o‘tish
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
