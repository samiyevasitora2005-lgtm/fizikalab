
"use client";

import { useState } from "react";

export default function Sertifikat() {
  const [ism, setIsm] = useState("");
  const [familiya, setFamiliya] = useState("");
  const [tayyor, setTayyor] = useState(false);

  const sana = new Date().toLocaleDateString("uz-UZ");

  return (
    <main className="min-h-screen bg-blue-50 p-5">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-3 text-center text-3xl font-bold text-blue-800">
          🏆 FizikaLab — Sertifikat
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Ism-familiyangizni kiriting va sertifikat namunasini yarating.
        </p>

        {!tayyor && (
          <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
            <input
              type="text"
              placeholder="Ismingiz"
              value={ism}
              onChange={(e) => setIsm(e.target.value)}
              className="mb-3 w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="Familiyangiz"
              value={familiya}
              onChange={(e) => setFamiliya(e.target.value)}
              className="mb-4 w-full rounded border p-3"
            />

            <button
              onClick={() => {
                if (ism.trim() && familiya.trim()) {
                  setTayyor(true);
                } else {
                  alert("Ism va familiyangizni kiriting!");
                }
              }}
              className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white"
            >
              Sertifikat namunasini yaratish
            </button>
          </div>
        )}

        {tayyor && (
          <>
            <div
              id="sertifikat"
              className="rounded-xl border-8 border-blue-800 bg-white p-8 text-center shadow-lg"
            >
              <div className="border-2 border-yellow-500 p-6">
                <h2 className="text-4xl font-extrabold text-blue-900">
                  FizikaLab
                </h2>

                <p className="mt-3 text-lg text-gray-500">
                  Interaktiv fizika ta'lim platformasi
                </p>

                <div className="my-6 text-5xl">🏅</div>

                <h3 className="text-4xl font-bold text-yellow-600">
                  SERTIFIKAT NAMUNASI
                </h3>

                <p className="mt-8 text-lg">
                  Ushbu sertifikat namunasi
                </p>

                <p className="my-5 text-3xl font-bold text-blue-900">
                  {ism} {familiya}
                </p>

                <p className="text-lg">
                  nomiga shakllantirildi.
                </p>

                <p className="mt-6 text-gray-600">
                  Fizika faniga bo'lgan qiziqishingizni
                  qo'llab-quvvatlaymiz!
                </p>

                <p className="mt-10 text-gray-500">
                  Sana: {sana}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white"
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
            top: 0;
            left: 0;
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
