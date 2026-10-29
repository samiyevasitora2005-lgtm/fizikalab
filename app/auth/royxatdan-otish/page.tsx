
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    color: "#0f172a",
    background: "white",
    marginTop: "6px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#172554,#2563eb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 15px 45px #0003",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
            color: "#1d4ed8",
          }}
        >
          FizikaLab
        </h1>

        <h2
          style={{
            textAlign: "center",
            margin: "12px 0 24px",
            color: "#334155",
            fontSize: "20px",
          }}
        >
          Ro‘yxatdan o‘tish
        </h2>

        <form onSubmit={royxatdanOtish}>
          <label>
            Ism
            <input
              style={inputStyle}
              value={ism}
              onChange={(e) => setIsm(e.target.value)}
              required
              placeholder="Ismingiz"
            />
          </label>

          <label style={{ display: "block", marginTop: "14px" }}>
            Familiya
            <input
              style={inputStyle}
              value={familiya}
              onChange={(e) => setFamiliya(e.target.value)}
              required
              placeholder="Familiyangiz"
            />
          </label>

          <label style={{ display: "block", marginTop: "14px" }}>
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

          <label style={{ display: "block", marginTop: "14px" }}>
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

          <label style={{ display: "block", marginTop: "14px" }}>
            Kim sifatida ro‘yxatdan o‘tasiz?
            <select
              style={inputStyle}
              value={rol}
              onChange={(e) => setRol(e.target.value as Rol)}
            >
              <option value="oquvchi">O‘quvchi</option>
              <option value="oqituvchi">O‘qituvchi</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={yuklanmoqda}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "24px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: yuklanmoqda ? 0.6 : 1,
            }}
          >
            {yuklanmoqda
              ? "Yuborilmoqda..."
              : "Ro‘yxatdan o‘tish"}
          </button>
        </form>

        {xabar && (
          <p
            role="status"
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#eff6ff",
              borderRadius: "8px",
              color: "#1e40af",
            }}
          >
            {xabar}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Akkauntingiz bormi?{" "}
          <Link href="/auth/kirish" style={{ color: "#2563eb" }}>
            Kirish
          </Link>
        </p>
      </div>
    </main>
  );
}
