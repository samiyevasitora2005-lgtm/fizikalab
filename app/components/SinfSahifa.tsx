import Link from "next/link";
import type { CSSProperties } from "react";
import Effects from "./Effects";
import { Footer, Icon, Navbar } from "./Site";

const col = (c: string): CSSProperties =>
  ({ "--c": `var(--${c})`, "--e": `var(--${c}-e)` }) as CSSProperties;

const BOLIMLAR = [
  { n: "Elektron darslik", t: "Darslikni onlayn o‘qing.", c: "sky2" },
  { n: "Videodarslar", t: "Mavzular bo‘yicha qisqa videolar.", c: "berry" },
  { n: "Virtual laboratoriya", t: "Tajribalarni o‘zingiz bajaring.", c: "mint" },
  { n: "Mavzuga doir topshiriqlar", t: "Bilimingizni sinab ko‘ring.", c: "sun" },
  { n: "STEAM", t: "Fizika va hayot: amaliy loyihalar.", c: "orange" },
  { n: "Sertifikat", t: "Natijangiz uchun guvohnoma.", c: "grape" },
];

export default function SinfSahifa({ sinf, rang }: { sinf: number; rang: string }) {
  const oldingi = sinf - 1;
  const keyingi = sinf + 1;
  return (
    <>
      <Effects />
      <Navbar active="darslik" />
      <main className="wrap">
        <div className="page-hero">
          <Link href="/sinflar" className="back">
            <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
              <Icon name="arrow" />
            </span>
            Sinflar
          </Link>
          <span className="pill" style={{ justifySelf: "start" }}>
            {sinf}-sinf
          </span>
          <h1 style={{ maxWidth: "14em" }}>{sinf}-sinf fizikasi</h1>
          <p style={{ maxWidth: "36em", fontWeight: 700, lineHeight: 1.7 }}>
            Bu bo‘lim tayyorlanmoqda. Darslik, videodarslar va virtual laboratoriyalar tez orada
            shu yerda paydo bo‘ladi. Hozircha fizika o‘yinini o‘ynab ko‘rishingiz mumkin.
          </p>
        </div>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Bo‘limlar">
          {BOLIMLAR.map((b) => (
            <div
              key={b.n}
              data-rv
              className="rounded-[28px] p-6"
              style={{ background: `var(--${b.c})`, boxShadow: `0 8px 0 var(--${b.c}-e)` }}
            >
              <b style={{ font: "600 24px/1.2 var(--display)", display: "block" }}>{b.n}</b>
              <p className="mt-2 leading-7">{b.t}</p>
              <span
                className="mt-4 inline-block rounded-full px-4 py-1 font-extrabold"
                style={{ background: "rgba(255,255,255,.7)", color: "var(--ink)" }}
              >
                Tez orada
              </span>
            </div>
          ))}
        </section>

        <section
          data-rv
          className="mt-10 rounded-[32px] bg-white p-6 sm:p-8"
          style={{ boxShadow: "0 10px 0 #c9deee" }}
        >
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-5 w-5 flex-none rounded-full"
              style={{ background: `var(--${rang})`, boxShadow: `0 3px 0 var(--${rang}-e)` }}
            />
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>Hozir mavjud</h2>
          </div>
          <p className="leading-8">
            Fizika bo‘yicha savol-javob o‘yini hamma sinflar uchun ochiq. Bilimingizni sinab ko‘ring!
          </p>
          <div className="mt-5">
            <Link href="/oyin" className="btn orange">
              Fizika o‘yini <Icon name="arrow" />
            </Link>
          </div>
        </section>

        <nav className="my-10 flex flex-wrap justify-between gap-4" aria-label="Boshqa sinflar">
          {oldingi >= 7 ? (
            <Link href={`/sinflar/${oldingi}-sinf`} className="btn sm" style={col("sun")}>
              {oldingi}-sinf
            </Link>
          ) : (
            <span />
          )}
          {keyingi <= 11 ? (
            <Link href={`/sinflar/${keyingi}-sinf`} className="btn sm" style={col("mint")}>
              {keyingi}-sinf
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
