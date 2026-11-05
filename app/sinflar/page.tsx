import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Effects from "../components/Effects";
import { Footer, Icon, Navbar } from "../components/Site";

export const metadata: Metadata = {
  title: "Sinflar",
  description: "O‘rganish uchun sinfni tanlang: 7–11-sinf fizika.",
};

const GRADES = [
  { n: 7, c: "berry", open: true },
  { n: 8, c: "blue", open: true },
  { n: 9, c: "mint", open: true },
  { n: 10, c: "sun", open: true },
  { n: 11, c: "grape", open: true },
];

export default function SinflarPage() {
  return (
    <>
      <Effects />
      <Navbar active="darslik" />
      <main className="wrap" style={{ paddingBottom: 20 }}>
        <div className="page-hero">
          <h1>Sinflar</h1>
          <p>O‘rganish uchun sinfni tanlang.</p>
        </div>
        <div className="cards" style={{ marginTop: 30 }}>
          {GRADES.map((g) => {
            const style = { "--c": `var(--${g.c})`, "--e": `var(--${g.c}-e)`, color: g.c === "blue" ? "#fff" : undefined } as CSSProperties;
            const inner = (
              <>
                <span style={{ font: "700 clamp(5rem,10vw,7rem)/0.9 var(--display)" }}>{g.n}</span>
                <h3>{g.n}-sinf fizika</h3>
                <p>{g.open ? "6 ta bo‘lim sizni kutmoqda." : "Tez orada ochiladi."}</p>
                {g.open && (
                  <span className="go">
                    <Icon name="arrow" />
                  </span>
                )}
              </>
            );
            return g.open ? (
              <Link key={g.n} href={`/sinflar/${g.n}-sinf`} className="card" data-tilt data-rv style={style}>
                {inner}
              </Link>
            ) : (
              <div key={g.n} className="card soon" data-rv style={style}>
                {inner}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
