"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Effects from "../../../components/Effects";
import Lab3D from "../../../components/Lab3D";
import { Footer, Icon, Navbar } from "../../../components/Site";

// Lampochkalar qarshiligi (soddalashtirilgan, doimiy model)
const R1 = 8;
const R2 = 12;

type Qator = { u1?: number; i1?: number; u2?: number; i2?: number };

const QADAMLAR = [
  {
    t: "Tok manbai, ampermetr, voltmetr, ikkita lampochka va kalitdan iborat zanjirni yig‘ing. Voltmetr birinchi lampochka uchlariga ulanadi.",
    h: "«Zanjirni yig‘ish» tugmasini bosing.",
  },
  {
    t: "Tok manbaining murvatini 4 V holatiga qo‘ying.",
    h: "«4 V» tugmasini yoki tok manbaidagi murvatni bosing.",
  },
  {
    t: "Kalitni ulang. Ikkala lampochka ham yonadi. Ampermetr va voltmetr ko‘rsatishini jadvalga yozing.",
    h: "Kalitni ulang, keyin «Jadvalga yozish» tugmasini bosing.",
  },
  {
    t: "Kalitni uzing. Voltmetrni ikkinchi lampochka uchlariga ulang.",
    h: "Kalitni uzing va «2-lampochka» tugmasini bosing.",
  },
  {
    t: "Kalitni ulang. Ko‘rsatishlarni jadvalga yozing.",
    h: "Kalitni ulang, keyin «Jadvalga yozish» tugmasini bosing.",
  },
  {
    t: "Murvatni 6 V holatiga qo‘yib, 3–5-bandlarni takrorlang.",
    h: "«6 V» ni tanlang. Voltmetr 1-lampochkada, keyin 2-lampochkada ham yozing.",
  },
  {
    t: "Tajriba natijalarini tahlil qiling va xulosa chiqaring.",
    h: "Pastdagi maydonga xulosangizni yozing.",
  },
];

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

export default function VirtualLaboratoriya() {
  const [assembled, setAssembled] = useState(false);
  const [kalit, setKalit] = useState(false);
  const [manba, setManba] = useState(0);
  const [bosildi4, setBosildi4] = useState(false);
  const [voltmetr, setVoltmetr] = useState<1 | 2>(1);
  const [tablica, setTablica] = useState<Record<number, Qator>>({ 4: {}, 6: {} });
  const [xulosa, setXulosa] = useState("");
  const [xabar, setXabar] = useState("");

  const tok = assembled && kalit && manba > 0 ? manba / (R1 + R2) : 0;
  const u = voltmetr === 1 ? tok * R1 : tok * R2;

  const f = (n?: number) => (n === undefined ? "" : n.toFixed(2));

  function yig() {
    setAssembled(true);
    setXabar("Zanjir yig‘ildi. Endi tok manbaining murvatini 4 V ga qo‘ying.");
  }

  function manbaTanla(v: number) {
    setManba(v);
    if (v === 4) setBosildi4(true);
    setXabar(`Tok manbai: ${v} V.`);
  }

  function manbaAylantir() {
    manbaTanla(manba === 4 ? 6 : 4);
  }

  function kalitBos() {
    if (!assembled) {
      setXabar("Avval zanjirni yig‘ing.");
      return;
    }
    setKalit(!kalit);
    setXabar(kalit ? "Kalit uzildi." : "Kalit ulandi.");
  }

  function voltmetrTanla(n: 1 | 2) {
    setVoltmetr(n);
    setXabar(`Voltmetr ${n}-lampochka uchlariga ulandi.`);
  }

  function yozish() {
    if (!assembled) {
      setXabar("Avval zanjirni yig‘ing.");
      return;
    }
    if (manba === 0) {
      setXabar("Tok manbaining murvatini 4 V yoki 6 V ga qo‘ying.");
      return;
    }
    if (!kalit) {
      setXabar("Avval kalitni ulang.");
      return;
    }
    setTablica((t) => ({
      ...t,
      [manba]:
        voltmetr === 1
          ? { ...t[manba], u1: u, i1: tok }
          : { ...t[manba], u2: u, i2: tok },
    }));
    setXabar(`Jadvalga yozildi: ${voltmetr}-lampochka, ${manba} V.`);
  }

  function boshidan() {
    setAssembled(false);
    setKalit(false);
    setManba(0);
    setBosildi4(false);
    setVoltmetr(1);
    setTablica({ 4: {}, 6: {} });
    setXabar("Tajriba boshidan boshlandi.");
  }

  const done = [
    assembled,
    bosildi4,
    tablica[4].u1 !== undefined,
    tablica[4].u1 !== undefined && voltmetr === 2,
    tablica[4].u2 !== undefined,
    tablica[6].u1 !== undefined && tablica[6].u2 !== undefined,
    xulosa.trim().length >= 10,
  ];
  const joriy = done.findIndex((d) => !d);
  const hammasi = joriy === -1;

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
          <h1>Elektr zanjirni yig‘ish</h1>
          <p style={{ maxWidth: "36em" }}>
            Zanjirning turli qismlaridagi tok kuchi va kuchlanishni o‘lchash.
          </p>
        </div>

        <div className="mt-8 grid gap-8 pb-4">
          <Panel title="Ishning maqsadi" color="sun">
            <p className="leading-8">
              Elektr zanjirni yig‘ishni hamda zanjirning turli qismlaridagi tok kuchi va
              kuchlanishni o‘lchashni o‘rganish.
            </p>
            <p className="mt-3 leading-8">
              <b>Kerakli jihozlar:</b> tok manbai, ampermetr, voltmetr, ikkita lampochka,
              kalit va ulovchi o‘tkazgichlar.
            </p>
          </Panel>

          <section data-rv className="grid gap-5 md:grid-cols-3">
            {[
              {
                c: "berry",
                t: "Tok kuchi (I)",
                p: "Amperda (A) o‘lchanadi. Ampermetr bilan o‘lchanadi va zanjirga ketma-ket ulanadi.",
              },
              {
                c: "sky2",
                t: "Kuchlanish (U)",
                p: "Voltda (V) o‘lchanadi. Voltmetr bilan o‘lchanadi va lampochka uchlariga parallel ulanadi.",
              },
              {
                c: "mint",
                t: "Ketma-ket ulanish",
                p: "Hamma lampochkadan bir xil tok o‘tadi: I = I₁ = I₂. Kuchlanishlar qo‘shiladi: U = U₁ + U₂.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-[28px] p-6"
                style={{ background: `var(--${x.c})`, boxShadow: `0 9px 0 var(--${x.c}-e)` }}
              >
                <h3 className="mb-2" style={{ fontSize: 24 }}>
                  {x.t}
                </h3>
                <p className="leading-7">{x.p}</p>
              </div>
            ))}
          </section>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Panel title="Ishni bajarish tartibi" color="orange">
              <ol className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {QADAMLAR.map((q, i) => {
                  const bajarildi = done[i];
                  const hozir = i === joriy;
                  return (
                    <li
                      key={i}
                      className="flex gap-3 rounded-2xl p-3 leading-6"
                      style={{
                        background: bajarildi ? "#e3f8ee" : hozir ? "#fff4d6" : "#f4f8fd",
                        outline: hozir ? "3px solid var(--orange)" : "none",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 flex-none place-items-center rounded-full"
                        style={{
                          background: bajarildi ? "var(--mint)" : hozir ? "var(--orange)" : "#dbe7f5",
                          font: "700 17px/1 var(--display)",
                        }}
                      >
                        {bajarildi ? "✓" : i + 1}
                      </span>
                      <span>
                        <span className="sr-only">
                          {bajarildi ? "Bajarildi. " : hozir ? "Hozirgi qadam. " : ""}
                        </span>
                        {q.t}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                Izoh: voltmetr tanlangan lampochka uchlaridagi kuchlanishni o‘lchaydi.
              </p>
            </Panel>

            <Panel title="Virtual laboratoriya" color="grape">
              <div
                className="mb-4 rounded-2xl p-4 font-extrabold"
                style={{ background: hammasi ? "var(--mint)" : "#fff4d6" }}
                role="status"
                aria-live="polite"
              >
                {hammasi
                  ? "Barakalla! Hamma qadam bajarildi."
                  : `${joriy + 1}-qadam: ${QADAMLAR[joriy].h}`}
              </div>

              <Lab3D
                state={{ assembled, kalit, manba, voltmetr, tok, u }}
                onKalit={kalitBos}
                onManba={manbaAylantir}
                onVoltmetr={voltmetrTanla}
              />
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Sichqoncha yoki barmoq bilan sudrab aylantiring. Kalitni, murvatni va
                lampochkalarni bosib ham boshqarish mumkin.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl p-4" style={{ background: "#eef6ff" }}>
                  <h3 className="mb-3 text-lg">Zanjir</h3>
                  <button
                    type="button"
                    className="btn sm w-full justify-center"
                    style={col(assembled ? "mint" : "sun")}
                    onClick={yig}
                  >
                    {assembled ? "Zanjir yig‘ilgan" : "Zanjirni yig‘ish"}
                  </button>
                </div>

                <div className="rounded-3xl p-4" style={{ background: "#eef6ff" }}>
                  <h3 className="mb-3 text-lg">Kalit</h3>
                  <button
                    type="button"
                    className="btn sm w-full justify-center"
                    style={col(kalit ? "mint" : "berry")}
                    aria-pressed={kalit}
                    onClick={kalitBos}
                  >
                    {kalit ? "Ulangan (uzish)" : "Uzilgan (ulash)"}
                  </button>
                </div>

                <div className="rounded-3xl p-4" style={{ background: "#eef6ff" }}>
                  <h3 className="mb-3 text-lg">Tok manbai</h3>
                  <div className="flex gap-3">
                    {[4, 6].map((v) => (
                      <button
                        key={v}
                        type="button"
                        className="gb flex-1"
                        style={col("sun")}
                        aria-pressed={manba === v}
                        onClick={() => manbaTanla(v)}
                      >
                        {v} V
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl p-4" style={{ background: "#eef6ff" }}>
                  <h3 className="mb-3 text-lg">Voltmetr</h3>
                  <div className="flex gap-3">
                    {([1, 2] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        className="gb flex-1"
                        style={col("grape")}
                        aria-pressed={voltmetr === n}
                        onClick={() => voltmetrTanla(n)}
                      >
                        {n}-lampochka
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn orange mt-5 w-full justify-center"
                onClick={yozish}
              >
                Jadvalga yozish
              </button>

              <p
                className="mt-4 min-h-6 text-center font-extrabold"
                role="status"
                aria-live="polite"
              >
                {xabar}
              </p>

              <button type="button" className="btn sm mt-2" style={col("berry")} onClick={boshidan}>
                Boshidan boshlash
              </button>
            </Panel>
          </div>

          <Panel title="Natijalar jadvali" color="sky2">
            <div className="overflow-x-auto rounded-2xl">
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
                    <th style={th}>U₁ (V)</th>
                    <th style={th}>I₁ (A)</th>
                    <th style={th}>U₂ (V)</th>
                    <th style={th}>I₂ (A)</th>
                  </tr>
                </thead>
                <tbody>
                  {[4, 6].map((v, i) => (
                    <tr key={v}>
                      <td style={th}>
                        {i + 1} ({v} V)
                      </td>
                      <td style={th}>{f(tablica[v].u1)}</td>
                      <td style={th}>{f(tablica[v].i1)}</td>
                      <td style={th}>{f(tablica[v].u2)}</td>
                      <td style={th}>{f(tablica[v].i2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              Virtual modelda lampochkalar qarshiligi doimiy deb olingan (R₁ = {R1} Ω, R₂ = {R2} Ω).
            </p>
          </Panel>

          <Panel title="Savollar va xulosa" color="mint">
            <ol className="list-decimal space-y-3 pl-6 leading-7">
              <li>Eng oddiy elektr zanjir qanday asboblardan tashkil topgan?</li>
              <li>Zanjirdagi har bir asbobning vazifasini aytib bering.</li>
              <li>Nima uchun ampermetr zanjirda iste’molchiga ketma-ket ulanadi?</li>
            </ol>

            <h3 className="mb-3 mt-7 text-2xl">Tajriba xulosasi</h3>
            <label htmlFor="xulosa" className="sr-only">
              Tajriba xulosasi
            </label>
            <textarea
              id="xulosa"
              value={xulosa}
              onChange={(e) => setXulosa(e.target.value)}
              placeholder="Tajriba natijasida nimalarni o‘rgandingiz? Xulosangizni yozing..."
              rows={4}
              className="w-full p-4"
              style={{
                border: "3px solid #dbe7f5",
                borderRadius: 18,
                background: "#f7fbff",
                color: "var(--ink)",
                font: "700 17px/1.5 var(--text)",
              }}
            />
          </Panel>
        </div>
      </main>
      <Footer />
    </>
  );
}
