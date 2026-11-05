import Link from "next/link";
import type { CSSProperties } from "react";
import Atom from "./components/Atom";
import Effects from "./components/Effects";
import { Footer, Icon, Navbar, type IconName } from "./components/Site";

const col = (c: string): CSSProperties =>
  ({ "--c": `var(--${c})`, "--e": `var(--${c}-e)` }) as CSSProperties;

const SECTIONS: { n: string; title: string; text: string; color: string; icon: IconName }[] = [
  { n: "01", title: "Elektron darslik", text: "Fizika mavzularini sodda va tushunarli shaklda o‘qing.", color: "sun", icon: "book" },
  { n: "02", title: "Videodarslar", text: "Mavzularni tushuntiruvchi videodarslarni tomosha qiling.", color: "berry", icon: "play" },
  { n: "03", title: "Virtual laboratoriya", text: "Fizik tajribalarni interaktiv tarzda o‘zingiz bajaring.", color: "mint", icon: "flask" },
  { n: "04", title: "Mavzuga doir topshiriqlar", text: "O‘rgangan mavzularingiz bo‘yicha topshiriqlarni bajaring.", color: "sky2", icon: "doc" },
  { n: "05", title: "STEAM topshirig‘i", text: "Bilimlaringizni amaliy va ijodiy loyihalarda qo‘llang.", color: "orange", icon: "gear" },
  { n: "06", title: "Sertifikat", text: "Kursni muvaffaqiyatli yakunlab, sertifikatga ega bo‘ling.", color: "grape", icon: "cup" },
];

const GRADES = [
  { n: 7, color: "berry" },
  { n: 8, color: "blue" },
  { n: 9, color: "mint" },
  { n: 10, color: "sun" },
  { n: 11, color: "grape" },
];

const TICKER: [string, string][] = [
  ["F = m·a", "sun"],
  ["A = F·s", "berry"],
  ["v = s / t", "mint"],
  ["ρ = m / V", "sky2"],
  ["I = U / R", "orange"],
  ["P = A / t", "grape"],
  ["p = F / S", "sun"],
  ["Q = c·m·Δt", "berry"],
];

const STEPS = [
  { n: 1, c: "berry", t: "Sinfni tanlang", p: "Ro‘yxatdan o‘ting va o‘z sinfingizdagi fizika kursiga kiring." },
  { n: 2, c: "sun", t: "O‘qing va tajriba qiling", p: "Darslikni o‘qing, videoni ko‘ring va virtual laboratoriyada tajribani o‘zingiz bajaring." },
  { n: 3, c: "mint", t: "Topshiriqlarni bajaring", p: "Mavzuga doir va STEAM topshiriqlarini yeching, kurs oxirida sertifikat oling." },
];

export default function Home() {
  return (
    <>
      <Effects />
      <Navbar active="home" />
      <main>
        <section className="hero">
          <span className="dot" style={{ left: "4%", top: "34%", width: 26, height: 26, background: "var(--berry)" }} aria-hidden="true" />
          <span className="dot" style={{ right: "6%", top: "10%", width: 20, height: 20, background: "var(--mint)", animationDelay: "-2s" }} aria-hidden="true" />
          <span className="dot" style={{ left: "46%", bottom: "8%", width: 24, height: 24, background: "var(--orange)", animationDelay: "-4s" }} aria-hidden="true" />
          <div className="wrap hero-grid">
            <div>
              <span className="pill">7–11-sinf uchun · o‘zbek tilida</span>
              <h1>
                Fizikani <span className="hl sun">o‘ynab</span>,{" "}
                <span className="hl mint">tajriba</span> qilib o‘rganamiz!
              </h1>
              <p className="lead">
                Darsliklar, videodarslar, virtual tajribalar va qiziqarli o‘yinlar bir joyda.
                Atomni sichqoncha bilan burib ko‘ring: u sizga qaraydi.
              </p>
              <div className="cta-row">
                <Link className="btn blue" href="/sinflar">
                  O‘rganishni boshlash <Icon name="arrow" />
                </Link>
                <Link className="btn sun" href="/oyin">
                  O‘yin o‘ynash
                </Link>
              </div>
            </div>
            <Atom />
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-in">
            {[0, 1].flatMap((k) =>
              TICKER.map(([f, c]) => (
                <span key={`${k}-${f}`}>
                  <i style={{ background: `var(--${c})` }} />
                  {f}
                </span>
              ))
            )}
          </div>
        </div>

        <section className="sec wrap" id="bolimlar">
          <div className="sec-head" data-rv>
            <h2>Oltita qiziqarli bo‘lim</h2>
            <p>Mavzuni o‘qishdan sertifikat olishgacha hammasi shu yerda. Kartalar ustiga kursorni olib boring.</p>
          </div>
          <div className="cards">
            {SECTIONS.map((s) => (
              <Link key={s.n} href="/sinflar" className="card" data-tilt data-rv style={col(s.color)}>
                <span className="no">{s.n}</span>
                <span className="chip"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="go"><Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sec wrap" id="sinflar">
          <div className="sec-head" data-rv>
            <h2>Qaysi sinfda o‘qiysiz?</h2>
          </div>
          <div className="grades">
            {GRADES.map((g) => (
              <Link
                key={g.n}
                href={`/sinflar/${g.n}-sinf`}
                className={`grade ${g.color === "blue" ? "blue" : ""}`}
                data-rv
                style={col(g.color)}
              >
                <b>{g.n}</b>
                sinf
              </Link>
            ))}
          </div>
        </section>

        <section className="wrap">
          <div className="game" data-rv>
            <div>
              <span className="badge">yangi · fizika o‘yinlari</span>
              <h2>O‘ynab o‘rganing!</h2>
              <p className="muted">
                Fizika viktorinasi va tortishish kuchi sinov maydoni sizni kutmoqda: to‘g‘ri javob uchun konfetti yog‘iladi!
              </p>
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <Link className="btn orange" href="/oyin">
                O‘yinga kirish <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>

        <section className="sec wrap">
          <div className="sec-head" data-rv>
            <h2>Uch qadamda natijaga</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n} data-rv>
                <b style={{ background: `var(--${s.c})` }}>{s.n}</b>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap">
          <div className="final" data-rv>
            <span className="blob" style={{ right: -30, top: -30, width: 130, height: 130, background: "var(--sun)" }} aria-hidden="true" />
            <span className="blob" style={{ right: 180, bottom: -40, width: 90, height: 90, background: "var(--berry)" }} aria-hidden="true" />
            <div>
              <h2>Birinchi tajribangizni boshlang!</h2>
              <p>Hisob yarating va fizikani amalda o‘rganishni bugundan boshlang.</p>
            </div>
            <Link className="btn sun" href="/auth/royxatdan-otish">
              Ro‘yxatdan o‘tish
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
