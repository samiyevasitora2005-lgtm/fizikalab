
"use client";

import { useState } from "react";

type Natija = {
  holat: number;
  manba: number;
  u1: number;
  i1: number;
  u2: number;
  i2: number;
};

export default function VirtualLaboratoriya() {
  const [kuchlanish, setKuchlanish] = useState(4);
  const [kalit, setKalit] = useState(false);
  const [voltmetr, setVoltmetr] = useState(1);
  const [qarshilik1, setQarshilik1] = useState(10);
  const [qarshilik2, setQarshilik2] = useState(10);
  const [natijalar, setNatijalar] = useState<Natija[]>([]);
  const [xulosa, setXulosa] = useState("");

  // Ketma-ket ulangan ikkita lampochkaning
  // soddalashtirilgan, doimiy qarshilikli modeli.
  const tok = kalit
    ? kuchlanish / (qarshilik1 + qarshilik2)
    : 0;

  const u1 = tok * qarshilik1;
  const u2 = tok * qarshilik2;

  const voltmetrQiymati = voltmetr === 1 ? u1 : u2;

  const format = (son: number) => son.toFixed(2);

  function saqlash() {
    if (!kalit) {
      alert("Avval elektr kalitini ulang!");
      return;
    }

    setNatijalar((oldingi) => [
      ...oldingi,
      {
        holat: oldingi.length + 1,
        manba: kuchlanish,
        u1,
        i1: tok,
        u2,
        i2: tok,
      },
    ]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-7">

        <header className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">
            8-sinf Fizika — Virtual laboratoriya
          </h1>
          <p className="mt-3 text-blue-100">
            14-laboratoriya ishi
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-xl font-semibold">
            Elektr zanjirni yig‘ish, uning turli qismlaridagi
            tok kuchi va kuchlanishni o‘lchash
          </h2>
        </header>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-3 text-2xl font-bold">
            1. Ishning maqsadi
          </h2>
          <p className="leading-8">
            Elektr zanjirini yig‘ish hamda zanjirning turli
            qismlaridagi tok kuchi va kuchlanishni o‘lchashni
            o‘rganish. O‘quvchilar elektr zanjirining asosiy
            qismlarini ajratadi, o‘lchov asboblarining vazifasini
            tushunadi va ularni to‘g‘ri ulashni mashq qiladi.
          </p>
          <p className="mt-3 leading-8">
            Tajriba davomida ketma-ket ulangan lampochkalardan
            bir xil tok o‘tishi, manba kuchlanishi esa
            lampochkalar orasida taqsimlanishi kuzatiladi.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            2. Kerakli jihozlar
          </h2>
          <div className="space-y-3 leading-7">
            <p><b>Tok manbai:</b> elektr zanjirida kuchlanish hosil qiladi.</p>
            <p><b>Ampermetr:</b> tok kuchini amperda o‘lchaydi.</p>
            <p><b>Voltmetr:</b> lampochka uchlaridagi kuchlanishni o‘lchaydi.</p>
            <p><b>Ikkita lampochka:</b> elektr energiyasini yorug‘lik va issiqlikka aylantiradi.</p>
            <p><b>Kalit:</b> zanjirni ulash va uzish uchun xizmat qiladi.</p>
            <p><b>O‘tkazgichlar:</b> zanjir elementlarini bir-biriga ulaydi.</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            3. Nazariy ma’lumotlar
          </h2>

          <div className="space-y-4 leading-8">
            <p>
              <b>Elektr toki</b> — elektr zaryadlangan
              zarrachalarning tartibli harakati.
              Metall o‘tkazgichlarda tok tashuvchilar
              erkin elektronlardir.
            </p>

            <p>
              <b>Tok kuchi</b> — o‘tkazgichning ko‘ndalang
              kesimidan vaqt birligida o‘tgan zaryad miqdori.
            </p>
            <div className="rounded-xl bg-blue-50 p-4 text-center text-2xl font-bold">
              I = q / t
            </div>

            <p>
              <b>Kuchlanish</b> — elektr maydonning birlik
              zaryadni ko‘chirishda bajargan ishi.
            </p>
            <div className="rounded-xl bg-blue-50 p-4 text-center text-2xl font-bold">
              U = A / q
            </div>

            <p>
              <b>Elektr qarshilik</b> — o‘tkazgichning
              elektr tokiga qarshilik ko‘rsatish xususiyati.
              Uning o‘lchov birligi om (Ω).
            </p>

            <p>
              <b>Om qonuni:</b> tok kuchi kuchlanishga
              to‘g‘ri, qarshilikka teskari proporsional.
            </p>
            <div className="rounded-xl bg-blue-50 p-4 text-center text-2xl font-bold">
              I = U / R
            </div>

            <p>
              <b>Ketma-ket ulanish:</b> lampochkalardan
              bir xil tok o‘tadi, kuchlanishlar esa qo‘shiladi.
            </p>
            <div className="rounded-xl bg-blue-50 p-4 text-center text-xl font-bold">
              I = I₁ = I₂
              <br />
              U = U₁ + U₂
              <br />
              R = R₁ + R₂
            </div>

            <p>
              Ampermetr zanjirga ketma-ket ulanadi.
              Voltmetr esa kuchlanishi o‘lchanadigan
              lampochkaga parallel ulanadi.
            </p>

            <p className="rounded-xl bg-amber-50 p-4 text-sm">
              Eslatma: virtual modelda lampochkalar
              doimiy qarshilikli deb olinadi.
              Haqiqiy lampochkalarda qizish natijasida
              qarshilik o‘zgarishi mumkin.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            4. Elektr zanjirining sxemasi
          </h2>

          <p className="mb-5 leading-7">
            Sxemada ikkita lampochka ketma-ket ulangan.
            Ampermetr umumiy tok kuchini o‘lchaydi.
            Voltmetr tanlangan lampochkaga parallel
            ulangan holda uning kuchlanishini o‘lchaydi.
          </p>

          <div className="overflow-hidden rounded-xl border bg-slate-50 p-3">
            <svg
              viewBox="0 0 700 360"
              className="h-auto w-full"
              role="img"
              aria-label="Tok manbai, kalit, ampermetr, ikkita ketma-ket lampochka va voltmetr sxemasi"
            >
              <g
                stroke="#17365d"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M90 115 H160" />
                <path d="M220 115 H280" />
                <path d="M320 115 H380" />
                <path d="M440 115 H490" />
                <path d="M550 115 H610 V285 H90 V115" />

                {/* Kalit */}
                <circle cx="160" cy="115" r="5" fill="#17365d" />
                <circle cx="220" cy="115" r="5" fill="#17365d" />
                <path
                  d={kalit
                    ? "M160 115 L220 115"
                    : "M160 115 L210 85"}
                  stroke={kalit ? "#16a34a" : "#dc2626"}
                />

                {/* Ampermetr */}
                <circle cx="300" cy="115" r="20" fill="#fff" />

                {/* Lampochkalar */}
                <circle
                  cx="410"
                  cy="115"
                  r="30"
                  fill={kalit ? "#fde047" : "#fff"}
                  stroke="#17365d"
                />
                <path d="M390 95 L430 135 M430 95 L390 135" />

                <circle
                  cx="520"
                  cy="115"
                  r="30"
                  fill={kalit ? "#fde047" : "#fff"}
                  stroke="#17365d"
                />
                <path d="M500 95 L540 135 M540 95 L500 135" />

                {/* Batareya */}
                <path d="M90 210 H65 M90 240 H65" />
                <path d="M65 195 V225 M65 233 V247" />
                <path d="M65 210 H90 M65 240 H90" />

                {/* Voltmetr ulanishi */}
                <path
                  d={voltmetr === 1
                    ? "M380 115 V45 H390 M430 45 H440 V115"
                    : "M490 115 V45 H500 M540 45 H550 V115"}
                  stroke="#9333ea"
                />
                <circle
                  cx={voltmetr === 1 ? 410 : 520}
                  cy="45"
                  r="20"
                  fill="#fff"
                  stroke="#9333ea"
                />
              </g>

              <g
                fill="#17365d"
                fontSize="21"
                fontWeight="bold"
                textAnchor="middle"
              >
                <text x="300" y="122">A</text>
                <text x="410" y="165">L₁</text>
                <text x="520" y="165">L₂</text>
                <text
                  x={voltmetr === 1 ? 410 : 520}
                  y="52"
                  fill="#9333ea"
                >
                  V
                </text>
                <text x="190" y="65">K</text>
                <text x="42" y="213">+</text>
                <text x="42" y="245">−</text>
                <text x="170" y="315">
                  Manba: {kuchlanish} V
                </text>
              </g>
            </svg>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Sxema o‘quv maqsadida soddalashtirilgan.
            Quyidagi boshqaruvlar orqali tajriba bajariladi.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            5. Ishni bajarish tartibi
          </h2>

          <ol className="list-decimal space-y-4 pl-6 leading-7">
            <li>
              Tok manbai, ampermetr, ikkita lampochka va
              kalitdan iborat elektr zanjirini yig‘ing.
              Voltmetrni birinchi lampochkaga parallel ulang.
            </li>
            <li>
              Tok manbaining kuchlanishini 4 V ga o‘rnating.
            </li>
            <li>
              Kalitni ulang. Lampochkalarning yonishini,
              ampermetr va voltmetr ko‘rsatkichlarini
              kuzating va jadvalga yozing.
            </li>
            <li>
              Kalitni uzing va voltmetrni ikkinchi
              lampochkaga parallel ulang.
            </li>
            <li>
              Kalitni qayta ulang va o‘lchashlarni takrorlang.
            </li>
            <li>
              Tok manbai kuchlanishini 6 V ga o‘zgartiring
              va o‘lchashlarni yana takrorlang.
            </li>
            <li>
              Natijalarni tahlil qiling va xulosa chiqaring.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            6. Interaktiv virtual tajriba
          </h2>

          <p className="mb-5 leading-7">
            Quyidagi boshqaruvlar yordamida elektr
            zanjirini ulang, manba kuchlanishini o‘zgartiring,
            voltmetrni tanlang va asboblar ko‘rsatkichlarini
            kuzating.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="mb-3 text-lg font-bold">
                Elektr kaliti
              </h3>
              <button
                onClick={() => setKalit(!kalit)}
                className={`w-full rounded-xl px-5 py-4 font-bold text-white ${
                  kalit ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {kalit ? "🟢 Kalit ulangan" : "🔴 Kalit uzilgan"}
              </button>
            </div>

            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="mb-3 text-lg font-bold">
                Tok manbai kuchlanishi
              </h3>
              <div className="flex gap-3">
                {[4, 6].map((qiymat) => (
                  <button
                    key={qiymat}
                    onClick={() => setKuchlanish(qiymat)}
                    className={`flex-1 rounded-xl px-4 py-4 font-bold ${
                      kuchlanish === qiymat
                        ? "bg-blue-700 text-white"
                        : "bg-white text-blue-950"
                    }`}
                  >
                    {qiymat} V
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="mb-3 text-lg font-bold">
                Voltmetrni ulash
              </h3>
              <div className="flex gap-3">
                {[1, 2].map((raqam) => (
                  <button
                    key={raqam}
                    onClick={() => setVoltmetr(raqam)}
                    className={`flex-1 rounded-xl px-3 py-4 font-bold ${
                      voltmetr === raqam
                        ? "bg-purple-700 text-white"
                        : "bg-white text-blue-950"
                    }`}
                  >
                    {raqam}-lampochka
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="mb-3 text-lg font-bold">
                Lampochkalar qarshiligi
              </h3>

              <label className="block text-sm">
                R₁ = {qarshilik1} Ω
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={qarshilik1}
                onChange={(e) =>
                  setQarshilik1(Number(e.target.value))
                }
                className="mb-4 w-full"
              />

              <label className="block text-sm">
                R₂ = {qarshilik2} Ω
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={qarshilik2}
                onChange={(e) =>
                  setQarshilik2(Number(e.target.value))
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-900 p-5 text-center text-white">
              <p className="text-sm">Ampermetr</p>
              <p className="mt-2 text-3xl font-bold">
                {format(tok)} A
              </p>
            </div>

            <div className="rounded-xl bg-purple-800 p-5 text-center text-white">
              <p className="text-sm">
                Voltmetr — L{voltmetr}
              </p>
              <p className="mt-2 text-3xl font-bold">
                {format(voltmetrQiymati)} V
              </p>
            </div>

            <div className="rounded-xl bg-cyan-800 p-5 text-center text-white">
              <p className="text-sm">Umumiy qarshilik</p>
              <p className="mt-2 text-3xl font-bold">
                {qarshilik1 + qarshilik2} Ω
              </p>
            </div>
          </div>

          <button
            onClick={saqlash}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white hover:bg-green-700"
          >
            📋 O‘lchash natijasini jadvalga yozish
          </button>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            7. Tajriba natijalari jadvali
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center text-sm">
              <thead className="bg-blue-100">
                <tr>
                  {[
                    "№",
                    "Manba (V)",
                    "U₁ (V)",
                    "I₁ (A)",
                    "U₂ (V)",
                    "I₂ (A)",
                  ].map((sarlavha) => (
                    <th
                      key={sarlavha}
                      className="border p-3"
                    >
                      {sarlavha}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {natijalar.map((natija) => (
                  <tr key={natija.holat}>
                    <td className="border p-3">{natija.holat}</td>
                    <td className="border p-3">{natija.manba}</td>
                    <td className="border p-3">{format(natija.u1)}</td>
                    <td className="border p-3">{format(natija.i1)}</td>
                    <td className="border p-3">{format(natija.u2)}</td>
                    <td className="border p-3">{format(natija.i2)}</td>
                  </tr>
                ))}
                {natijalar.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border p-5 text-slate-500">
                      Hozircha natija kiritilmagan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setNatijalar([])}
            className="mt-4 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700"
          >
            Jadvalni tozalash
          </button>

          <p className="mt-3 text-sm text-slate-600">
            Natijalar ushbu sahifa ochiq turgan vaqt
            davomida saqlanadi.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 text-blue-950 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            8. Nazorat savollari va xulosa
          </h2>

          <ol className="list-decimal space-y-3 pl-6 leading-7">
            <li>Elektr zanjiri qanday asboblardan tashkil topadi?</li>
            <li>Ampermetr nima uchun ketma-ket ulanadi?</li>
            <li>Voltmetr nima uchun parallel ulanadi?</li>
            <li>Ketma-ket ulangan lampochkalarda tok kuchi qanday bo‘ladi?</li>
            <li>Kuchlanish oshirilganda tok kuchi qanday o‘zgaradi?</li>
            <li>Bitta lampochka uzilsa, ikkinchisiga nima bo‘ladi?</li>
          </ol>

          <h3 className="mb-3 mt-6 text-xl font-bold">
            Tajriba bo‘yicha xulosangiz
          </h3>

          <textarea
            value={xulosa}
            onChange={(e) => setXulosa(e.target.value)}
            placeholder="Tajriba natijasida nimalarni o‘rgandingiz? Xulosangizni yozing..."
            rows={5}
            className="w-full rounded-xl border border-blue-200 p-4 text-blue-950"
          />
        </section>

      </div>
    </main>
  );
}
