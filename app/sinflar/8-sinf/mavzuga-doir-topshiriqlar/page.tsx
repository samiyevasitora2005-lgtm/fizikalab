
"use client";

import { useState } from "react";

const savollar = [
  { savol: "Jismlarning zaryadlanishi nima?", variantlar: ["Elektr zaryadga ega bo‘lishi", "Qizishi", "Erishi", "Harakatlanishi"], javob: 0 },
  { savol: "Elektr zaryadining nechta turi mavjud?", variantlar: ["1 ta", "2 ta", "3 ta", "4 ta"], javob: 1 },
  { savol: "Bir xil ishorali zaryadlar qanday ta’sirlashadi?", variantlar: ["Tortishadi", "Itarishadi", "Ta’sirlashmaydi", "Birlashadi"], javob: 1 },
  { savol: "Turli ishorali zaryadlar qanday ta’sirlashadi?", variantlar: ["Itarishadi", "Tortishadi", "Ta’sirlashmaydi", "Yo‘qoladi"], javob: 1 },
  { savol: "Elektron qanday zaryadga ega?", variantlar: ["Musbat", "Manfiy", "Neytral", "Zaryadsiz"], javob: 1 },
  { savol: "Proton qanday zaryadga ega?", variantlar: ["Manfiy", "Musbat", "Neytral", "Zaryadsiz"], javob: 1 },
  { savol: "Neytronning elektr zaryadi qanday?", variantlar: ["Musbat", "Manfiy", "Nol", "O‘zgaruvchan"], javob: 2 },
  { savol: "Elektr zaryadining SI dagi birligi nima?", variantlar: ["Volt", "Amper", "Kulon", "Om"], javob: 2 },
  { savol: "Shisha tayoqcha ipak bilan ishqalanganda odatda qanday zaryadlanadi?", variantlar: ["Musbat", "Manfiy", "Zaryadsiz", "Neytral"], javob: 0 },
  { savol: "Ebonit tayoqcha jun bilan ishqalanganda odatda qanday zaryadlanadi?", variantlar: ["Musbat", "Manfiy", "Neytral", "Zaryadsiz"], javob: 1 },
  { savol: "Jism elektron yo‘qotsa qanday zaryadlanadi?", variantlar: ["Manfiy", "Musbat", "Neytral", "Zaryadsiz"], javob: 1 },
  { savol: "Jism elektron qabul qilsa qanday zaryadlanadi?", variantlar: ["Musbat", "Manfiy", "Neytral", "O‘zgarmaydi"], javob: 1 },
  { savol: "Elektrlanishni aniqlash uchun qanday asbob ishlatiladi?", variantlar: ["Termometr", "Elektroskop", "Barometr", "Dinamometr"], javob: 1 },
  { savol: "Elektr zaryadining saqlanish qonuniga ko‘ra nima saqlanadi?", variantlar: ["Harorat", "Yopiq tizimdagi jami elektr zaryadi", "Tezlik", "Hajm"], javob: 1 },
  { savol: "Jun matoga ishqalangan plastik taroqning mayda qog‘ozlarni tortishi nimaga misol?", variantlar: ["Magnitlanish", "Elektrlanish", "Bug‘lanish", "Erish"], javob: 1 },
];

export default function Topshiriqlar() {
  const [raqam, setRaqam] = useState(0);
  const [tanlov, setTanlov] = useState<number | null>(null);
  const [ball, setBall] = useState(0);
  const [tugadi, setTugadi] = useState(false);

  const savol = savollar[raqam];

  function keyingi() {
    const yangiBall = ball + (tanlov === savol.javob ? 1 : 0);
    setBall(yangiBall);
    if (raqam === savollar.length - 1) {
      setTugadi(true);
    } else {
      setRaqam(raqam + 1);
      setTanlov(null);
    }
  }

  function qaytaBoshlash() {
    setRaqam(0);
    setTanlov(null);
    setBall(0);
    setTugadi(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-cyan-800 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/sinflar/8-sinf" className="text-cyan-200 hover:underline">
          ← 8-sinfga qaytish
        </a>
        <div className="mt-6 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-10">
          <div className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            FizikaLab • 8-sinf fizika
          </div>
          <h1 className="mb-3 text-3xl font-extrabold">
            ⚡ Jismlarning zaryadlanishi
          </h1>
          <p className="mb-8 text-slate-600">
            15 ta interaktiv savol. Har bir to‘g‘ri javob — 1 ball.
          </p>

          {tugadi ? (
            <div className="text-center">
              <div className="mb-4 text-6xl">🏆</div>
              <h2 className="text-2xl font-bold">Test yakunlandi!</h2>
              <p className="my-5 text-5xl font-black text-blue-700">
                {ball} / {savollar.length}
              </p>
              <p className="mb-6 text-lg">
                Natija: {Math.round((ball / savollar.length) * 100)}%
              </p>
              <button onClick={qaytaBoshlash} className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white hover:bg-blue-800">
                🔄 Qayta boshlash
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>{raqam + 1}-savol / {savollar.length}</span>
                <span>Ball: {ball}</span>
              </div>
              <div className="mb-7 h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${((raqam + 1) / savollar.length) * 100}%` }} />
              </div>
              <h2 className="mb-7 text-xl font-bold">{savol.savol}</h2>
              <div className="space-y-3">
                {savol.variantlar.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setTanlov(index)}
                    className={`w-full rounded-xl border-2 p-4 text-left font-medium transition ${
                      tanlov === index
                        ? "border-blue-600 bg-blue-100 text-blue-900"
                        : "border-slate-200 bg-slate-50 hover:border-cyan-400"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}. {variant}
                  </button>
                ))}
              </div>
              <button
                disabled={tanlov === null}
                onClick={keyingi}
                className="mt-8 w-full rounded-xl bg-blue-700 py-4 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {raqam === savollar.length - 1 ? "Natijani ko‘rish" : "Keyingi savol →"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
