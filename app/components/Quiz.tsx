"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Site";

const QS = [
  { q: "Tezlik formulasi qaysi?", a: ["v = s / t", "v = s · t", "v = t / s", "v = s + t"], e: "Tezlik bosib o‘tilgan yo‘lning vaqtga nisbatiga teng." },
  { q: "Kuch qaysi birlikda o‘lchanadi?", a: ["Nyuton", "Joul", "Vatt", "Paskal"], e: "Kuch nyutonda (N) o‘lchanadi. 1 N = 1 kg·m/s²." },
  { q: "Zichlik formulasi qaysi?", a: ["ρ = m / V", "ρ = m · V", "ρ = V / m", "ρ = m + V"], e: "Zichlik massaning hajmga nisbati: ρ = m / V." },
  { q: "Mexanik ish formulasi qaysi?", a: ["A = F · s", "A = F / s", "A = F + s", "A = s / F"], e: "Ish kuch bilan yo‘lning ko‘paytmasiga teng: A = F · s." },
  { q: "Tok kuchi qaysi birlikda o‘lchanadi?", a: ["Amper", "Volt", "Om", "Vatt"], e: "Tok kuchi amperda (A) o‘lchanadi." },
];

const COLORS = ["#FF8FA3", "#FFD166", "#5DD6A2", "#6EC8FF", "#FFA24C", "#A78BFA", "#2F5BFF"];

type Part = { x: number; y: number; vx: number; vy: number; w: number; h: number; c: string; rot: number; vr: number; life: number };

function shuffle<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [res, setRes] = useState<(boolean | null)[]>(QS.map(() => null));
  const [picked, setPicked] = useState<number | null>(null);
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);

  const cf = useRef<HTMLCanvasElement>(null);
  const qRef = useRef<HTMLParagraphElement>(null);
  const parts = useRef<Part[]>([]);
  const running = useRef(false);

  useEffect(() => {
    setOrder(shuffle([0, 1, 2, 3]));
  }, [idx, round]);

  function boom() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = cf.current;
    if (!cv) return;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const r = qRef.current?.getBoundingClientRect();
    const ox = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const oy = r ? Math.max(80, Math.min(window.innerHeight - 80, r.top + r.height / 2)) : 200;
    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 9;
      parts.current.push({
        x: ox, y: oy,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 5,
        w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
        c: COLORS[i % COLORS.length],
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, life: 1,
      });
    }
    if (running.current) return;
    running.current = true;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts.current = parts.current.filter((p) => p.life > 0 && p.y < cv.height + 40);
      parts.current.forEach((p) => {
        p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.008;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (parts.current.length) requestAnimationFrame(loop);
      else {
        running.current = false;
        ctx.clearRect(0, 0, cv.width, cv.height);
      }
    };
    requestAnimationFrame(loop);
  }

  function pick(orig: number) {
    if (picked !== null) return;
    const ok = orig === 0;
    setPicked(orig);
    setRes((r) => r.map((v, i) => (i === idx ? ok : v)));
    if (ok) {
      setScore((s) => s + 10);
      setStreak((s) => s + 1);
      boom();
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (idx < QS.length - 1) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setDone(true);
      if (score >= 40) {
        boom();
        setTimeout(boom, 350);
      }
    }
  }

  function again() {
    setIdx(0);
    setScore(0);
    setRes(QS.map(() => null));
    setPicked(null);
    setStreak(0);
    setDone(false);
    setRound((r) => r + 1);
  }

  const q = QS[idx];
  const right = score / 10;

  return (
    <div className="game" data-rv>
      <canvas ref={cf} id="confetti" aria-hidden="true" />
      <div>
        <span className="badge">fizika o‘yini</span>
        <h2>Fizika viktorinasi</h2>
        <p className="muted">Beshta savol, to‘rt rangli javob. To‘g‘ri javob uchun 10 ball olasiz.</p>
        <div className="score">
          <b>{score}</b>
          <span className="muted">ball</span>
        </div>
        <div className="dots" aria-hidden="true">
          {QS.map((_, i) => (
            <span key={i} className={res[i] === true ? "ok" : res[i] === false ? "bad" : i === idx && !done ? "now" : ""} />
          ))}
        </div>
        {streak >= 2 && (
          <div key={streak} className="combo pop">
            Ketma-ket {streak} ta to‘g‘ri! Ajoyib!
          </div>
        )}
      </div>

      <div className="quiz">
        {!done ? (
          <div>
            <p className="q" ref={qRef}>
              {idx + 1}. {q.q}
            </p>
            <div className="opts">
              {order.map((orig, pos) => {
                let cls = `opt c${pos}`;
                if (picked !== null) {
                  if (orig === 0) cls += " right";
                  else if (orig === picked) cls += " wrong";
                  else cls += " dim";
                }
                return (
                  <button key={orig} type="button" className={cls} disabled={picked !== null} onClick={() => pick(orig)}>
                    <i>{"ABCD"[pos]}</i>
                    {q.a[orig]}
                  </button>
                );
              })}
            </div>
            <div className={`fb ${picked === null ? "" : picked === 0 ? "ok" : "bad"}`} role="status" aria-live="polite">
              {picked !== null && (
                <>
                  <strong>{picked === 0 ? "To‘g‘ri!" : "Deyarli!"}</strong>
                  {q.e}
                </>
              )}
            </div>
            {picked !== null && (
              <button type="button" className="btn orange sm" onClick={next} autoFocus>
                {idx === QS.length - 1 ? "Natijani ko‘rish" : "Keyingi savol"} <Icon name="arrow" />
              </button>
            )}
          </div>
        ) : (
          <div className="end">
            <b>{score}</b>
            <h3>{right === 5 ? "Ajoyib! Siz haqiqiy fizik!" : right >= 3 ? "Yaxshi natija!" : "Yaxshi boshlanish!"}</h3>
            <p className="muted">
              {right} ta savolga to‘g‘ri javob berdingiz. {right === 5 ? "Hammasi to‘g‘ri." : "Yana urinib, 50 ballga chiqing."}
            </p>
            <button type="button" className="btn sun sm" onClick={again}>
              Qaytadan o‘ynash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
