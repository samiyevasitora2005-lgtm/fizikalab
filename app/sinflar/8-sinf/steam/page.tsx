
"use client";

import { useState } from "react";

export default function SteamPage() {
  const [ishqalash, setIshqalash] = useState(0);
  const [yaqin, setYaqin] = useState(false);

  const zaryadlangan = ishqalash >= 5;

  function qayta() {
    setIshqalash(0);
    setYaqin(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-blue-100 p-4 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-3xl font-bold text-blue-900">
          ⚡ STEAM virtual laboratoriya
        </h1>
        <h2 className="mt-3 text-center text-xl font-semibold">
          8-sinf: Jismlarning zaryadlanishi
        </h2>
        <p className="mt-3 text-center text-slate-600">
          Sharni jun matoga ishqalang va qog‘oz bo‘laklarining
          qanday tortilishini kuzating.
        </p>

        <div className="mt-7 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
          <div className="bg-amber-50 p-3 text-center font-semibold">
            🔬 Tajriba stoli
          </div>

          <svg
            viewBox="0 0 800 430"
            className="w-full"
            role="img"
            aria-label="Qizil shar, jun mato va qog‘oz bo‘laklari bilan elektrostatik tajriba"
          >
            <defs>
              <radialGradient id="balloon">
                <stop offset="0" stopColor="#ff9b9b" />
                <stop offset="0.65" stopColor="#ef4444" />
                <stop offset="1" stopColor="#991b1b" />
              </radialGradient>
              <pattern id="wool" width="18" height="18" patternUnits="userSpaceOnUse">
                <path
                  d="M0 9 Q5 0 9 9 T18 9 M0 17 Q5 8 9 17 T18 17"
                  fill="none"
                  stroke="#a16207"
                  strokeWidth="2"
                />
              </pattern>
            </defs>

            <rect width="800" height="430" fill="#e0f2fe" />
            <rect y="310" width="800" height="120" fill="#c28b58" />
            <rect y="310" width="800" height="13" fill="#8b5e34" />

            <text x="165" y="42" fontSize="21" fontWeight="bold" textAnchor="middle" fill="#334155">
              Jun mato
            </text>
            <text x="395" y="42" fontSize="21" fontWeight="bold" textAnchor="middle" fill="#334155">
              Shar
            </text>
            <text x="660" y="42" fontSize="21" fontWeight="bold" textAnchor="middle" fill="#334155">
              Qog‘oz
            </text>

            <g
              style={{
                transform: `translateX(${ishqalash % 2 === 0 ? 0 : 32}px)`,
                transition: "transform 0.35s ease",
              }}
            >
              <rect x="85" y="175" width="155" height="110" rx="14" fill="#f5deb3" stroke="#92400e" strokeWidth="4" />
              <rect x="91" y="181" width="143" height="98" rx="10" fill="url(#wool)" />
            </g>

            <g
              style={{
                transform: `translateX(${yaqin && zaryadlangan ? 105 : 0}px)`,
                transition: "transform 1s ease",
              }}
            >
              <ellipse cx="385" cy="160" rx="84" ry="108" fill="url(#balloon)" stroke="#991b1b" strokeWidth="3" />
              <ellipse cx="357" cy="116" rx="17" ry="42" fill="white" opacity=".28" transform="rotate(22 357 116)" />
              <path d="M375 267 L395 267 L385 282 Z" fill="#b91c1c" />
              <path d="M385 282 Q410 310 380 335" fill="none" stroke="#64748b" strokeWidth="3" />
              {zaryadlangan && Array.from({ length: 9 }, (_, i) => (
                <text
                  key={i}
                  x={328 + (i % 3) * 55}
                  y={110 + Math.floor(i / 3) * 58}
                  fontSize="26"
                  fontWeight="bold"
                  fill="white"
                >
                  −
                </text>
              ))}
            </g>

            {Array.from({ length: 7 }, (_, i) => {
              const x = 570 + (i % 4) * 46;
              const y = 285 + Math.floor(i / 4) * 17;
              const tortildi = yaqin && zaryadlangan;
              return (
                <g
                  key={i}
                  style={{
                    transform: tortildi
                      ? `translate(${-65 - (i % 3) * 15}px, ${-70 - (i % 4) * 18}px) rotate(${-15 + i * 6}deg)`
                      : "none",
                    transformOrigin: `${x}px ${y}px`,
                    transition: `transform ${0.8 + i * 0.12}s ease`,
                  }}
                >
                  <rect
                    x={x}
                    y={y}
                    width="29"
                    height="19"
                    rx="2"
                    fill={i % 2 ? "#fff7ed" : "#ffffff"}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => {
              setIshqalash((n) => Math.min(n + 1, 10));
              setYaqin(false);
            }}
            className="rounded-2xl bg-orange-500 px-4 py-4 font-bold text-white hover:bg-orange-600"
          >
            🧶 Sharni ishqalash
          </button>
          <button
            onClick={() => setYaqin(true)}
            className="rounded-2xl bg-blue-700 px-4 py-4 font-bold text-white hover:bg-blue-800"
          >
            🎈 Qog‘ozga yaqinlashtirish
          </button>
          <button
            onClick={qayta}
            className="rounded-2xl bg-slate-700 px-4 py-4 font-bold text-white hover:bg-slate-800"
          >
            🔄 Qayta boshlash
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-5 shadow">
          <div className="flex justify-between font-semibold">
            <span>Ishqalashlar soni: {ishqalash}</span>
            <span>{Math.min(ishqalash * 10, 100)}% (shartli ko‘rsatkich)</span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${ishqalash * 10}%` }}
            />
          </div>
          <p className="mt-4 text-lg">
            {!zaryadlangan
              ? "Jun matoga ishqalaganda elektronlar shar yuzasiga o‘tadi. Tugmani kamida 5 marta bosing."
              : !yaqin
              ? "Shar manfiy zaryadlandi! Endi uni qog‘oz bo‘laklariga yaqinlashtiring."
              : "Ajoyib! Neytral qog‘oz bo‘laklari qutblanish natijasida zaryadlangan sharga tortildi."}
          </p>
        </div>

        <div className="mt-5 rounded-2xl bg-indigo-50 p-5">
          <h3 className="text-xl font-bold text-indigo-900">📚 Fizik xulosa</h3>
          <p className="mt-2 leading-7">
            Shar jun matoga ishqalanganda materiallar orasida elektronlar
            almashinadi. Ushbu tajribada shar elektronlarni qabul qilib
            manfiy zaryadlanadi. Zaryadlangan shar neytral qog‘ozda
            zaryadlarning qayta taqsimlanishiga sabab bo‘ladi va
            qog‘oz bo‘laklarini o‘ziga tortadi.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Eslatma: ishqalash foizi va tortilish harakati ta’limiy
            model bo‘lib, haqiqiy zaryad miqdorini o‘lchamaydi.
          </p>
        </div>
      </div>
    </main>
  );
}
