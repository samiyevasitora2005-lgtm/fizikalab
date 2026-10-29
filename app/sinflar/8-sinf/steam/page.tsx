
"use client";

import { useEffect, useRef, useState } from "react";

const savollar = [
  {
    savol: "Shar jun matoga ishqalanganda qanday zaryadlanadi?",
    variantlar: ["Musbat", "Manfiy", "Zaryadsiz", "Magnitga aylanadi"],
    javob: 1,
  },
  {
    savol: "Ishqalanish paytida qaysi zarrachalar o'tadi?",
    variantlar: ["Protonlar", "Neytronlar", "Elektronlar", "Atom yadrolari"],
    javob: 2,
  },
  {
    savol: "Nega zaryadlangan shar qog'ozni tortadi?",
    variantlar: [
      "Gravitatsiya kuchayadi",
      "Qog'oz qiziydi",
      "Qog'ozdagi zaryadlar qayta taqsimlanadi",
      "Shar magnitga aylanadi",
    ],
    javob: 2,
  },
  {
    savol: "Shar ishqalanmasa, odatda nima kuzatiladi?",
    variantlar: [
      "Qog'oz kuchli tortiladi",
      "Sezilarli tortishish kuzatilmaydi",
      "Qog'oz yonadi",
      "Shar qiziydi",
    ],
    javob: 1,
  },
  {
    savol: "Nam havoda elektrostatik ta'sir nega kamayishi mumkin?",
    variantlar: [
      "Elektronlar yo'qoladi",
      "Gravitatsiya kuchayadi",
      "Zaryad namlik orqali tezroq tarqaladi",
      "Qog'oz og'irligi yo'qoladi",
    ],
    javob: 2,
  },
];

export default function SteamPage() {
  const [ishqalash, setIshqalash] = useState(0);
  const [jarayon, setJarayon] = useState<"tinch" | "ishqalash" | "qogoz">("tinch");
  const [javoblar, setJavoblar] = useState<Record<number, number>>({});
  const [tekshirildi, setTekshirildi] = useState(false);
  const [ism, setIsm] = useState("");
  const [fikr, setFikr] = useState("");
  const [xulosa, setXulosa] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const zaryad = Math.min(ishqalash * 10, 100);
  const tortiladi = jarayon === "qogoz" && zaryad >= 40;
  const ball = savollar.reduce(
    (jami, s, i) => jami + (javoblar[i] === s.javob ? 1 : 0),
    0
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function sharniIshqalash() {
    if (jarayon === "ishqalash") return;
    if (timer.current) clearTimeout(timer.current);

    setJarayon("ishqalash");

    timer.current = setTimeout(() => {
      setIshqalash((v) => Math.min(v + 2, 10));
      setJarayon("tinch");
    }, 2400);
  }

  function qogozgaYaqinlashtirish() {
    if (jarayon === "ishqalash") return;
    setJarayon("qogoz");
  }

  function qaytaBoshlash() {
    if (timer.current) clearTimeout(timer.current);
    setIshqalash(0);
    setJarayon("tinch");
    setJavoblar({});
    setTekshirildi(false);
    setFikr("");
    setXulosa("");
  }

  function yuklabOlish() {
    const matn = [
      "FIZIKALAB - STEAM VIRTUAL LABORATORIYA",
      "8-sinf: Jismlarning zaryadlanishi",
      "",
      "O'quvchi: " + ism,
      "Ishqalashlar soni: " + ishqalash * 2,
      "Shartli zaryadlanish: " + zaryad + "%",
      "Qog'oz tortilishi: " + (tortiladi ? "Ha" : "Yo'q"),
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
    a.download = "FizikaLab-STEAM-natija.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-3 text-slate-900 md:p-8">
      <style>{`
        @keyframes ishqala {
          0% { transform: translate(0,0) rotate(0deg); }
          12% { transform: translate(-100%,-10%) rotate(-12deg); }
          25% { transform: translate(-120%,0) rotate(-18deg); }
          38% { transform: translate(-90%,-12%) rotate(-8deg); }
          50% { transform: translate(-120%,0) rotate(-18deg); }
          63% { transform: translate(-90%,-12%) rotate(-8deg); }
          75% { transform: translate(-120%,0) rotate(-18deg); }
          88% { transform: translate(-100%,-10%) rotate(-12deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes junSilkin {
          0%,100% { transform: rotate(0deg); }
          25%,75% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes qogozUch {
          0% { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(-65px,-90px) rotate(70deg); }
        }
        @keyframes elektron {
          0% { opacity: 0; transform: translateX(-20px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(35px); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl bg-blue-950 p-7 text-center text-white shadow-xl">
          <h1 className="text-2xl font-extrabold md:text-4xl">
            ⚗️ STEAM virtual laboratoriya
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
            className="relative h-[340px] overflow-hidden md:h-[500px]"
            style={{
              background:
                "linear-gradient(180deg,#e2edf5 0%,#f7f1e9 70%,#aa7448 70%,#c28b5c 100%)",
            }}
          >
            <div className="absolute left-[3%] top-5 text-sm font-bold text-blue-950 md:text-xl">
              Jun mato
            </div>
            <div className="absolute left-[43%] top-5 text-sm font-bold text-blue-950 md:text-xl">
              Shar
            </div>
            <div className="absolute right-[3%] top-5 text-sm font-bold text-blue-950 md:text-xl">
              Qog'oz bo'laklari
            </div>

            {/* Jun mato */}
            <div
              className="absolute bottom-[24%] left-[5%] h-[90px] w-[31%] rounded-2xl border-4 border-amber-900 shadow-2xl md:h-[145px]"
              style={{
                background:
                  "repeating-linear-gradient(45deg,#8e6b4b 0px,#e4cfb2 5px,#9a7856 11px,#d9bc98 17px)",
                animation:
                  jarayon === "ishqalash"
                    ? "junSilkin 0.35s ease-in-out infinite"
                    : "none",
              }}
            >
              <div className="absolute inset-2 rounded-xl border-4 border-dashed border-amber-200 opacity-70" />
              <div className="absolute inset-5 rounded-lg border-2 border-dotted border-amber-950" />
            </div>

            {/* Elektronlarning ko'chishi */}
            {jarayon === "ishqalash" && (
              <div className="absolute bottom-[52%] left-[27%] z-20 flex gap-3 text-xl font-black text-blue-700 md:text-3xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      animation: `elektron 0.65s ${i * 0.12}s infinite`,
                    }}
                  >
                    e⁻
                  </span>
                ))}
              </div>
            )}

            {/* Shar */}
            <div
              className="absolute bottom-[22%] left-[40%] z-10 flex w-[23%] flex-col items-center"
              style={{
                animation:
                  jarayon === "ishqalash"
                    ? "ishqala 2.4s ease-in-out"
                    : "none",
                transform:
                  jarayon === "qogoz"
                    ? "translateX(55%)"
                    : "translateX(0)",
                transition:
                  jarayon === "qogoz"
                    ? "transform 1s ease-in-out"
                    : "none",
              }}
            >
              <div
                className="relative h-[155px] w-[105px] rounded-[50%] border-2 border-red-900 shadow-2xl md:h-[240px] md:w-[165px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 25%,#ffb4a8 0%,#ff4545 23%,#e31828 65%,#8d0717 100%)",
                }}
              >
                <div className="absolute left-[18%] top-[12%] h-[32%] w-[17%] rotate-[-25deg] rounded-full bg-white/40 blur-sm" />
                {zaryad > 0 && (
                  <div className="absolute inset-0 flex flex-wrap items-center justify-around p-3 text-xl font-black text-white md:text-3xl">
                    {Array.from({
                      length: Math.max(2, Math.ceil(zaryad / 12)),
                    }).map((_, i) => (
                      <span key={i}>−</span>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="h-4 w-5 bg-red-900"
                style={{
                  clipPath: "polygon(0 0,100% 0,50% 100%)",
                }}
              />
              <div className="h-10 w-1 -rotate-12 rounded-full bg-slate-600" />
            </div>

            {/* Qog'oz bo'laklari */}
            <div className="absolute bottom-[24%] right-[3%] h-24 w-[28%]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-5 w-7 border border-slate-300 bg-white shadow-md md:h-7 md:w-10"
                  style={{
                    left: `${(i % 4) * 24}%`,
                    top: `${Math.floor(i / 4) * 28}%`,
                    transform: tortiladi
                      ? `translate(${-35 - (i % 3) * 12}px,${-35 - (i % 4) * 14}px) rotate(${i * 17}deg)`
                      : `rotate(${i * 19}deg)`,
                    transition: "transform 1.2s ease-in-out",
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-3 left-1/2 w-[95%] -translate-x-1/2 rounded-xl bg-white/90 px-4 py-2 text-center text-sm font-bold text-blue-950 md:text-lg">
              {jarayon === "ishqalash"
                ? "🧶 Shar jun matoga ishqalanmoqda! Elektronlar sharga o'tmoqda."
                : tortiladi
                ? "✅ Qog'oz bo'laklari zaryadlangan sharga tortilmoqda!"
                : jarayon === "qogoz"
                ? "⚠️ Shar yetarli zaryadlanmagan. Uni yana ishqalang."
                : "Sharni ishqalash tugmasini bosib tajribani boshlang."}
            </div>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-3">
            <button
              onClick={sharniIshqalash}
              disabled={jarayon === "ishqalash"}
              className="rounded-2xl bg-orange-500 p-5 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              🧶 {jarayon === "ishqalash"
                ? "Ishqalanmoqda..."
                : "Sharni jun matoga ishqalash"}
            </button>

            <button
              onClick={qogozgaYaqinlashtirish}
              disabled={jarayon === "ishqalash"}
              className="rounded-2xl bg-blue-600 p-5 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
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
              <span>Ishqalashlar: {ishqalash * 2}</span>
              <span>Shartli zaryadlanish: {zaryad}%</span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${zaryad}%` }}
              />
            </div>
            <p className="rounded-xl bg-blue-50 p-4 text-blue-950">
              <strong>Fizik izoh:</strong> Jun matoga ishqalanganda
              elektronlarning bir qismi sharga o'tadi va shar manfiy
              zaryadlanadi. Zaryadlangan shar neytral qog'ozdagi
              zaryadlarning qayta taqsimlanishiga sabab bo'lib,
              qog'ozni o'ziga tortishi mumkin.
            </p>
            <p className="text-xs text-slate-500">
              Animatsiya o'quv modeli: zaryadlanish foizi va harakatlar
              haqiqiy fizik o'lchov emas.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="mb-5 text-2xl font-extrabold text-blue-950">
            📝 Tajribaga oid 5 ta test
          </h2>

          <div className="space-y-5">
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
                        setJavoblar((old) => ({ ...old, [i]: j }));
                        setTekshirildi(false);
                      }}
                      className={`rounded-xl border-2 p-3 text-left ${
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
                  <p
                    className={`mt-3 font-bold ${
                      javoblar[i] === s.javob
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
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
            disabled={Object.keys(javoblar).length !== 5}
            className="mt-6 w-full rounded-2xl bg-green-600 p-4 text-xl font-bold text-white disabled:opacity-40"
          >
            ✅ Test natijasini tekshirish
          </button>

          {tekshirildi && (
            <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center text-2xl font-extrabold text-green-800">
              Natija: {ball}/5 — {ball * 20}%
            </div>
          )}
        </section>

        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-extrabold text-blue-950">
            💡 O'quvchining fikri va xulosasi
          </h2>

          <label className="block font-semibold">
            Ism va familiyangiz
            <input
              value={ism}
              onChange={(e) => setIsm(e.target.value)}
              placeholder="Ism va familiyangizni kiriting"
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <label className="block font-semibold">
            1. O'quvchining fikri
            <p className="mt-1 text-sm font-normal text-slate-600">
              Qog'oz bo'laklari nima uchun sharga tortildi?
              Bu hodisani hayotda qayerda uchratgansiz?
            </p>
            <textarea
              value={fikr}
              onChange={(e) => setFikr(e.target.value)}
              rows={5}
              placeholder="O'z fikringizni yozing..."
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <label className="block font-semibold">
            2. O'quvchining xulosasi
            <p className="mt-1 text-sm font-normal text-slate-600">
              Tajriba orqali qanday fizik qonuniyatni o'rgandingiz?
            </p>
            <textarea
              value={xulosa}
              onChange={(e) => setXulosa(e.target.value)}
              rows={5}
              placeholder="Xulosangizni yozing..."
              className="mt-2 w-full rounded-xl border-2 border-slate-200 p-4"
            />
          </label>

          <button
            onClick={yuklabOlish}
            disabled={
              !ism.trim() ||
              !fikr.trim() ||
              !xulosa.trim() ||
              !tekshirildi
            }
            className="w-full rounded-2xl bg-violet-700 p-5 text-lg font-bold text-white hover:bg-violet-800 disabled:opacity-40"
          >
            📥 Natija, fikr va xulosani yuklab olish (TXT)
          </button>
        </section>
      </div>
    </main>
  );
}
