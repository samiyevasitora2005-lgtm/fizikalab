"use client";

import { useEffect, useRef, useState } from "react";

const WORLDS = [
  { n: "Oy", g: 1.62, c: "grape" },
  { n: "Mars", g: 3.7, c: "berry" },
  { n: "Yer", g: 9.8, c: "mint" },
  { n: "Yupiter", g: 24.8, c: "sun" },
];
const BC = ["#FF8FA3", "#FFD166", "#5DD6A2", "#6EC8FF", "#FFA24C", "#A78BFA"];

type Ball = { x: number; y: number; vx: number; vy: number; r: number; c: string };

export default function Toy() {
  const [w, setW] = useState(2);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef(WORLDS[2].g);
  const balls = useRef<Ball[]>([]);

  useEffect(() => {
    gRef.current = WORLDS[w].g;
    balls.current.forEach((b) => {
      b.vy = -120 - Math.random() * 160;
    });
  }, [w]);

  useEffect(() => {
    const c = cvRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;
    let W = 0, H = 0, vis = true, last = 0, raf = 0;

    const fit = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * d;
      c.height = H * d;
      x.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);

    const add = (px: number, py: number) => {
      if (balls.current.length > 45) balls.current.shift();
      balls.current.push({
        x: px, y: py,
        vx: (Math.random() - 0.5) * 260, vy: 0,
        r: 14 + Math.random() * 16,
        c: BC[Math.floor(Math.random() * BC.length)],
      });
    };
    balls.current = [];
    for (let i = 0; i < 6; i++) add(80 + i * Math.max(40, (W - 160) / 6), 40 + Math.random() * 80);

    const down = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      add(e.clientX - r.left, e.clientY - r.top);
    };
    c.addEventListener("pointerdown", down);

    const io = new IntersectionObserver((en) => {
      vis = en[0].isIntersecting;
    });
    io.observe(c);

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 1000 || 0.016, 0.04);
      last = t;
      if (!vis) return;
      x.clearRect(0, 0, W, H);
      x.fillStyle = "rgba(255,255,255,.7)";
      for (let s = 0; s < 24; s++) x.fillRect((s * 97) % W, (s * 61) % (H * 0.7), 2, 2);
      balls.current.forEach((b) => {
        b.vy += gRef.current * 80 * dt;
        b.y += b.vy * dt;
        b.x += b.vx * dt;
        if (b.y > H - b.r) {
          b.y = H - b.r;
          b.vy *= -0.74;
          b.vx *= 0.94;
          if (Math.abs(b.vy) < 40) b.vy = 0;
        }
        if (b.x < b.r) { b.x = b.r; b.vx *= -0.9; }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx *= -0.9; }
        const g = x.createRadialGradient(b.x - b.r * 0.35, b.y - b.r * 0.4, b.r * 0.1, b.x, b.y, b.r);
        g.addColorStop(0, "#FFFFFF");
        g.addColorStop(0.25, b.c);
        g.addColorStop(1, b.c);
        x.fillStyle = "rgba(0,0,0,.25)";
        x.beginPath();
        x.ellipse(b.x, H - 4, b.r * 0.9, 5, 0, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = g;
        x.beginPath();
        x.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        x.fill();
      });
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      c.removeEventListener("pointerdown", down);
    };
  }, []);

  const cur = WORLDS[w];

  return (
    <div className="toy" data-rv>
      <div className="toy-bar">
        <h3>Tortishish kuchi sinov maydoni</h3>
        <div className="gs" role="group" aria-label="Sayyorani tanlang">
          {WORLDS.map((o, i) => (
            <button
              key={o.n}
              type="button"
              className="gb"
              aria-pressed={i === w}
              onClick={() => setW(i)}
              style={{ "--c": `var(--${o.c})`, "--e": `var(--${o.c}-e)` } as React.CSSProperties}
            >
              {o.n}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={cvRef} id="t-cv" role="img" aria-label="Sakraydigan sharlar maydoni. Bosib yangi shar tashlang." />
      <p>
        Maydonni bosib shar tashlang va sayyorani almashtiring:{" "}
        <span id="t-g">
          {cur.n}: g = {String(cur.g).replace(".", ",")} m/s²
        </span>
        . Oyda shar qanchalik sekin tushishini ko‘ring!
      </p>
    </div>
  );
}
