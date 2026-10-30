
"use client";

import { useState } from "react";

export default function VirtualLaboratoriya() {
  const [bosqich, setBosqich] = useState(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 p-5 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-3 text-center text-3xl font-bold">
          8-sinf Fizika — Virtual laboratoriya
        </h1>

        <p className="mb-8 text-center text-blue-100">
          14-laboratoriya ishi
        </p>

        {bosqich === 1 ? (
          <div className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">
              Elektr zanjirni yig‘ish, uning turli qismlaridagi
              tok kuchi va kuchlanishni o‘lchash
            </h2>

            <h3 className="mt-5 text-xl font-bold">
              Ishning maqsadi
            </h3>
            <p className="mt-2">
              Elektr zanjirini yig‘ishni hamda zanjirning
              turli qismlaridagi tok kuchi va kuchlanishni
              o‘lchashni o‘rganish.
            </p>

            <h3 className="mt-5 text-xl font-bold">
              Kerakli jihozlar
            </h3>
            <p className="mt-2">
              Tok manbai, ampermetr, voltmetr, ikkita
              lampochka, kalit va ulovchi o‘tkazgichlar.
            </p>

            <h3 className="mt-5 text-xl font-bold">
              Nazariy ma’lumot
            </h3>
            <p className="mt-2">
              Elektr zanjiri tok manbai, iste’molchilar,
              kalit va ulovchi o‘tkazgichlardan tashkil topadi.
              Ampermetr tok kuchini o‘lchaydi va zanjirga
              ketma-ket ulanadi. Voltmetr esa kuchlanishni
              o‘lchaydi va iste’molchiga parallel ulanadi.
            </p>

            <div className="mt-5 rounded-xl bg-blue-50 p-4">
              <p className="font-semibold">
                Om qonuni:
              </p>
              <p className="mt-2 text-2xl font-bold">
                I = U / R
              </p>
              <p className="mt-2">
                I — tok kuchi (A), U — kuchlanish (V),
                R — qarshilik (Ω).
              </p>
            </div>

            <button
              onClick={() => setBosqich(2)}
              className="mt-8 w-full rounded-xl bg-blue-700 px-6 py-4 text-lg font-bold text-white hover:bg-blue-800"
            >
              Tajribani boshlash →
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">
              Ishni bajarish tartibi
            </h2>

            <ol className="list-decimal space-y-4 pl-6">
              <li>
                Tok manbai, ampermetr, ikkita lampochka
                va kalitdan iborat elektr zanjirini yig‘ing.
              </li>
              <li>
                Voltmetrni birinchi lampochkaga parallel ulang.
              </li>
              <li>
                Tok manbai kuchlanishini 4 V ga o‘rnating.
              </li>
              <li>
                Kalitni ulang va o‘lchov asboblarining
                ko‘rsatkichlarini jadvalga yozing.
              </li>
              <li>
                Voltmetrni ikkinchi lampochkaga parallel
                ulang va o‘lchashni takrorlang.
              </li>
              <li>
                Kuchlanishni 6 V ga o‘zgartirib,
                tajribani takrorlang.
              </li>
              <li>
                Natijalarni tahlil qiling va xulosa chiqaring.
              </li>
            </ol>

            <p className="mt-6 rounded-xl bg-yellow-50 p-4 text-sm">
              Keyingi bosqichda shu sahifaga interaktiv
              elektr zanjiri, ampermetr, voltmetr va
              natijalar jadvalini qo‘shamiz.
            </p>

            <button
              onClick={() => setBosqich(1)}
              className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
            >
              ← Nazariyaga qaytish
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
