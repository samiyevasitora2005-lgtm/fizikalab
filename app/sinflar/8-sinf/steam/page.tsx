
"use client";

import { useState } from "react";

export default function SteamPage() {
  const [ishqalash, setIshqalash] = useState(0);
  const [natija, setNatija] = useState(false);

  const zaryad = Math.min(ishqalash * 10, 100);
  const tortadi = zaryad >= 40;

  function qaytaBoshlash() {
    setIshqalash(0);
    setNatija(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-5 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-bold text-blue-900">
          ⚡ STEAM virtual laboratoriya
        </h1>

        <p className="mt-3 text-center text-lg">
          8-sinf fizika — Jismlarning zaryadlanishi
        </p>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-bold text-blue-800">
            🎈 Sharni ishqalab zaryadlaymiz
          </h2>

          <p className="mt-2 text-slate-600">
            Sharni jun matoga bir necha marta ishqalang.
            Zaryad miqdori qanday o‘zgarishini kuzating.
          </p>

          <div className="relative mt-6 flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-sky-50">
            <div
              className="relative flex h-36 w-32 items-center justify-center rounded-[50%] bg-red-500 text-2xl font-bold text-white shadow-xl transition-all duration-300"
              style={{
                transform: `translateX(${ishqalash % 2 === 0 ? -8 : 8}px)`,
              }}
            >
              {zaryad > 0 ? "− − −" : "🎈"}
              <div className="absolute -bottom-14 h-16 w-px bg-slate-500" />
            </div>

            <div className="mt-20 flex gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className="text-3xl transition-all duration-500"
                  style={{
                    transform: tortadi
                      ? `translateY(-${25 + n * 7}px)`
                      : "translateY(0)",
                  }}
                >
                  📄
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold">
              Manfiy zaryadlanish darajasi: {zaryad}%
            </p>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${zaryad}%` }}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setIshqalash((v) => Math.min(v + 1, 10))}
              className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
            >
              🧶 Jun matoga ishqalash
            </button>

            <button
              onClick={qaytaBoshlash}
              className="rounded-xl bg-slate-200 px-5 py-3 font-bold hover:bg-slate-300"
            >
              🔄 Qayta boshlash
            </button>
          </div>

          <p className="mt-5 rounded-xl bg-amber-50 p-4">
            {tortadi
              ? "✅ Shar yetarlicha zaryadlandi! Qog‘oz bo‘laklari elektrostatik tortishish natijasida sharga yaqinlashmoqda."
              : "🔍 Sharni ishqalashni davom ettiring. Elektronlar jun matodan sharga o‘tadi."}
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-bold text-blue-800">
            🧠 STEAM topshirig‘i
          </h2>

          <p className="mt-3">
            Nima sababdan ishqalangan shar elektr jihatdan
            neytral qog‘oz bo‘laklarini tortadi?
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => setNatija(true)}
              className="rounded-xl bg-cyan-100 p-4 text-left hover:bg-cyan-200"
            >
              A) Qog‘ozning og‘irligi kamayadi
            </button>
            <button
              onClick={() => setNatija(true)}
              className="rounded-xl bg-cyan-100 p-4 text-left hover:bg-cyan-200"
            >
              B) Qog‘ozda zaryadlar qayta taqsimlanadi
            </button>
            <button
              onClick={() => setNatija(true)}
              className="rounded-xl bg-cyan-100 p-4 text-left hover:bg-cyan-200"
            >
              C) Shar magnitga aylanadi
            </button>
          </div>

          {natija && (
            <p className="mt-4 rounded-xl bg-green-100 p-4">
              To‘g‘ri javob: B. Zaryadlangan shar qog‘ozdagi
              zaryadlarning qayta taqsimlanishiga sabab bo‘ladi.
              Natijada tortishish kuchi yuzaga keladi.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
