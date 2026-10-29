
"use client";

import { useState } from "react";

const savollar = [
  {
    savol: "Shar jun matoga ishqalanganda qanday zaryadlanadi?",
    variantlar: ["Musbat", "Manfiy", "Zaryadsiz"],
    javob: 1,
  },
  {
    savol: "Ishqalanishda qaysi zarralar almashinadi?",
    variantlar: ["Protonlar", "Neytronlar", "Elektronlar"],
    javob: 2,
  },
  {
    savol: "Zaryadlangan shar nima uchun qog‘ozni tortadi?",
    variantlar: [
      "Qog‘oz qutblangani uchun",
      "Qog‘oz magnitlangani uchun",
      "Qog‘oz og‘irlashgani uchun",
    ],
    javob: 0,
  },
  {
    savol: "Shar ishqalanmasa, odatda nima kuzatiladi?",
    variantlar: [
      "Kuchli tortilish",
      "Sezilarli tortilish bo‘lmasligi mumkin",
      "Qog‘oz yonadi",
    ],
    javob: 1,
  },
  {
    savol: "Nam havoda tajriba nega sustlashadi?",
    variantlar: [
      "Zaryad tezroq tarqaladi",
      "Protonlar yo‘qoladi",
      "Shar massasi ortadi",
    ],
    javob: 0,
  },
];

export default function SteamPage() {
  const [ishqalash, setIshqalash] = useState(0);
  const [yaqin, setYaqin] = useState(false);
  const [javoblar, setJavoblar] = useState<number[]>([]);
  const [tekshirildi, setTekshirildi] = useState(false);
  const [fikr, setFikr] = useState("");
  const [xulosa, setXulosa] = useState("");
  const [ism, setIsm] = useState("");

  const zaryadlangan = ishqalash >= 5;
  const ball = savollar.filter(
    (s, i) => javoblar[i] === s.javob
  ).length;

  function qaytaBoshlash() {
    setIshqalash(0);
    setYaqin(false);
  }

  function javobTanlash(i: number, j: number) {
    const yangi = [...javoblar];
    yangi[i] = j;
    setJavoblar(yangi);
    setTekshirildi(false);
  }

  function hisobotYuklash() {
    const matn = [
      "FIZIKALAB — STEAM LABORATORIYA",
      "8-sinf: Jismlarning zaryadlanishi",
      "",
      "O‘quvchi: " + ism,
      "Test natijasi: " + ball + "/5",
      "",
      "O‘quvchining fikri:",
      fikr,
      "",
      "O‘quvchining xulosasi:",
      xulosa,
    ].join("\n");

    const blob = new Blob([matn], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FizikaLab-STEAM-hisobot.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-indigo-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-3xl font-extrabold text-blue-950">
          ⚡ FizikaLab — STEAM laboratoriya
        </h1>
        <h2 className="mt-3 text-center text-2xl font-bold">
          Jismlarning zaryadlanishi
        </h2>
        <p className="mt-3 text-center text-slate-600">
          8-sinf | Shar, jun mato va qog‘oz yordamida
          elektrostatik hodisani o‘rganamiz.
        </p>

        <section className="mt-7 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
          <div className="bg-blue-950 p-4 text-center text-lg font-bold text-white">
            🔬 Virtual tajriba stoli
          </div>

          <svg
            viewBox="0 0 900 480"
            className="w-full"
            role="img"
            aria-label="Jun mato, qizil shar va qog‘oz bo‘laklari bilan elektrostatik tajriba"
          >
            <defs>
              <radialGradient id="sharRangi" cx="32%" cy="25%" r="78%">
                <stop offset="0" stopColor="#ffb5b5" />
                <stop offset=".3" stopColor="#ff5252" />
                <stop offset=".75" stopColor="#d71932" />
                <stop offset="1" stopColor="#7f1024" />
              </radialGradient>
              <linearGradient id="stolRangi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d6a273" />
                <stop offset="1" stopColor="#a86a3b" />
              </linearGradient>
              <pattern
                id="junTolalari"
                width="15"
                height="15"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 8 Q4 -1 8 8 T16 8 M0 14 Q4 5 8 14 T16 14"
                  stroke="#8b5a30"
                  strokeWidth="1.6"
                  fill="none"
                />
              </pattern>
              <filter id="soya">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            <rect width="900" height="480" fill="#dff3ff" />
            <rect x="0" y="335" width="900" height="145" fill="url(#stolRangi)" />
            <rect x="0" y="335" width="900" height="13" fill="#88542f" />

            <text x="170" y="52" textAnchor="middle" fontSize="25" fontWeight="bold" fill="#334155">
              Jun mato
            </text>
            <text x="445" y="52" textAnchor="middle" fontSize="25" fontWeight="bold" fill="#334155">
              Shar
            </text>
            <text x="735" y="52" textAnchor="middle" fontSize="25" fontWeight="bold" fill="#334155">
              Qog‘oz bo‘laklari
            </text>

            <ellipse cx="450" cy="343" rx="105" ry="12" fill="#70452b" opacity=".22" filter="url(#soya)" />

            <g
              style={{
                transform: `translateX(${ishqalash % 2 ? 55 : 0}px)`,
                transition: "transform .3s ease",
              }}
            >
              <path
                d="M80 225 Q75 200 105 194 L255 194 Q275 200 269 225 L260 317 Q250 331 225 326 L95 321 Q78 312 80 225Z"
                fill="#e9c99c"
                stroke="#936338"
                strokeWidth="4"
              />
              <path
                d="M90 213 Q100 200 115 205 L250 205 L249 311 L95 311Z"
                fill="url(#junTolalari)"
              />
              {Array.from({ length: 18 }, (_, i) => (
                <path
                  key={i}
                  d={`M${93 + i * 9} 201 q-7 -12 -12 -6`}
                  stroke="#b88955"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </g>

            <g
              style={{
                transform: `translateX(${yaqin && zaryadlangan ? 115 : 0}px)`,
                transition: "transform 1.1s ease",
              }}
            >
              <ellipse
                cx="445"
                cy="188"
                rx="104"
                ry="135"
                fill="url(#sharRangi)"
                stroke="#991b2b"
                strokeWidth="2"
              />
              <ellipse
                cx="408"
                cy="124"
                rx="22"
                ry="55"
                fill="white"
                opacity=".24"
                transform="rotate(22 408 124)"
              />
              <path d="M433 320 L457 320 L445 340Z" fill="#a8172b" />
              <path
                d="M445 340 Q470 375 438 404"
                stroke="#64748b"
                strokeWidth="3"
                fill="none"
              />

              {zaryadlangan &&
                Array.from({ length: 9 }, (_, i) => (
                  <text
                    key={i}
                    x={378 + (i % 3) * 65}
                    y={118 + Math.floor(i / 3) * 77}
                    fontSize="27"
                    fontWeight="bold"
                    fill="white"
                  >
                    −
                  </text>
                ))}
            </g>

            {Array.from({ length: 9 }, (_, i) => {
              const x = 660 + (i % 5) * 38;
              const y = 302 + Math.floor(i / 5) * 22;
              const tortildi = yaqin && zaryadlangan;
              return (
                <g
                  key={i}
                  style={{
                    transform: tortildi
                      ? `translate(${-85 - (i % 3) * 12}px, ${-65 - (i % 4) * 22}px) rotate(${i * 7 - 20}deg)`
                      : "none",
                    transformOrigin: `${x}px ${y}px`,
                    transition: `transform ${0.8 + i * 0.12}s ease`,
                  }}
                >
                  <path
                    d={`M${x} ${y} l28 -3 l5 19 l-29 4Z`}
                    fill={i % 3 === 0 ? "#fff7ed" : "#ffffff"}
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M${x + 7} ${y + 7} l16 -2`}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </svg>
        </section>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => {
              setIshqalash((n) => Math.min(n + 1, 10));
              setYaqin(false);
            }}
            className="rounded-2xl bg-orange-500 p-4 font-bold text-white hover:bg-orange-600"
          >
            🧶 Sharni ishqalash
          </button>
          <button
            onClick={() => setYaqin(true)}
            className="rounded-2xl bg-blue-700 p-4 font-bold text-white hover:bg-blue-800"
          >
            🎈 Qog‘ozga yaqinlashtirish
          </button>
          <button
            onClick={qaytaBoshlash}
            className="rounded-2xl bg-slate-700 p-4 font-bold text-white hover:bg-slate-800"
          >
            🔄 Qayta boshlash
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-5 shadow">
          <p className="font-bold">
            Ishqalashlar soni: {ishqalash}
          </p>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${ishqalash * 10}%` }}
            />
          </div>
          <p className="mt-4 text-lg">
            {!zaryadlangan
              ? "Jun matoni sharga ishqalang. Ishqalash natijasida elektronlar almashinadi."
              : !yaqin
              ? "Shar manfiy zaryadlandi. Endi uni qog‘oz bo‘laklariga yaqinlashtiring."
              : "Qog‘oz bo‘laklari qutblanish natijasida zaryadlangan sharga tortildi!"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Bu soddalashtirilgan model. Ishqalashlar soni haqiqiy elektr zaryadini bildirmaydi.
          </p>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-950">
            🧠 Mustaqil fikrlash uchun 5 ta test
          </h2>

          {savollar.map((s, i) => (
            <div key={i} className="mt-6 border-b border-slate-200 pb-5">
              <p className="mb-3 font-bold">
                {i + 1}. {s.savol}
              </p>
              <div className="grid gap-2">
                {s.variantlar.map((variant, j) => (
                  <button
                    key={j}
                    onClick={() => javobTanlash(i, j)}
                    className={`rounded-xl border-2 p-3 text-left transition ${
                      javoblar[i] === j
                        ? "border-blue-600 bg-blue-100"
                        : "border-slate-200 bg-slate-50 hover:bg-sky-50"
                    }`}
                  >
                    {String.fromCharCode(65 + j)}. {variant}
                  </button>
                ))}
              </div>
              {tekshirildi && (
                <p
                  className={`mt-2 font-semibold ${
                    javoblar[i] === s.javob
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {javoblar[i] === s.javob
                    ? "✓ To‘g‘ri!"
                    : `To‘g‘ri javob: ${s.variantlar[s.javob]}`}
                </p>
              )}
            </div>
          ))}

          <button
            disabled={savollar.some((_, i) => javoblar[i] === undefined)}
            onClick={() => setTekshirildi(true)}
            className="mt-5 w-full rounded-xl bg-green-700 p-4 font-bold text-white disabled:opacity-40"
          >
            Natijani tekshirish
          </button>

          {tekshirildi && (
            <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center">
              <p className="text-3xl font-extrabold text-green-800">
                {ball} / 5
              </p>
              <p>To‘g‘ri javoblar soni</p>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-950">
            ✍️ O‘quvchining fikri va xulosasi
          </h2>

          <label className="mt-5 block font-semibold">
            Ism va familiyangiz
          </label>
          <input
            value={ism}
            onChange={(e) => setIsm(e.target.value)}
            placeholder="Ism va familiyangizni yozing"
            className="mt-2 w-full rounded-xl border p-3"
          />

          <label className="mt-5 block font-semibold">
            1. Tajribadan qanday fikrga keldingiz?
          </label>
          <textarea
            value={fikr}
            onChange={(e) => setFikr(e.target.value)}
            rows={4}
            placeholder="O‘z fikringizni yozing..."
            className="mt-2 w-full rounded-xl border p-3"
          />

          <label className="mt-5 block font-semibold">
            2. Tajribadan qanday ilmiy xulosa chiqardingiz?
          </label>
          <textarea
            value={xulosa}
            onChange={(e) => setXulosa(e.target.value)}
            rows={4}
            placeholder="Ilmiy xulosangizni yozing..."
            className="mt-2 w-full rounded-xl border p-3"
          />

          <button
            disabled={
              !ism.trim() ||
              !fikr.trim() ||
              !xulosa.trim() ||
              !tekshirildi
            }
            onClick={hisobotYuklash}
            className="mt-5 w-full rounded-xl bg-indigo-700 p-4 font-bold text-white disabled:opacity-40"
          >
            📥 Natija, fikr va xulosani yuklab olish
          </button>

          <p className="mt-3 text-sm text-slate-500">
            Hisobot o‘quvchining qurilmasiga TXT fayl sifatida
            yuklanadi. O‘qituvchiga avtomatik yuborilmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
