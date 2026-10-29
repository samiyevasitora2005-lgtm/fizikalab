
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      const key =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    marginTop: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "16px",
    background: "white",
    color: "#0f172a",
    boxSizing: "border-box",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #172554, #2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "460px",
          padding: "35px",
          borderRadius: "22px",
          boxShadow: "0 15px 45px #0002",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "34px",
            color: "#1d4ed8",
            fontWeight: "bold",
          }}
        >
          ⚛️ FizikaLab
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#172554",
            marginTop: "15px",
            fontSize: "25px",
          }}
        >
          Akkauntga kirish
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginTop: "10px",
          }}
        >
          Fizikani tajriba orqali o‘rganing!
        </p>

        <form onSubmit={kirish}>
          <label
            style={{
              display: "block",
              marginTop: "25px",
              color: "#172554",
            }}
          >
            Email manzilingiz
          </label>

          <input
            type="email"
            placeholder="Emailingizni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginTop: "20px",
              color: "#172554",
            }}
          >
            Parolingiz
          </label>

          <input
            type="password"
            placeholder="Parolingizni kiriting"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={yuklanmoqda}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "28px",
              background: yuklanmoqda
                ? "#93c5fd"
                : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: yuklanmoqda
                ? "not-allowed"
                : "pointer",
            }}
          >
            {yuklanmoqda
              ? "Kirilmoqda..."
              : "Kirish"}
          </button>
        </form>

        {xabar && (
          <div
            role="alert"
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              background: "#fef2f2",
              color: "#b91c1c",
              textAlign: "center",
            }}
          >
            {xabar}
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#334155",
          }}
        >
          Akkauntingiz yo‘qmi?{" "}
          <Link
            href="/auth/royxatdan-otish"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
            }}
          >
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </main>
  );
}
