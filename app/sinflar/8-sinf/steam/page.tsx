"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Effects from "../../../components/Effects";
import { Footer, Icon, Navbar } from "../../../components/Site";

const col = (c: string): CSSProperties =>
  ({ "--c": `var(--${c})`, "--e": `var(--${c}-e)` }) as CSSProperties;

function Panel({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <section
      data-rv
      className="rounded-[32px] bg-white p-5 sm:p-8"
      style={{ boxShadow: "0 10px 0 #c9deee" }}
    >
      <div className="mb-5 flex items-center gap-4">
        <span
          className="h-5 w-5 flex-none rounded-full"
          style={{ background: `var(--${color})`, boxShadow: `0 3px 0 var(--${color}-e)` }}
        />
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

const savollar = [
  {
    savol: "Shar jun matoga ishqalanganda qanday zaryadlanadi?",
    variantlar: ["Musbat", "Manfiy", "Zaryadsiz", "Magnitga aylanadi"],
    javob: 1,
  },
  {
    savol: "Ishqalanish paytida qaysi zarrachalar o‘tadi?",
    variantlar: ["Protonlar", "Neytronlar", "Elektronlar", "Atom yadrolari"],
    javob: 2,
  },
  {
    savol: "Nega zaryadlangan shar qog‘ozni tortadi?",
    variantlar: [
      "Gravitatsiya kuchayadi",
      "Qog‘oz qiziydi",
      "Qog‘ozdagi zaryadlar qayta taqsimlanadi",
      "Shar magnitga aylanadi",
    ],
    javob: 2,
  },
  {
    savol: "Shar ishqalanmasa, odatda nima kuzatiladi?",
    variantlar: [
      "Qog‘oz kuchli tortiladi",
      "Sezilarli tortishish kuzatilmaydi",
      "Qog‘oz yonadi",
      "Shar qiziydi",
    ],
    javob: 1,
  },
  {
    savol: "Nam havoda elektrostatik ta’sir nega kamayishi mumkin?",
    variantlar: [
      "Elektronlar yo‘qoladi",
      "Gravitatsiya kuchayadi",
      "Zaryad namlik orqali tezroq tarqaladi",
      "Qog‘oz og‘irligi yo‘qoladi",
    ],
    javob: 2,
  },
];

const INPUT: CSSProperties = {
  width: "100%",
  marginTop: 8,
  padding: 16,
  border: "3px solid #dbe7f5",
  borderRadius: 18,
  background: "#f7fbff",
  color: "var(--ink)",
  font: "700 17px/1.5 var(--text)",
};

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
  const ball = savollar.reduce((jami, s, i) => jami + (javoblar[i] === s.javob ? 1 : 0), 0);

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

    const blob = new Blob(["\uFEFF" + matn], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FizikaLab-STEAM-natija.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const holat =
    jarayon === "ishqalash"
      ? "🧶 Shar jun matoga ishqalanmoqda! Elektronlar sharga o‘tmoqda."
      : tortiladi
      ? "✅ Qog‘oz bo‘laklari zaryadlangan sharga tortilmoqda!"
      : jarayon === "qogoz"
      ? "⚠️ Shar yetarli zaryadlanmagan. Uni yana ishqalang."
      : "Sharni ishqalash tugmasini bosib tajribani boshlang.";

  const off: CSSProperties = { opacity: 0.5, cursor: "not-allowed" };

  return (
    <>
      <Effects />
      <Navbar active="darslik" />
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
        @keyframes elektron {
          0% { opacity: 0; transform: translateX(-20px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(35px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .steam-anim { animation: none !important; }
        }
      `}</style>
      <main className="wrap">
        <div className="page-hero">
          <Link href="/sinflar/8-sinf" className="back">
            <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
              <Icon name="arrow" />
            </span>
            8-sinf
          </Link>
          <span className="pill" style={{ justifySelf: "start" }}>
            STEAM topshirig‘i
          </span>
          <h1 style={{ maxWidth: "16em" }}>Jismlarning zaryadlanishi</h1>
          <p style={{ maxWidth: "36em", fontWeight: 700, lineHeight: 1.7 }}>
            Sharni jun matoga ishqalang, so‘ng uni qog‘oz bo‘laklariga yaqinlashtiring va nima
            bo‘lishini kuzating.
          </p>
        </div>

        <div className="mt-10 grid gap-8 pb-10">
          <Panel title="Virtual tajriba stoli" color="sky2">
            <div
              className="relative overflow-hidden"
              style={{
                height: "clamp(300px, 52vw, 460px)",
                borderRadius: 28,
                border: "4px solid #f0d9a8",
                background:
                  "linear-gradient(180deg,#dff1ff 0%,#fff6e3 68%,#c28b5c 68%,#a97449 100%)",
              }}
            >
              <div className="absolute left-[3%] top-4 text-sm font-extrabold sm:text-lg">Jun mato</div>
              <div className="absolute left-[44%] top-4 text-sm font-extrabold sm:text-lg">Shar</div>
              <div className="absolute right-[3%] top-4 text-sm font-extrabold sm:text-lg">
                Qog‘oz bo‘laklari
              </div>

              {/* Jun mato */}
              <div
                className="steam-anim absolute bottom-[24%] left-[5%] h-[90px] w-[31%] rounded-2xl border-4 border-amber-900 shadow-2xl md:h-[140px]"
                style={{
                  background:
                    "repeating-linear-gradient(45deg,#8e6b4b 0px,#e4cfb2 5px,#9a7856 11px,#d9bc98 17px)",
                  animation: jarayon === "ishqalash" ? "junSilkin 0.35s ease-in-out infinite" : "none",
                }}
              >
                <div className="absolute inset-2 rounded-xl border-4 border-dashed border-amber-200 opacity-70" />
              </div>

              {/* Elektronlar */}
              {jarayon === "ishqalash" && (
                <div className="absolute bottom-[52%] left-[27%] z-20 flex gap-3 text-xl font-black sm:text-3xl" style={{ color: "var(--blue)" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="steam-anim" style={{ animation: `elektron 0.65s ${i * 0.12}s infinite` }}>
                      e⁻
                    </span>
                  ))}
                </div>
              )}

              {/* Shar */}
              <div
                className="steam-anim absolute bottom-[22%] left-[40%] z-10 flex w-[23%] flex-col items-center"
                style={{
                  animation: jarayon === "ishqalash" ? "ishqala 2.4s ease-in-out" : "none",
                  transform: jarayon === "qogoz" ? "translateX(55%)" : "translateX(0)",
                  transition: jarayon === "qogoz" ? "transform 1s ease-in-out" : "none",
                }}
              >
                <div
                  className="relative h-[130px] w-[90px] rounded-[50%] border-2 border-red-900 shadow-2xl md:h-[220px] md:w-[150px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 25%,#ffb4a8 0%,#ff4545 23%,#e31828 65%,#8d0717 100%)",
                  }}
                >
                  <div className="absolute left-[18%] top-[12%] h-[32%] w-[17%] rotate-[-25deg] rounded-full bg-white/40 blur-sm" />
                  {zaryad > 0 && (
                    <div className="absolute inset-0 flex flex-wrap items-center justify-around p-3 text-xl font-black text-white sm:text-3xl">
                      {Array.from({ length: Math.max(2, Math.ceil(zaryad / 12)) }).map((_, i) => (
                        <span key={i}>−</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="h-4 w-5 bg-red-900" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
                <div className="h-10 w-1 -rotate-12 rounded-full bg-slate-600" />
              </div>

              {/* Qog‘oz bo‘laklari */}
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

              <div
                className="absolute bottom-3 left-1/2 w-[95%] -translate-x-1/2 rounded-2xl px-4 py-2 text-center text-sm font-extrabold sm:text-lg"
                style={{ background: "rgba(255,255,255,.92)" }}
                role="status"
                aria-live="polite"
              >
                {holat}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn orange"
                onClick={sharniIshqalash}
                disabled={jarayon === "ishqalash"}
                style={jarayon === "ishqalash" ? off : undefined}
              >
                🧶 {jarayon === "ishqalash" ? "Ishqalanmoqda..." : "Sharni ishqalash"}
              </button>
              <button
                type="button"
                className="btn blue"
                onClick={qogozgaYaqinlashtirish}
                disabled={jarayon === "ishqalash"}
                style={jarayon === "ishqalash" ? off : undefined}
              >
                🎈 Qog‘ozga yaqinlashtirish
              </button>
              <button type="button" className="btn sm" style={col("berry")} onClick={qaytaBoshlash}>
                🔄 Qayta boshlash
              </button>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between gap-3 font-extrabold">
                <span>Ishqalashlar: {ishqalash * 2}</span>
                <span>Shartli zaryadlanish: {zaryad}%</span>
              </div>
              <div
                className="h-6 overflow-hidden rounded-full"
                style={{ background: "#e4eef8" }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={zaryad}
                aria-label="Zaryadlanish darajasi"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${zaryad}%`,
                    background: "linear-gradient(90deg,var(--sky2),var(--blue))",
                    transition: "width .5s",
                  }}
                />
              </div>
              <p className="mt-5 rounded-3xl p-5 leading-7" style={{ background: "var(--sun)", boxShadow: "0 6px 0 var(--sun-e)" }}>
                <b>Fizik izoh:</b> jun matoga ishqalanganda elektronlarning bir qismi sharga o‘tadi va
                shar manfiy zaryadlanadi. Zaryadlangan shar neytral qog‘ozdagi zaryadlarning qayta
                taqsimlanishiga sabab bo‘lib, qog‘ozni o‘ziga tortishi mumkin.
              </p>
              <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                Animatsiya o‘quv modeli: zaryadlanish foizi va harakatlar haqiqiy fizik o‘lchov emas.
              </p>
            </div>
          </Panel>

          <Panel title="Tajribaga oid 5 ta test" color="mint">
            <div className="grid gap-5">
              {savollar.map((s, i) => (
                <div key={i} className="rounded-3xl p-4 sm:p-5" style={{ background: "#f4f8fd" }}>
                  <h3 className="mb-4 text-xl leading-snug">
                    {i + 1}. {s.savol}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {s.variantlar.map((variant, j) => {
                      const tanlandi = javoblar[i] === j;
                      return (
                        <button
                          key={j}
                          type="button"
                          aria-pressed={tanlandi}
                          onClick={() => {
                            setJavoblar((old) => ({ ...old, [i]: j }));
                            setTekshirildi(false);
                          }}
                          className="rounded-2xl p-3 text-left font-extrabold"
                          style={{
                            border: `3px solid ${tanlandi ? "var(--blue)" : "#dbe7f5"}`,
                            background: tanlandi ? "#e3ecff" : "#fff",
                            boxShadow: tanlandi ? "none" : "0 4px 0 #c9deee",
                            color: "var(--ink)",
                            cursor: "pointer",
                          }}
                        >
                          {String.fromCharCode(65 + j)}. {variant}
                        </button>
                      );
                    })}
                  </div>
                  {tekshirildi && (
                    <p
                      className="mt-3 font-extrabold"
                      style={{ color: javoblar[i] === s.javob ? "#0e7a4d" : "#c0182f" }}
                    >
                      {javoblar[i] === s.javob
                        ? "✓ To‘g‘ri javob!"
                        : `✗ To‘g‘ri javob: ${s.variantlar[s.javob]}`}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="btn orange"
                onClick={() => setTekshirildi(true)}
                disabled={Object.keys(javoblar).length !== 5}
                style={Object.keys(javoblar).length !== 5 ? off : undefined}
              >
                ✅ Test natijasini tekshirish
              </button>
            </div>

            {tekshirildi && (
              <div
                className="mt-5 rounded-3xl p-5 text-center"
                style={{ background: "var(--mint)", boxShadow: "0 6px 0 var(--mint-e)", font: "700 clamp(1.4rem,3vw,2rem)/1.2 var(--display)" }}
                role="status"
              >
                Natija: {ball}/5 — {ball * 20}%
              </div>
            )}
          </Panel>

          <Panel title="O‘quvchining fikri va xulosasi" color="grape">
            <div className="grid gap-5">
              <label className="block font-extrabold">
                Ism va familiyangiz
                <input
                  value={ism}
                  onChange={(e) => setIsm(e.target.value)}
                  placeholder="Ism va familiyangizni kiriting"
                  style={INPUT}
                />
              </label>

              <label className="block font-extrabold">
                1. O‘quvchining fikri
                <span className="mt-1 block text-sm font-bold" style={{ color: "var(--muted)" }}>
                  Qog‘oz bo‘laklari nima uchun sharga tortildi? Bu hodisani hayotda qayerda
                  uchratgansiz?
                </span>
                <textarea
                  value={fikr}
                  onChange={(e) => setFikr(e.target.value)}
                  rows={5}
                  placeholder="O‘z fikringizni yozing..."
                  style={INPUT}
                />
              </label>

              <label className="block font-extrabold">
                2. O‘quvchining xulosasi
                <span className="mt-1 block text-sm font-bold" style={{ color: "var(--muted)" }}>
                  Tajriba orqali qanday fizik qonuniyatni o‘rgandingiz?
                </span>
                <textarea
                  value={xulosa}
                  onChange={(e) => setXulosa(e.target.value)}
                  rows={5}
                  placeholder="Xulosangizni yozing..."
                  style={INPUT}
                />
              </label>

              <div>
                <button
                  type="button"
                  className="btn orange"
                  onClick={yuklabOlish}
                  disabled={!ism.trim() || !fikr.trim() || !xulosa.trim() || !tekshirildi}
                  style={!ism.trim() || !fikr.trim() || !xulosa.trim() || !tekshirildi ? off : undefined}
                >
                  📥 Natijani yuklab olish (TXT)
                </button>
                {!tekshirildi && (
                  <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                    Yuklab olish uchun avval testni yechib, natijani tekshiring.
                  </p>
                )}
              </div>
            </div>
          </Panel>
        </div>
      </main>
      <Footer />
    </>
  );
}
