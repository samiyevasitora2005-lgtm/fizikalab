"use client";

// 8-sinf STEAM: "Sharni junga ishqalash" tajriba sahnasi.
// Fon sifatida haqiqiy rasm ishlatiladi: public/zaryad-fon.jpg
// Rasm ustida animatsiyalar: ishqalash, elektronlar, zaryad nuri, qog'ozlarning tortilishi.

type Jarayon = "tinch" | "ishqalash" | "qogoz";

type Props = {
  jarayon: Jarayon;
  zaryad: number; // 0..100
  tortiladi: boolean;
  holat: string;
};

// Qog'ozlar: [dam olish x%, y%, burchak, tortilgan x%, y%, burchak]
const PAPERS: [number, number, number, number, number, number][] = [
  [68, 71, -18, 57.5, 34, 20],
  [72, 78, 24, 59.5, 39, -30],
  [76, 69, 8, 60.5, 45, 35],
  [80, 76, -32, 61, 51, -12],
  [84, 70, 40, 60.5, 57, 28],
  [88, 80, -10, 59.5, 62, -36],
  [92, 73, 28, 58, 67, 14],
  [70, 85, 14, 57, 43, -24],
  [75, 87, -26, 59, 49, 32],
  [79, 83, 34, 60, 55, -18],
  [83, 88, -14, 59.5, 60, 24],
  [87, 85, 22, 58.5, 65, -28],
  [91, 87, -36, 57.5, 70, 18],
  [95, 77, 12, 56.5, 37, -8],
];

// Shardagi "−" belgilari joylashuvi (%)
const MINUS: [number, number][] = [
  [41, 30],
  [47, 28],
  [52, 34],
  [38, 40],
  [45, 38],
  [51, 44],
  [40, 50],
  [47, 49],
  [53, 54],
  [42, 60],
  [49, 62],
  [37, 56],
];

// Elektronlar: mato → shar (dx, dy bosh nuqtadan, % emas cqw)
const ELE = [
  { x: 34, y: 30, dx: 6, dy: 4, d: 0 },
  { x: 36, y: 38, dx: 8, dy: 1, d: 0.25 },
  { x: 33, y: 46, dx: 9, dy: -2, d: 0.5 },
  { x: 35, y: 34, dx: 10, dy: 6, d: 0.75 },
  { x: 34, y: 52, dx: 8, dy: -6, d: 1.0 },
  { x: 36, y: 42, dx: 11, dy: 2, d: 1.25 },
];

export default function ZaryadSahna({ jarayon, zaryad, tortiladi, holat }: Props) {
  const z = Math.max(0, Math.min(100, zaryad));
  const minusSoni = Math.min(MINUS.length, Math.ceil(z / 8.5));
  const ishq = jarayon === "ishqalash";

  return (
    <div className={"zs" + (ishq ? " rub" : "")} role="group" aria-label="Sharni junga ishqalash tajribasi">
      <style>{`
        .zs{position:relative;width:100%;aspect-ratio:1672/832;overflow:hidden;border-radius:26px;
          container-type:inline-size;background:#d9a066;box-shadow:0 8px 0 rgba(31,42,68,.18);isolation:isolate}
        .zs-img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;user-select:none;-webkit-user-drag:none}
        .zs.rub .zs-img{animation:zs-shake .32s ease-in-out infinite}
        .zs-glow{position:absolute;left:29%;top:13%;width:32%;height:70%;border-radius:50%;pointer-events:none;
          background:radial-gradient(ellipse at 50% 50%,rgba(255,244,120,.55),rgba(255,90,90,.28) 55%,transparent 72%);
          mix-blend-mode:screen;transition:opacity .5s ease}
        .zs-minus{position:absolute;width:2.6cqw;height:2.6cqw;margin:-1.3cqw 0 0 -1.3cqw;border-radius:50%;
          background:#fff;color:#c4162a;font:900 2.1cqw/2.6cqw system-ui,sans-serif;text-align:center;
          box-shadow:0 .2cqw .6cqw rgba(120,0,20,.45);animation:zs-pop .45s cubic-bezier(.3,1.6,.5,1) both}
        .zs-ele{position:absolute;width:2.4cqw;height:2.4cqw;margin:-1.2cqw 0 0 -1.2cqw;border-radius:50%;
          background:#fff6a8;border:.25cqw solid #e0a21f;color:#7a4a00;font:900 1.2cqw/1.9cqw system-ui,sans-serif;
          text-align:center;opacity:0;animation:zs-ele 1.5s ease-in infinite}
        .zs-paper{position:absolute;width:2.5cqw;height:1.9cqw;margin:-.95cqw 0 0 -1.25cqw;background:#fff;
          border-radius:.25cqw;box-shadow:0 .25cqw .5cqw rgba(60,40,10,.35),inset 0 0 0 .1cqw rgba(0,0,0,.06);
          transform:rotate(var(--r0));
          transition:left .95s cubic-bezier(.3,1.25,.5,1),top .95s cubic-bezier(.3,1.25,.5,1),transform .95s ease;
          transition-delay:var(--dl)}
        .zs-paper.up{left:var(--x1)!important;top:var(--y1)!important;transform:rotate(var(--r1)) scale(1.08);
          animation:zs-wig 1.4s ease-in-out infinite;animation-delay:calc(var(--dl) + .9s)}
        .zs-cap{position:absolute;left:67%;bottom:1.6cqw;transform:translateX(-50%);max-width:58%;padding:.7cqw 1.8cqw;
          border-radius:99cqw;background:rgba(255,255,255,.94);color:#1f2a44;font:800 max(12px,1.5cqw)/1.3 system-ui,sans-serif;
          text-align:center;box-shadow:0 .4cqw 0 rgba(31,42,68,.22);border:.25cqw solid #1f2a44}
        @keyframes zs-shake{0%,100%{transform:scale(1.012) translate(0,0)}25%{transform:scale(1.012) translate(.4%,-.3%)}75%{transform:scale(1.012) translate(-.4%,.3%)}}
        @keyframes zs-pop{from{transform:scale(0)}to{transform:scale(1)}}
        @keyframes zs-ele{0%{opacity:0;transform:translate(0,0) scale(.6)}15%{opacity:1}85%{opacity:1}
          100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1)}}
        @keyframes zs-wig{0%,100%{margin-top:-.95cqw}50%{margin-top:-1.35cqw}}
        @media (prefers-reduced-motion:reduce){.zs *,.zs{animation:none!important;transition:none!important}}
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="zs-img" src="/zaryad-fon.jpg" alt="Qizil sharni jun matoga ishqalash, stolda qog'oz bo'laklari" draggable={false} />

      <div className="zs-glow" aria-hidden style={{ opacity: Math.min(1, z / 70) }} />

      {Array.from({ length: minusSoni }).map((_, i) => (
        <span key={i} className="zs-minus" aria-hidden style={{ left: MINUS[i][0] + "%", top: MINUS[i][1] + "%" }}>
          −
        </span>
      ))}

      {ishq &&
        ELE.map((e, i) => (
          <span
            key={i}
            className="zs-ele"
            aria-hidden
            style={
              {
                left: e.x + "%",
                top: e.y + "%",
                animationDelay: e.d + "s",
                ["--dx" as string]: e.dx + "cqw",
                ["--dy" as string]: e.dy + "cqw",
              } as React.CSSProperties
            }
          >
            e⁻
          </span>
        ))}

      {PAPERS.map((p, i) => (
        <span
          key={i}
          className={"zs-paper" + (tortiladi ? " up" : "")}
          aria-hidden
          style={
            {
              left: p[0] + "%",
              top: p[1] + "%",
              ["--r0" as string]: p[2] + "deg",
              ["--x1" as string]: p[3] + "%",
              ["--y1" as string]: p[4] + "%",
              ["--r1" as string]: p[5] + "deg",
              ["--dl" as string]: i * 0.05 + "s",
            } as React.CSSProperties
          }
        />
      ))}

      <div className={"zs-cap"} role="status">
        {holat}
      </div>
    </div>
  );
}
