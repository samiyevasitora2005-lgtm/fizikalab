"use client";

import type { CSSProperties } from "react";

export type Jarayon = "tinch" | "ishqalash" | "qogoz";

// Minus belgilari sharning ichida joylashadigan o‘rinlar (foiz)
const MINUS_JOY: [number, number][] = [
  [30, 28], [60, 24], [45, 42], [24, 52], [68, 48], [40, 64], [58, 70], [34, 80], [52, 12],
];

export default function ZaryadSahna({
  jarayon,
  zaryad,
  tortiladi,
  holat,
}: {
  jarayon: Jarayon;
  zaryad: number;
  tortiladi: boolean;
  holat: string;
}) {
  const minuslar = zaryad > 0 ? Math.min(MINUS_JOY.length, Math.max(2, Math.ceil(zaryad / 12))) : 0;
  const yonish = zaryad / 100;
  const rub = jarayon === "ishqalash";

  return (
    <div className="zs" role="group" aria-label="Virtual tajriba stoli: shar, jun mato va qog‘oz bo‘laklari">
      <style>{`
        .zs{position:relative;container-type:inline-size;width:100%;aspect-ratio:16/9;overflow:hidden;
          border-radius:28px;border:4px solid #f0d9a8;perspective:150cqw;perspective-origin:50% 10%;
          background:linear-gradient(180deg,#bfe6ff 0%,#e8f6ff 40%,#fff1d6 40.1%);isolation:isolate}
        @media (max-width:640px){.zs{aspect-ratio:4/3}}
        .zs *{box-sizing:border-box}
        .zs-sun{position:absolute;border-radius:50%}
        .zs-tag{position:absolute;top:2.4cqw;z-index:8;padding:.8cqw 2cqw;border-radius:99px;background:#fff;
          font:800 max(12px,1.9cqw)/1 var(--text,inherit);color:#1f2a44;box-shadow:0 .5cqw 0 #c9deee}
        .zs-table{position:absolute;left:-10%;width:120%;top:40%;height:92%;transform-origin:50% 0;
          transform:rotateX(54deg);transform-style:preserve-3d;
          background:linear-gradient(180deg,rgba(255,255,255,.25),rgba(0,0,0,.12)),
            repeating-linear-gradient(90deg,#c99560 0 3.2cqw,#bd8854 3.2cqw 6.4cqw,#c4905a 6.4cqw 8.6cqw);
          box-shadow:0 0 6cqw rgba(90,50,10,.35) inset}
        .zs-table::before{content:"";position:absolute;inset:0;
          background:repeating-linear-gradient(0deg,rgba(90,50,10,.07) 0 .25cqw,transparent .25cqw 2.2cqw)}
        .zs-cloth{position:absolute;left:15%;top:18%;width:25%;height:50%;transform-style:preserve-3d;transform:rotateZ(-3deg)}
        .zs-cloth i{position:absolute;inset:0;border-radius:1.6cqw}
        .zs-cloth .top{background:repeating-linear-gradient(45deg,#8e6b4b 0,#e4cfb2 .6cqw,#9a7856 1.2cqw,#d9bc98 1.8cqw);
          border:.5cqw solid #7a5535}
        .zs-cloth .top::after{content:"";position:absolute;inset:1.2cqw;border:.4cqw dashed #f3e2c4;border-radius:1cqw;opacity:.85}
        .zs-cloth .top::before{content:"";position:absolute;inset:0;border-radius:1.2cqw;
          background:linear-gradient(115deg,rgba(255,255,255,.35),transparent 30%,rgba(0,0,0,.18) 55%,transparent 75%)}
        .zs-papers{position:absolute;left:67%;top:22%;width:16%;height:40%;transform-style:preserve-3d}
        .zs-paper{position:absolute;width:4.6cqw;height:3.3cqw;background:linear-gradient(135deg,#fff,#eef3fa);
          border:1px solid #cdd6e3;border-radius:.3cqw;box-shadow:0 .3cqw .8cqw rgba(60,30,0,.35);
          transition:transform 1.2s cubic-bezier(.3,.7,.2,1)}
        .zs-paper::after{content:"";position:absolute;left:12%;right:12%;top:30%;height:40%;
          background:repeating-linear-gradient(0deg,#c9d6e8 0 1px,transparent 1px .7cqw)}
        .zs-balloon{position:absolute;left:41cqw;bottom:9.5cqw;width:14cqw;z-index:5;display:flex;flex-direction:column;
          align-items:center;transition:none}
        .zs-balloon.rub{animation:zs-rub 2.4s ease-in-out}
        .zs-balloon.near{transform:translateX(55%);transition:transform 1s ease-in-out}
        .zs-shadow{position:absolute;bottom:-1.4cqw;left:50%;width:15cqw;height:3cqw;transform:translateX(-50%);
          background:radial-gradient(ellipse at center,rgba(40,20,0,.45),rgba(40,20,0,0) 70%);filter:blur(.3cqw);z-index:-1}
        .zs-body{position:relative;width:14cqw;height:19cqw;border-radius:50% 50% 47% 47%/56% 56% 44% 44%;
          background:radial-gradient(circle at 32% 26%,#ffd6cf 0,#ff6a6a 20%,#e31828 60%,#8d0717 100%);
          box-shadow:inset -1.4cqw -1.8cqw 2.8cqw rgba(80,0,10,.6),inset .9cqw .9cqw 1.8cqw rgba(255,210,200,.45)}
        .zs-gloss{position:absolute;left:19%;top:9%;width:22%;height:30%;border-radius:50%;
          background:linear-gradient(160deg,rgba(255,255,255,.9),rgba(255,255,255,0));transform:rotate(-28deg);filter:blur(.25cqw)}
        .zs-minus{position:absolute;color:#fff;font:900 max(14px,3.4cqw)/1 var(--display,inherit);
          text-shadow:0 0 .8cqw rgba(255,255,255,.9),0 .2cqw .3cqw rgba(0,0,0,.35);transform:translate(-50%,-50%)}
        .zs-knot{width:2.6cqw;height:1.8cqw;margin-top:-.4cqw;background:#a50f1c;clip-path:polygon(0 0,100% 0,50% 100%)}
        .zs-string{width:3.4cqw;height:8cqw;margin-top:-.2cqw}
        .zs-ele{position:absolute;left:25cqw;top:25cqw;z-index:7;display:flex;gap:1.8cqw;font:900 max(16px,3.6cqw)/1 var(--display,inherit);color:#2f5bff;
          text-shadow:0 0 1cqw #fff}
        .zs-ele span{animation:zs-ele .65s infinite}
        .zs-cap{position:absolute;left:50%;bottom:1.4cqw;width:94%;transform:translateX(-50%);z-index:9;text-align:center;
          padding:.8cqw 2cqw;border-radius:18px;background:rgba(255,255,255,.94);box-shadow:0 .6cqw 0 rgba(0,0,0,.12);
          font:800 max(13px,2cqw)/1.35 var(--text,inherit);color:#1f2a44}
        .zs-wool-shake{animation:zs-wool .35s ease-in-out infinite}
        @keyframes zs-rub{
          0%{transform:translate(0,0) rotate(0)}12%{transform:translate(-100%,-6%) rotate(-12deg)}
          25%{transform:translate(-125%,0) rotate(-18deg)}38%{transform:translate(-95%,-8%) rotate(-8deg)}
          50%{transform:translate(-125%,0) rotate(-18deg)}63%{transform:translate(-95%,-8%) rotate(-8deg)}
          75%{transform:translate(-125%,0) rotate(-18deg)}88%{transform:translate(-100%,-6%) rotate(-12deg)}
          100%{transform:translate(0,0) rotate(0)}}
        @keyframes zs-wool{0%,100%{transform:rotateZ(-3deg)}25%,75%{transform:rotateZ(-6deg)}50%{transform:rotateZ(0deg)}}
        @keyframes zs-ele{0%{opacity:0;transform:translateX(-1.6cqw)}50%{opacity:1}100%{opacity:0;transform:translateX(2.8cqw)}}
        @media (prefers-reduced-motion:reduce){.zs-balloon.rub,.zs-wool-shake,.zs-ele span{animation:none!important}}
      `}</style>

      {/* Devordagi bezaklar */}
      <span className="zs-sun" style={{ left: "62%", top: "9%", width: "6cqw", height: "6cqw", background: "#ffd166", boxShadow: "0 .6cqw 0 #e0a21f" }} />
      <span className="zs-sun" style={{ right: "26%", top: "14%", width: "3.4cqw", height: "3.4cqw", background: "#ff8fa3", boxShadow: "0 .4cqw 0 #d9506b" }} />
      <span className="zs-sun" style={{ left: "30%", top: "20%", width: "2.6cqw", height: "2.6cqw", background: "#7fe0b5", boxShadow: "0 .3cqw 0 #2fb07a" }} />

      <span className="zs-tag" style={{ left: "7cqw" }}>Jun mato</span>
      <span className="zs-tag" style={{ left: "44cqw" }}>Shar</span>
      <span className="zs-tag" style={{ right: "5cqw" }}>Qog‘oz bo‘laklari</span>

      {/* Stol (3D tekislik) */}
      <div className="zs-table" aria-hidden="true">
        <div className={`zs-cloth ${rub ? "zs-wool-shake" : ""}`}>
          {[0, 1, 2, 3, 4].map((k) => (
            <i key={k} style={{ transform: `translateZ(${k * 0.32}cqw)`, background: k === 0 ? "#3d2812" : `hsl(28 38% ${24 + k * 5}%)` }} />
          ))}
          <i className="top" style={{ transform: "translateZ(1.7cqw)" }} />
        </div>

        <div className="zs-papers">
          {Array.from({ length: 12 }).map((_, i) => {
            const rot = (i * 37) % 90 - 45;
            const left = `${(i % 4) * 24 + (i % 3) * 3}%`;
            const top = `${Math.floor(i / 4) * 30 + (i % 2) * 6}%`;
            const t = tortiladi
              ? `translate3d(${-7 - (i % 3) * 3.5}cqw, ${(i % 4) * 0.6}cqw, ${7 + (i % 4) * 3.2}cqw) rotateZ(${rot / 2}deg) rotateY(${i % 2 ? 28 : -28}deg) rotateX(${-18 - (i % 3) * 8}deg)`
              : `translateZ(.15cqw) rotateZ(${rot}deg)`;
            const s: CSSProperties = { left, top, transform: t, transitionDelay: tortiladi ? `${i * 45}ms` : "0ms" };
            return <div key={i} className="zs-paper" style={s} />;
          })}
        </div>
      </div>

      {/* Elektronlar */}
      {rub && (
        <div className="zs-ele" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>e⁻</span>
          ))}
        </div>
      )}

      {/* Shar */}
      <div className={`zs-balloon ${rub ? "rub" : jarayon === "qogoz" ? "near" : ""}`} aria-hidden="true">
        <div className="zs-shadow" />
        <div
          className="zs-body"
          style={{
            filter: yonish > 0 ? `drop-shadow(0 0 ${0.4 + yonish * 2.2}cqw rgba(255,90,90,${0.25 + yonish * 0.5}))` : undefined,
          }}
        >
          <i className="zs-gloss" />
          {MINUS_JOY.slice(0, minuslar).map(([x, y], i) => (
            <span key={i} className="zs-minus" style={{ left: `${x}%`, top: `${y}%` }}>−</span>
          ))}
        </div>
        <div className="zs-knot" />
        <svg className="zs-string" viewBox="0 0 34 80" preserveAspectRatio="none">
          <path d="M17 0 C 4 18, 30 34, 15 52 S 22 70, 17 80" fill="none" stroke="#475569" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>

      <div className="zs-cap" role="status" aria-live="polite">{holat}</div>
    </div>
  );
}
