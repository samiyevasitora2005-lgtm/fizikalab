"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Footer, Navbar } from "../../components/Site";

type Rol = "oquvchi" | "oqituvchi";

export default function RoyxatdanOtish() {
  const [ism, setIsm] = useState("");
  const [familiya, setFamiliya] = useState("");
  const [email, setEmail] = useState("");
  const [parol, setParol] = useState("");
  const [rol, setRol] = useState<Rol>("oquvchi");
  const [xabar, setXabar] = useState("");
  const [yuklanmoqda, setYuklanmoqda] = useState(false);

  async function royxatdanOtish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setXabar("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      setXabar("Supabase sozlamalari topilmadi.");
      return;
    }

    setYuklanmoqda(true);

    try {
      const supabase = createClient(url, key);

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: parol,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            ism: ism.trim(),
            familiya: familiya.trim(),
            rol,
          },
        },
      });

      if (error) {
        setXabar("Xatolik: " + error.message);
      } else {
        setXabar("Muvaffaqiyatli ro‘yxatdan o‘tdingiz!");

        window.location.href = "/sinflar";
      }
    } catch {
      setXabar("Ulanishda xatolik yuz berdi.");
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

  const ok = xabar.startsWith("Muvaffaqiyatli");

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
                background: "var(--sun)",
                boxShadow: "0 4px 0 var(--sun-e)",
                padding: "6px 16px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              yangi hisob
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)" }}>Ro‘yxatdan o‘tish</h1>
            <p style={{ color: "var(--muted)" }}>FizikaLab bilan fizikani o‘ynab o‘rganishni boshlang.</p>
          </div>

          <form onSubmit={royxatdanOtish} style={{ display: "grid", gap: 18 }}>
            <label style={labelStyle}>
              Ism
              <input
                style={inputStyle}
                value={ism}
                onChange={(e) => setIsm(e.target.value)}
                required
                placeholder="Ismingiz"
              />
            </label>

            <label style={labelStyle}>
              Familiya
              <input
                style={inputStyle}
                value={familiya}
                onChange={(e) => setFamiliya(e.target.value)}
                required
                placeholder="Familiyangiz"
              />
            </label>

            <label style={labelStyle}>
              Email
              <input
                type="email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@gmail.com"
              />
            </label>

            <label style={labelStyle}>
              Parol
              <input
                type="password"
                style={inputStyle}
                value={parol}
                onChange={(e) => setParol(e.target.value)}
                minLength={6}
                required
                placeholder="Kamida 6 ta belgi"
              />
            </label>

            <div role="group" aria-label="Kim sifatida ro‘yxatdan o‘tasiz?">
              <div style={labelStyle}>Kim sifatida ro‘yxatdan o‘tasiz?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginTop: 10 }}>
                {(
                  [
                    ["oquvchi", "O‘quvchi", "mint"],
                    ["oqituvchi", "O‘qituvchi", "berry"],
                  ] as [Rol, string, string][]
                ).map(([val, nom, c]) => (
                  <button
                    key={val}
                    type="button"
                    aria-pressed={rol === val}
                    onClick={() => setRol(val)}
                    style={{
                      minHeight: 56,
                      border: 0,
                      borderRadius: 18,
                      background: `var(--${c})`,
                      color: "var(--ink)",
                      font: "800 17px/1 var(--text)",
                      cursor: "pointer",
                      boxShadow: rol === val ? `0 0 0 var(--${c}-e)` : `0 6px 0 var(--${c}-e)`,
                      transform: rol === val ? "translateY(6px)" : "none",
                      outline: rol === val ? "4px solid var(--ink)" : "none",
                      outlineOffset: 3,
                      opacity: rol === val ? 1 : 0.8,
                    }}
                  >
                    {nom}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={yuklanmoqda}
              className="btn blue"
              style={{ justifyContent: "center", marginTop: 8, opacity: yuklanmoqda ? 0.6 : 1 }}
            >
              {yuklanmoqda ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
            </button>
          </form>

          {xabar && (
            <p
              role="status"
              style={{
                marginTop: 20,
                padding: "14px 18px",
                borderRadius: 18,
                background: ok ? "var(--mint)" : "var(--berry)",
                color: "var(--ink)",
                fontWeight: 800,
              }}
            >
              {xabar}
            </p>
          )}

          <p style={{ textAlign: "center", marginTop: 24 }}>
            Akkauntingiz bormi?{" "}
            <Link href="/auth/kirish" style={{ color: "var(--blue)", textDecoration: "underline", fontWeight: 800 }}>
              Kirish
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
