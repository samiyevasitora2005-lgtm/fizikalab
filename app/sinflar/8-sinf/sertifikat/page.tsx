
"use client";

import { useState } from "react";

export default function SakkizinchiSinfSertifikat() {
  const [ism, setIsm] = useState("");
  const [familiya, setFamiliya] = useState("");
  const [tayyor, setTayyor] = useState(false);

  const sana = new Date().toLocaleDateString("uz-UZ");

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-blue-900">
          🏆 FizikaLab — 8-sinf sertifikati
        </h1>

        <p className="my-5 text-center text-gray-600">
          Sertifikat namunasini ko'rish uchun
          ism va familiyangizni kiriting.
        </p>

        {!tayyor ? (
          <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <input
              value={ism}
              onChange={(e) => setIsm(e.target.value)}
              placeholder="Ismingiz"
              className="mb-4 w-full rounded-lg border p-3"
            />

            <input
              value={familiya}
              onChange={(e) => setFamiliya(e.target.value)}
              placeholder="Familiyangiz"
              className="mb-5 w-full rounded-lg border p-3"
            />

            <button
              onClick={() => {
                if (!ism.trim() || !familiya.trim()) {
                  alert("Ism va familiyangizni kiriting!");
                  return;
                }
                setTayyor(true);
              }}
              className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white"
            >
              Sertifikat namunasini ko'rish
            </button>
          </div>
        ) : (
          <>
            <section
              id="sertifikat"
              className="rounded-xl border-8 border-blue-900 bg-white p-6 text-center shadow-xl"
            >
              <div className="border-4 border-amber-400 p-8">
                <h2 className="text-4xl font-extrabold text-blue-900">
                  FizikaLab
                </h2>

                <p className="mt-2 text-gray-500">
                  Interaktiv fizika ta'lim platformasi
                </p>

                <div className="my-6 text-5xl">🏅</div>

                <h3 className="text-4xl font-bold text-amber-600">
                  SERTIFIKAT NAMUNASI
                </h3>

                <p className="mt-7 text-lg">
                  Ushbu sertifikat namunasi
                </p>

                <p className="my-5 text-3xl font-bold text-blue-900">
                  {ism} {familiya}
                </p>

                <p className="text-lg">
                  nomiga 8-sinf fizika kursi uchun
                  shakllantirildi.
                </p>

                <p className="mt-8 text-gray-500">
                  Sana: {sana}
                </p>
              </div>
            </section>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white"
              >
                📥 PDF sifatida saqlash
              </button>

              <button
                onClick={() => setTayyor(false)}
                className="rounded-lg bg-gray-600 px-6 py-3 text-white"
              >
                Orqaga
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #sertifikat,
          #sertifikat * {
            visibility: visible;
          }

          #sertifikat {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
          }

          @page {
            size: A4 landscape;
            margin: 10mm;
          }
        }
      `}</style>
    </main>
  );
}
