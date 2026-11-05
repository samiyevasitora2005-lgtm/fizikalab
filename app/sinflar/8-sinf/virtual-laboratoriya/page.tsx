"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import CircuitLab from "../../../components/CircuitLab";
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
      className="rounded-[32px] bg-white p-6 sm:p-8"
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

const TARTIB: { t: string; izoh?: string }[] = [
  {
    t: "Tok manbai, ampermetr, lampochkalar va kalitdan iborat zanjirni yig‘ing (sxemaga qarang). Bunda voltmetr birinchi lampochkaning uchlariga ulanadi.",
  },
  {
    t: "Tok manbaining iste’molchilarga kuchlanish beradigan murvatini 4 V holatiga qo‘ying.",
  },
  {
    t: "Kalitni ulang. Zanjirga ulangan ikkala lampochka ham yonadi, ampermetr va voltmetr ko‘rsatishini qayd qiling. Ularning qiymatlarini jadvalga yozing.",
    izoh: "voltmetr birinchi lampochka uchlaridagi kuchlanishni o‘lchaydi.",
  },
  {
    t: "Kalitni uzing. Voltmetr klemmalarini ikkinchi lampochkaning uchlariga ulang.",
  },
  {
    t: "Kalitni ulang. Bunda lampochkalar yonadi, ampermetr va voltmetr ko‘rsatishini qayd qiling. Ularning qiymatlarini jadvalga yozing.",
    izoh: "voltmetr ikkinchi lampochka uchlaridagi kuchlanishni o‘lchaydi.",
  },
  {
    t: "Kalitni uzing. Tok manbaining iste’molchilarga kuchlanish beradigan murvatini 6 V holatiga qo‘ying. Tajribani yuqorida 3-, 4-, 5-bandda keltirilgandek takrorlang.",
  },
  {
    t: "Tajriba natijalarini tahlil qiling va xulosa chiqaring.",
  },
];

const ASBOBLAR = [
  { c: "sky2", n: "Tok manbai", v: "zanjirga kuchlanish beradi." },
  { c: "berry", n: "Ampermetr", v: "tok kuchini (A) o‘lchaydi. Zanjirga ketma-ket ulanadi." },
  { c: "grape", n: "Voltmetr", v: "kuchlanishni (V) o‘lchaydi. Lampochka uchlariga parallel ulanadi." },
  { c: "sun", n: "Lampochka", v: "iste’molchi: elektr energiyasini yorug‘lik va issiqlikka aylantiradi." },
  { c: "mint", n: "Kalit", v: "zanjirni ulaydi va uzadi." },
  { c: "orange", n: "Ulovchi o‘tkazgichlar", v: "zanjir qismlarini bir-biriga ulaydi." },
];

function Sxema() {
  return (
    <svg
      viewBox="0 0 520 230"
      className="h-auto w-full"
      style={{ maxWidth: 640, display: "block", margin: "0 auto" }}
      role="img"
      aria-label="Elektr zanjir sxemasi: tok manbai, kalit K, ikkita ketma-ket lampochka L1 va L2, voltmetr V birinchi lampochkaga parallel, ampermetr A zanjirga ketma-ket"
    >
      <g stroke="#1f2a44" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 70 H82" />
        <path d="M82 52 V88" />
        <path d="M94 60 V80" strokeWidth="5" />
        <path d="M94 70 H150" />
        <circle cx="150" cy="70" r="4" fill="#1f2a44" />
        <circle cx="200" cy="70" r="4" fill="#1f2a44" />
        <path d="M150 70 L192 44" />
        <path d="M200 70 H240" />
        <circle cx="262" cy="70" r="22" fill="#fff" />
        <path d="M247 55 L277 85 M277 55 L247 85" />
        <path d="M284 70 H340" />
        <circle cx="362" cy="70" r="22" fill="#fff" />
        <path d="M347 55 L377 85 M377 55 L347 85" />
        <path d="M384 70 H470 V190 H282" />
        <circle cx="262" cy="190" r="20" fill="#fff" />
        <path d="M242 190 H40 V70" />
        <path d="M240 70 V22 H246" stroke="#7b5be0" />
        <path d="M278 22 H286 V70" stroke="#7b5be0" />
        <circle cx="262" cy="22" r="16" fill="#fff" stroke="#7b5be0" />
      </g>
      <g fill="#1f2a44" fontSize="18" fontWeight="800" textAnchor="middle">
        <text x="176" y="44">K</text>
        <text x="262" y="112">L₁</text>
        <text x="362" y="112">L₂</text>
        <text x="262" y="196">A</text>
        <text x="262" y="28" fill="#7b5be0">V</text>
      </g>
    </svg>
  );
}

export default function VirtualLaboratoriya() {
  const [bosqich, setBosqich] = useState<1 | 2>(1);

  function oti(n: 1 | 2) {
    setBosqich(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const th: CSSProperties = { border: "2px solid #dbe7f5", padding: "10px 8px" };

  return (
    <>
      <Effects />
      <Navbar active="darslik" />
      <main className="wrap">
        <div className="page-hero">
          <Link href="/sinflar/8-sinf" className="back">
            <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
              <Icon name="arrow" />
            </span>
            8-sinf
          </Link>
          <span className="pill" style={{ justifySelf: "start" }}>
            14-§ Laboratoriya ishi
          </span>
          <h1 style={{ maxWidth: "16em" }}>
            Elektr zanjirni yig‘ish, uning turli qismlaridagi tok kuchi va kuchlanishni o‘lchash
          </h1>
        </div>

        {/* Bosqichlar */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2" role="group" aria-label="Bosqichni tanlang">
          {(
            [
              [1, "1-bosqich", "Nazariy qism: ishni bajarish tartibi", "sun"],
              [2, "2-bosqich", "Virtual laboratoriya: o‘zingiz bajaring", "mint"],
            ] as const
          ).map(([n, t, s, c]) => (
            <button
              key={n}
              type="button"
              aria-pressed={bosqich === n}
              onClick={() => oti(n)}
              style={{
                ...col(c),
                background: "var(--c)",
                color: "var(--ink)",
                border: 0,
                borderRadius: 24,
                padding: "18px 22px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: bosqich === n ? "0 0 0 var(--e)" : "0 8px 0 var(--e)",
                transform: bosqich === n ? "translateY(8px)" : "none",
                outline: bosqich === n ? "4px solid var(--ink)" : "none",
                outlineOffset: 3,
                transition: "transform .1s, box-shadow .1s",
              }}
            >
              <span style={{ display: "block", font: "700 26px/1.1 var(--display)" }}>{t}</span>
              <span style={{ display: "block", fontWeight: 800, marginTop: 4 }}>{s}</span>
            </button>
          ))}
        </div>

        {bosqich === 1 ? (
          <div className="mt-10 grid gap-8 pb-4">
            <Panel title="Ishning maqsadi" color="sun">
              <p className="leading-8">
                <b>Ishning maqsadi:</b> elektr zanjirni yig‘ishni hamda zanjirning turli
                qismlaridagi tok kuchi va kuchlanishni o‘lchashni o‘rganish.
              </p>
              <p className="mt-3 leading-8">
                <b>Kerakli jihozlar:</b> tok manbai, ampermetr, voltmetr, ikkita lampochka, kalit
                va ulovchi o‘tkazgichlar.
              </p>
            </Panel>

            <Panel title="Elektr zanjir sxemasi" color="sky2">
              <div className="rounded-3xl p-4" style={{ background: "#f7fbff" }}>
                <Sxema />
              </div>
            </Panel>

            <Panel title="Asboblar va ularning vazifasi" color="berry">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ASBOBLAR.map((a) => (
                  <div
                    key={a.n}
                    className="rounded-3xl p-5 leading-7"
                    style={{ background: `var(--${a.c})`, boxShadow: `0 7px 0 var(--${a.c}-e)` }}
                  >
                    <b style={{ font: "600 22px/1.2 var(--display)" }}>{a.n}</b>
                    <p className="mt-1">{a.v}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Ishni bajarish tartibi" color="orange">
              <ol className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TARTIB.map((q, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-2xl p-4 leading-7"
                    style={{ background: "#f4f8fd" }}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 flex-none place-items-center rounded-full"
                      style={{ background: "var(--orange)", font: "700 17px/1 var(--display)" }}
                    >
                      {i + 1}
                    </span>
                    <span>
                      {q.t}
                      {q.izoh && (
                        <span className="mt-1 block text-sm" style={{ color: "var(--muted)" }}>
                          <b>Izoh:</b> {q.izoh}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 overflow-x-auto rounded-2xl">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr style={{ background: "var(--orange)" }}>
                      <th style={th} rowSpan={2}>
                        Murvat holatlari
                      </th>
                      <th style={th} colSpan={2}>
                        1-lampochka
                      </th>
                      <th style={th} colSpan={2}>
                        2-lampochka
                      </th>
                    </tr>
                    <tr style={{ background: "var(--sun)" }}>
                      <th style={th}>U₁</th>
                      <th style={th}>I₁</th>
                      <th style={th}>U₂</th>
                      <th style={th}>I₂</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((r) => (
                      <tr key={r}>
                        <td style={th}>{r}</td>
                        <td style={{ ...th, height: 42 }} />
                        <td style={th} />
                        <td style={th} />
                        <td style={th} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Savollar" color="mint">
              <ol className="list-decimal space-y-3 pl-6 leading-7">
                <li>Eng oddiy elektr zanjir qanday asboblardan tashkil topgan?</li>
                <li>Zanjirdagi har bir asbobning vazifasini aytib bering.</li>
                <li>Nima uchun ampermetr zanjirda iste’molchiga ketma-ket ulanadi?</li>
              </ol>
            </Panel>

            <div style={{ textAlign: "center" }}>
              <button type="button" className="btn orange" onClick={() => oti(2)}>
                2-bosqich: virtual laboratoriyaga o‘tish <Icon name="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 pb-4">
            <CircuitLab />
            <div className="mt-8" style={{ textAlign: "center" }}>
              <button type="button" className="btn sm" style={col("sun")} onClick={() => oti(1)}>
                1-bosqichga qaytish
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
