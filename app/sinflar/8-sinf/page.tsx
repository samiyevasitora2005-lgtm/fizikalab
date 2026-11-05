import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Effects from "../../components/Effects";
import { Footer, Icon, Navbar, type IconName } from "../../components/Site";

const SINF = 8;

export const metadata: Metadata = {
  title: `${SINF}-sinf fizika`,
  description: `${SINF}-sinf fizika bo‘limlari: elektron darslik, videodarslar, virtual laboratoriya va boshqalar.`,
};

const SECTIONS: { n: string; title: string; text: string; color: string; icon: IconName; link: string }[] = [
  { n: "01", title: "Elektron darslik", text: `${SINF}-sinf fizika mavzularini elektron shaklda o‘rganing.`, color: "sun", icon: "book", link: `/sinflar/${SINF}-sinf/elektron-darslik` },
  { n: "02", title: "Videodarslar", text: "Mavzularni tushuntiruvchi videodarslarni tomosha qiling.", color: "berry", icon: "play", link: `/sinflar/${SINF}-sinf/videodarslar` },
  { n: "03", title: "Virtual laboratoriya", text: "Fizik tajribalarni interaktiv tarzda bajaring.", color: "mint", icon: "flask", link: `/sinflar/${SINF}-sinf/virtual-laboratoriya` },
  { n: "04", title: "Mavzuga doir topshiriqlar", text: "O‘rgangan mavzularingiz bo‘yicha topshiriqlarni bajaring.", color: "sky2", icon: "doc", link: `/sinflar/${SINF}-sinf/mavzuga-doir-topshiriqlar` },
  { n: "05", title: "STEAM topshirig‘i", text: "Bilimlaringizni amaliy va ijodiy loyihalarda qo‘llang.", color: "orange", icon: "gear", link: `/sinflar/${SINF}-sinf/steam` },
  { n: "06", title: "Sertifikat", text: "Kursni muvaffaqiyatli yakunlab, sertifikatga ega bo‘ling.", color: "grape", icon: "cup", link: `/sinflar/${SINF}-sinf/sertifikat` },
];

export default function SinfPage() {
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
          <h1>{SINF}-sinf fizika</h1>
          <p>O‘rganish bo‘limini tanlang.</p>
        </div>
        <div className="cards" style={{ marginTop: 30 }}>
          {SECTIONS.map((s) => (
            <Link
              key={s.n}
              href={s.link}
              className="card"
              data-tilt
              data-rv
              style={{ "--c": `var(--${s.color})`, "--e": `var(--${s.color}-e)` } as CSSProperties}
            >
              <span className="no">{s.n}</span>
              <span className="chip">
                <Icon name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="go">
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
