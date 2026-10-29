
"use client";

import { useState } from "react";

const savollar = [
  {
    savol: "Shar jun matoga ishqalanganda qanday zaryadlanadi?",
    variantlar: [
      "Musbat zaryadlanadi",
      "Manfiy zaryadlanadi",
      "Zaryadsiz qoladi",
      "Magnitga aylanadi",
    ],
    javob: 1,
  },
  {
    savol: "Ishqalanish vaqtida qaysi zarrachalar o'tadi?",
    variantlar: ["Protonlar", "Neytronlar", "Elektronlar", "Atom yadrolari"],
    javob: 2,
  },
  {
    savol: "Nega zaryadlangan shar qog'oz bo'laklarini tortadi?",
    variantlar: [
      "Gravitatsiya kuchi ortadi",
      "Qog'oz qiziydi",
      "Qog'ozda zaryadlar qayta taqsimlanadi",
      "Shar magnitga aylanadi",
    ],
    javob: 2,
  },
  {
    savol: "Shar ishqalanmasa, odatda nima kuzatiladi?",
    variantlar: [
      "Qog'oz kuchli tortiladi",
      "Sezilarli elektrostatik tortishish bo'lmaydi",
      "Qog'oz yonadi",
      "Shar o'z-o'zidan zaryadlanadi",
    ],
    javob: 1,
  },
  {
    savol: "Nega nam havoda elektrostatik ta'sir kamayishi mumkin?",
    variantlar: [
      "Elektronlar yo'qoladi",
      "Gravitatsiya kuchayadi",
      "Namlik zaryadning tezroq tarqalishiga yordam beradi",
      "Qog'ozning massasi yo'qoladi",
    ],
    javob: 2,
  },
];

export default function SteamPage() {
  const [ishqalash, setIshqalash] = useState(0);
  const [yaqin, setYaqin] = useState(false);
  const [javoblar, setJavoblar] = useState<Record<number, number>>({});
  const [tekshirildi, setTekshirildi] = useState(false);
  const [ism, setIsm] = useState("");
  const [fikr, setFikr] = useState("");
  const [xulosa, setXulosa] = useState("");

  const zaryad = Math.min(ishqalash * 10, 100);
  const tortiladi = yaqin && zaryad >= 40;

  const ball = savollar.reduce(
    (jami, savol, i) => jami + (javoblar[i] === savol.javob ? 1 : 0),
    0
  );

  function qaytaBoshlash() {
    setIshqalash(0);
    setYaqin(false);
    setJavoblar({});
    setTekshirildi(false);
    setFikr("");
    setXulosa("");
  }

  function yuklabOlish() {
    const matn = [
      "FIZIKALAB - STEAM VIRTUAL LABORATORIYA",
      "8-sinf. Jismlarning zaryadlanishi",
      "",
      "O'quvchi: " + (ism || "Kiritilmagan"),
      "Ishqalashlar soni: " + ishqalash,
      "Zaryadlanish ko'rsatkichi: " + zaryad + "%",
      "Qog'oz tortilishi: " + (tortiladi ? "Kuzatildi" : "Kuzatilmadi"),
      "Test natijasi: " + ball + "/5",
      "",
      "O'QUVCHINING FIKRI:",
      fikr,
      "",
      "O'QUVCHINING XULOSASI:",
      xulosa,
    ].join("\n");

    const blob = new Blob(["\uFEFF" + matn], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FizikaLab-8-sinf-STEAM-natija.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-3 md:p-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">

        <header className="rounded-3xl bg-blue-950 p-7 text-center text-white shadow-xl">
          <h1 className="text-2xl md:text-4xl font-extrabold">
            ⚗️ FizikaLab — STEAM virtual laboratoriya
          </h1>
          <p className="mt-3 text-lg">
            8-sinf | Jismlarning zaryadlanishi
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-blue-900 p-4 text-center text-2xl font-bold text-white">
            🔬 Virtual tajriba stoli
          </div>

          <div
            className="relative h-[330px] overflow-hidden md:h-[490px]"
            style={{
              background:
                "linear-gradient(180deg,#dceaf3 0%,#f5f2e9 69%,#ad7747 70%,#c58c58 100%)",
            }}
          >
            <div className="absolute left-0 right-0 top-8 text-center text-sm font-semibold text-slate-500">
              Sharni jun matoga ishqalang va qog'ozga yaqinlashtiring
            </div>

            <div className="absolute bottom-[22%] left-[3%] w-[32%] text-center">
              <div className="mb-3 text-base font-bold md:text-2xl">
                Jun mato
              </div>
              <div
                className="relative mx-auto h-24 w-full max-w-[260px] rounded-2xl border-4 border-amber-900 shadow-xl md:h-36"
                style={{
                  background:
                    "repeating-linear-gradient(35deg,#a88866 0px,#e6d4b7 5px,#876744 10px,#d8bea0 15px)",
                }}
              >
                <div className="absolute inset-2 rounded-xl border-4 border-dashed border-amber-200 opacity-70" />
                <div className="absolute inset-5 rounded-lg border-2 border-dotted border-amber-950 opacity-60" />
              </div>
            </div>

            <div
              className="absolute bottom-[21%] left-[39%] flex w-[23%] flex-col items-center transition-all duration-700"
              style={{
                transform: yaqin ? "translateX(35%)" : "translateX(0)",
              }}
            >
              <div className="mb-3 text-lg font-bold md:text-2xl">
                Shar
              </div>
              <div
                className="relative h-40 w-28 rounded-[50%] border-2 border-red-800 shadow-2xl md:h-60 md:w-44"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 25%,#ffb0a9 0%,#ff4444 20%,#e31826 65%,#850b17 100%)",
                }}
              >
                <div className="absolute left-[20%] top-[12%] h-[30%] w-[16%] rotate-[-25deg] rounded-full bg-white/40 blur-sm" />
                {zaryad > 0 && (
                  <div className="absolute inset-0 flex flex-wrap items-center justify-around text-xl font-black text-white md:text-3xl">
                    {Array.from({ length: Math.max(2, Math.ceil(zaryad / 12)) }).map(
                      (_, i) => <span key={i}>−</span>
                    )}
                  </div>
                )}
              </div>
              <div className="h-4 w-5 bg-red-800" style={{
                clipPath: "polygon(0 0,100% 0,50% 100%)",
              }} />
              <div className="h-12 w-1 rotate-[-15deg] rounded-full bg-slate-600" />
            </div>

            <div className="absolute bottom-[23%] right-[3%] w-[29%] text-center">
              <div className="mb-6 text-sm font-bold md:text-2xl">
                Qog'oz bo'laklari
              </div>
              <div className="relative h-24">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-5 w-7 border border-slate-300 bg-white shadow-md transition-all duration-1000 md:h-7 md:w-10"
                    style={{
                      left: `${(i % 4) * 24}%`,
                      top: `${Math.floor(i / 4) * 25}%`,
                      transform: tortiladi
                        ? `translate(${-25 - (i % 3) * 12}px,${-25 - (i % 4) * 12}px) rotate(${i * 17}deg)`
                        : `rotate(${i * 19}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {tortiladi && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-xl bg-green-100 px-4 py-2 text-center font-bold text-green-800 shadow">
                ✅ Qog'oz bo'laklari sharga tortildi!
              </div>
            )}
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-3">
            <button
              onClick={() => {
                setIshqalash(v => Math.min(v + 1, 10));
                setYaqin(false);
              }}
              className="rounded-2xl bg-orange-500 p-5 font-bold text-white hover:bg-orange-600"
            >
              🧶 Sharni ishqalash
            </button>

            <button
              onClick={() => setYaqin(true)}
              className="rounded-2xl bg-blue-600 p-5 font-bold text-white hover:bg-blue-700"
            >
              🎈 Qog'ozga yaqinlashtirish
            </button>

            <button
              onClick={qaytaBoshlash}
              className="rounded-2xl bg-slate-700 p-5 font-bold text-white hover:bg-slate-800"
            >
              🔄 Qayta boshlash
            </button>
          </div>

          <div className="space-y-3 px-5 pb-6">
            <div className="flex justify-between font-bold">
              <span>Ishqalashlar soni: {ishqalash}</span>
              <span>Zaryadlanish: {zaryad}%</span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${zaryad}%` }}
              />
            </div>
            <p className="rounded-xl bg-blue-50 p-4 text-blue-950">
              {ishqalash === 0
                ? "1-qadam: Sharni jun matoga bir necha marta ishqalang."
                : !yaqin
                ? "2-qadam: Endi zaryadlangan sharni qog'oz bo'laklariga yaqinlashtiring."
                : tortiladi
                ? "Kuzatuv: Zaryadlangan shar neytral qog'oz bo'laklarini elektrostatik induksiya tufayli tortadi."
                : "Kuzatuv: Zaryadlanish yetarli emas. Sharni yana ishqalab ko'ring."}
            </p>
            <p className="text-xs text-slate-500">
              Eslatma: Zaryadlanish foizi va qog'oz harakati o'quv tajribasi uchun shartli modeldir.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="mb-5 text-2xl font-extrabold text-blue-950">
            📝 Bilimingizni sinang — 5 ta test
          </h2>

          <div className="space-y-6">
            {savollar.map((s, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-4 font-bold">
                  {i + 1}. {s.savol}
                </h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {s.variantlar.map((variant, j) => (
                    <button
                      key={j}
                      onClick={() => {
                        setJavoblar(old => ({ ...old, [i]: j }));
                        setTekshirildi(false);
                      }}
                      className={`rounded-xl border-2 p-3 text-left transition ${
                        javoblar[i] === j
                          ? "border-blue-600 bg-blue-100"
                          : "border-slate-200 bg-white hover:bg-slate-100"
                      }`}
                    >
                      {String.fromCharCode(65 + j)}. {variant}
                    </button>
                  ))}
                </div>
                {tekshirildi && (
                  <p className={`mt-3 font-bold ${
                    javoblar[i] === s.javob
                      ? "text-green-700"
                      : "text-red-600"
                  }`}>
                    {javoblar[i] === s.javob
                      ? "✓ To'g'ri javob!"
                      : `✗ To'g'ri javob: ${s.variantlar[s.javob]}`}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setTekshirildi(true)}
            disabled={Object.keys(javoblar).length !== savollar.length}
            className="mt-6 w-full rounded-2xl bg-green-600 p-4 text-xl font-bold text-white disabled:opacity-40"
          >
            ✅ Test natijasini tekshirish
          </button>

          {tekshirildi && (
            <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center text-2xl font-extrabold text-green-800">
              Natija: {ball} / 5 — {ball * 20}%
            </div>
          )}
        </section>

        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-extrabold text-blue-950">
            💡 O'quvchining mustaqil fikri va xulosasi
          </h2>

          <label className="block font-semibold">
            Ism va familiyangiz
            <input
              value={ism}
              onChange={e => setIsm(e.target.value)}
              placeholder="Ism va familiyangizni yozing"
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <label className="block font-semibold">
            1. Sizning fikringiz
            <p className="mt-1 text-sm font-normal text-slate-600">
              Nima uchun qog'oz bo'laklari zaryadlangan sharga tortildi?
              Tajribani kundalik hayotdagi qaysi hodisaga o'xshatasiz?
            </p>
            <textarea
              value={fikr}
              onChange={e => setFikr(e.target.value)}
              rows={5}
              placeholder="O'z fikringizni yozing..."
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <label className="block font-semibold">
            2. Tajribadan chiqargan xulosangiz
            <p className="mt-1 text-sm font-normal text-slate-600">
              Ishqalanish orqali zaryadlanish haqida qanday yangi bilim oldingiz?
            </p>
            <textarea
              value={xulosa}
              onChange={e => setXulosa(e.target.value)}
              rows={5}
              placeholder="Mustaqil xulosangizni yozing..."
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <button
            onClick={yuklabOlish}
            disabled={!ism.trim() || !fikr.trim() || !xulosa.trim() || !tekshirildi}
            className="w-full rounded-2xl bg-violet-700 p-5 text-lg font-bold text-white hover:bg-violet-800 disabled:opacity-40"
          >
            📥 Natija, fikr va xulosani yuklab olish (TXT)
          </button>

          <p className="text-center text-sm text-slate-500">
            Natijani yuklab olish uchun 5 ta testni yakunlang,
            ism, fikr va xulosani to'ldiring.
          </p>
        </section>

      </div>
    </main>
  );
}
