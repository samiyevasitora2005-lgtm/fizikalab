
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Kirish() {
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
        setXabar("Email yoki parol noto‘g‘ri: " + error.message);
        return;
      }

      router.push("/sinflar");
      router.refresh();
    } catch {
      setXabar("Ulanishda xatolik yuz berdi.");
    } finally {
      setYuklanmoqda(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #172554, #2563eb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "white",
          borderRadius: "22px",
          padding: "35px",
          boxShadow: "0 15px 45px #0002",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#1e40af" }}>
          ⚛️ FizikaLab
        </h1>

        <h2 style={{ textAlign: "center", color: "#172554" }}>
          Akkauntga kirish
        </h2>

        <p style={{ textAlign: "center", color: "#64748b" }}>
          Fizikani tajriba orqali o‘rganing!
        </p>

        <form onSubmit={kirish}>
          <label style={{ display: "block", marginTop: "22px" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email manzilingiz"
            style={inputStyle}
          />

          <label style={{ display: "block", marginTop: "18px" }}>
            Parol
          </label>
          <input
            type="password"
            required
            value={parol}
            onChange={(e) => setParol(e.target.value)}
            placeholder="Parolingiz"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={yuklanmoqda}
            style={{
              width: "100%",
              marginTop: "26px",
              padding: "15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {yuklanmoqda ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>

        {xabar && (
          <p
            role="alert"
            style={{
              marginTop: "18px",
              color: "#b91c1c",
              background: "#fef2f2",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {xabar}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "24px" }}>
          Akkauntingiz yo‘qmi?{" "}
          <Link
            href="/auth/royxatdan-otish"
            style={{ color: "#2563eb", fontWeight: "bold" }}
          >
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "7px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "16px",
  color: "#0f172a",
  background: "white",
  boxSizing: "border-box",
};
