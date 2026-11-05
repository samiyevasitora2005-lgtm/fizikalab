"use client";

import Link from "next/link";
import { useState } from "react";
import Effects from "../../../components/Effects";
import { Footer, Icon, Navbar } from "../../../components/Site";

export default function Videodarslar() {
  const [tanlangan, setTanlangan] = useState(false);

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
          <h1>Videodarslar</h1>
          <p>Videodarsni tomosha qilish uchun mavzuni tanlang.</p>
        </div>

        <div style={{ maxWidth: 860, marginTop: 30, display: "grid", gap: 24 }}>
          <button
            type="button"
            onClick={() => setTanlangan(!tanlangan)}
            aria-expanded={tanlangan}
            style={{
              width: "100%",
              border: 0,
              cursor: "pointer",
              textAlign: "left",
              background: "var(--berry)",
              color: "var(--ink)",
              borderRadius: 28,
              padding: "clamp(18px, 3vw, 26px)",
              boxShadow: tanlangan ? "0 0 0 var(--berry-e)" : "0 10px 0 var(--berry-e)",
              transform: tanlangan ? "translateY(10px)" : "none",
              transition: "transform .1s, box-shadow .1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              font: "600 clamp(1.2rem, 2.6vw, 1.7rem)/1.2 var(--display)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
              <span
                style={{
                  width: 60,
                  height: 60,
                  flex: "none",
                  borderRadius: "50%",
                  background: "var(--white)",
                  boxShadow: "0 5px 0 rgba(31,42,68,.18)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 30,
                }}
              >
                <Icon name="play" />
              </span>
              1-mavzu. Jismlarning zaryadlanishi
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 44,
                height: 44,
                flex: "none",
                borderRadius: "50%",
                background: "var(--white)",
                display: "grid",
                placeItems: "center",
                fontSize: 20,
                transform: tanlangan ? "rotate(90deg)" : "none",
                transition: "transform .2s",
              }}
            >
              <Icon name="arrow" />
            </span>
          </button>

          {tanlangan && (
            <div
              style={{
                background: "var(--ink)",
                borderRadius: 32,
                boxShadow: "0 12px 0 #111a30",
                padding: "clamp(10px, 2vw, 18px)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16 / 9",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 22,
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/r-MdcNwbDNU"
                  title="1-mavzu. Jismlarning zaryadlanishi"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
