import type { Metadata } from "next";
import Link from "next/link";
import Effects from "../../../components/Effects";
import { Footer, Icon, Navbar } from "../../../components/Site";

export const metadata: Metadata = {
  title: "8-sinf elektron darslik",
  description: "8-sinf fizika elektron darsliklari.",
};

const MAVZULAR = [
  {
    n: "1",
    title: "1-mavzu. Fizika darsligi",
    href: "/darsliklar/8-SINF%20Darslik%201-mavzu.pdf",
    color: "sun",
  },
];

export default function ElektronDarslik() {
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
          <h1>Elektron darsliklar</h1>
          <p>8-sinf fizika mavzularini o‘qing.</p>
        </div>

        <div style={{ display: "grid", gap: 26, marginTop: 30, maxWidth: 760 }}>
          {MAVZULAR.map((m) => (
            <div
              key={m.n}
              data-rv
              style={{
                background: `var(--${m.color})`,
                boxShadow: `0 11px 0 var(--${m.color}-e)`,
                borderRadius: 30,
                padding: "clamp(20px, 4vw, 32px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
                <span
                  style={{
                    width: 66,
                    height: 66,
                    flex: "none",
                    borderRadius: "50%",
                    background: "var(--white)",
                    boxShadow: "0 5px 0 rgba(31,42,68,.18)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 32,
                  }}
                >
                  <Icon name="book" />
                </span>
                <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>{m.title}</h2>
              </div>

              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn blue"
              >
                Darslikni ochish <Icon name="arrow" />
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
