"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent as RPointerEvent, ReactNode } from "react";
import { ALL_ITEMS, R1, R2, simulate, type ItemId, type Wire } from "./circuit";

type Pos = { x: number; y: number };
type Items = Partial<Record<ItemId, Pos>>;
type Qator = { u1?: number; i1?: number; u2?: number; i2?: number };
type Drag =
  | { kind: "item"; id: ItemId; pid: number; sx: number; sy: number; moved: number; ox: number; oy: number; fromToolbox: boolean }
  | { kind: "wire"; from: string; pid: number; sx: number; sy: number; moved: number };

const W = 960;
const H = 600;

const SLOT: Record<ItemId, Pos> = {
  src: { x: 150, y: 440 },
  sw: { x: 150, y: 150 },
  am: { x: 430, y: 140 },
  vm: { x: 700, y: 130 },
  l1: { x: 520, y: 390 },
  l2: { x: 800, y: 390 },
};

const OFF: Record<ItemId, Record<string, [number, number]>> = {
  src: { p: [-45, 55], n: [45, 55] },
  sw: { a: [-62, 0], b: [62, 0] },
  am: { a: [-30, 48], b: [30, 48] },
  vm: { a: [-30, 48], b: [30, 48] },
  l1: { a: [-34, 38], b: [34, 38] },
  l2: { a: [-34, 38], b: [34, 38] },
};

const NOMLAR: Record<ItemId, string> = {
  src: "Tok manbai",
  sw: "Kalit",
  am: "Ampermetr",
  vm: "Voltmetr",
  l1: "1-lampochka",
  l2: "2-lampochka",
};

const QADAMLAR = [
  {
    t: "Asboblarni stolga qo‘yib, zanjirni yig‘ing: tok manbai → kalit → ampermetr → 1-lampochka → 2-lampochka → tok manbaiga qaytish. Voltmetrni 1-lampochka uchlariga ulang.",
    h: "Asbobni yuqoridagi qatordan stolga sudrang. Klemmani bosib, boshqa klemmaga sudrab sim ulang.",
  },
  {
    t: "Tok manbaining murvatini 4 V holatiga qo‘ying.",
    h: "Tok manbaidagi «+» tugmasini bosib, kuchlanishni 4 V ga keltiring.",
  },
  {
    t: "Kalitni ulang. Ikkala lampochka ham yonadi. Ampermetr va voltmetr ko‘rsatishini jadvalga yozing.",
    h: "Kalit richagini bosib ulang, keyin «Jadvalga yozish» tugmasini bosing.",
  },
  {
    t: "Kalitni uzing. Voltmetr klemmalarini ikkinchi lampochkaning uchlariga ulang.",
    h: "Kalitni uzing. Voltmetr simlarini 2-lampochka klemmalariga o‘tkazing.",
  },
  {
    t: "Kalitni ulang. Bunda lampochkalar yonadi. Ko‘rsatishlarni jadvalga yozing.",
    h: "Kalitni ulang va «Jadvalga yozish» tugmasini bosing.",
  },
  {
    t: "Tok manbaining kuchlanishini 6 V holatiga qo‘yib, tajribani 3–5-bandlardagidek takrorlang.",
    h: "«+» bilan 6 V ga keltiring. Voltmetr 1-lampochkada, keyin 2-lampochkada ham yozing.",
  },
  {
    t: "Tajriba natijalarini tahlil qiling va xulosa chiqaring.",
    h: "Pastdagi maydonga xulosangizni yozing.",
  },
];

const col = (c: string): CSSProperties =>
  ({ "--c": `var(--${c})`, "--e": `var(--${c}-e)` }) as CSSProperties;

function termPos(items: Items, t: string): Pos {
  const [id, nm] = t.split(":");
  const it = items[id as ItemId]!;
  const off = OFF[id as ItemId][nm];
  return { x: it.x + off[0], y: it.y + off[1] };
}

const PLUS = "#e5231b";
const MINUS = "#2f5bff";

const POST: Record<string, string> = {
  "src:p": PLUS,
  "src:n": MINUS,
  "am:a": PLUS,
  "am:b": MINUS,
  "vm:a": PLUS,
  "vm:b": MINUS,
};

// Sim plyus (+) tomonda yoki minus (−) tomonda ekanini aniqlaydi
function polaritet(items: Items, wires: Wire[]): (t: string) => "p" | "n" | "x" {
  const parent = new Map<string, string>();
  const find = (x: string): string => {
    if (!parent.has(x)) parent.set(x, x);
    const p = parent.get(x)!;
    if (p === x) return x;
    const r = find(p);
    parent.set(x, r);
    return r;
  };
  const has = (t: string) => !!items[t.split(":")[0] as ItemId];
  wires.forEach((w) => {
    if (has(w.a) && has(w.b)) parent.set(find(w.a), find(w.b));
  });
  const adj = new Map<string, string[]>();
  const link = (a: string, b: string) => {
    adj.set(a, [...(adj.get(a) ?? []), b]);
    adj.set(b, [...(adj.get(b) ?? []), a]);
  };
  (["sw", "am", "l1", "l2"] as ItemId[]).forEach((id) => {
    if (items[id]) link(find(`${id}:a`), find(`${id}:b`));
  });
  const bfs = (start: string) => {
    const dist = new Map<string, number>([[start, 0]]);
    const q = [start];
    while (q.length) {
      const c = q.shift()!;
      (adj.get(c) ?? []).forEach((n) => {
        if (!dist.has(n)) {
          dist.set(n, dist.get(c)! + 1);
          q.push(n);
        }
      });
    }
    return dist;
  };
  const dp = bfs(find("src:p"));
  const dn = bfs(find("src:n"));
  return (t) => {
    const n = find(t);
    const a = dp.get(n);
    const b = dn.get(n);
    if (a === undefined && b === undefined) return "x";
    if (b === undefined) return "p";
    if (a === undefined) return "n";
    return a <= b ? "p" : "n";
  };
}

// Asboblar qatoridagi kichik rasmchalar
function Ikon({ id }: { id: ItemId }) {
  const svg = (children: ReactNode) => (
    <svg viewBox="0 0 56 48" width={56} height={48} aria-hidden="true" style={{ flex: "none" }}>
      {children}
    </svg>
  );
  if (id === "src")
    return svg(
      <>
        <rect x={4} y={10} width={48} height={32} rx={7} fill="#1a39c4" />
        <rect x={4} y={6} width={48} height={32} rx={7} fill="#2f5bff" />
        <rect x={9} y={11} width={20} height={11} rx={3} fill="#10241f" />
        <rect x={32} y={11} width={8} height={11} rx={3} fill="#fff" />
        <rect x={42} y={11} width={8} height={11} rx={3} fill="#ffd166" />
        <circle cx={16} cy={32} r={4.5} fill="#e5231b" stroke="#1f2a44" strokeWidth={1.5} />
        <circle cx={40} cy={32} r={4.5} fill="#2f5bff" stroke="#fff" strokeWidth={1.5} />
      </>
    );
  if (id === "sw")
    return svg(
      <>
        <rect x={4} y={28} width={48} height={12} rx={4} fill="#8a5a2b" />
        <rect x={4} y={25} width={48} height={12} rx={4} fill="#d9a066" />
        <circle cx={13} cy={31} r={4} fill="#b87333" />
        <rect x={42} y={27} width={8} height={8} rx={2} fill="#b87333" />
        <line x1={13} y1={31} x2={38} y2={12} stroke="#c0c6d4" strokeWidth={4} strokeLinecap="round" />
        <circle cx={38} cy={12} r={4.5} fill="#e5607c" stroke="#1f2a44" strokeWidth={1.5} />
      </>
    );
  if (id === "am" || id === "vm") {
    const a = id === "am";
    return svg(
      <>
        <rect x={9} y={8} width={38} height={36} rx={8} fill={a ? "#d9506b" : "#6a4bd0"} />
        <rect x={9} y={4} width={38} height={36} rx={8} fill={a ? "#ff8fa3" : "#a78bfa"} />
        <rect x={14} y={9} width={28} height={19} rx={4} fill="#fffdf5" stroke="#1f2a44" strokeWidth={1.2} />
        <path d="M18 24 A11 11 0 0 1 38 24" fill="none" stroke="#1f2a44" strokeWidth={1.2} />
        <line x1={28} y1={25} x2={34} y2={15} stroke="#e5231b" strokeWidth={2} strokeLinecap="round" />
        <circle cx={28} cy={25} r={2.2} fill="#1f2a44" />
        <text x={28} y={20} textAnchor="middle" fontSize={9} fontWeight={800} fill={a ? "#d9506b" : "#6a4bd0"} opacity={0.7}>
          {a ? "A" : "V"}
        </text>
        <rect x={16} y={31} width={24} height={6} rx={2} fill="#10241f" />
        <circle cx={19} cy={42} r={3.2} fill="#e5231b" stroke="#1f2a44" strokeWidth={1} />
        <circle cx={37} cy={42} r={3.2} fill="#2f5bff" stroke="#1f2a44" strokeWidth={1} />
      </>
    );
  }
  return svg(
    <>
      <circle cx={28} cy={20} r={14} fill="#ffe27a" stroke="#e0a21f" strokeWidth={2} />
      <path d="M22 32 L22 22 Q25 14 28 22 Q31 14 34 22 L34 32" fill="none" stroke="#ff7a00" strokeWidth={1.8} strokeLinecap="round" />
      <rect x={18} y={34} width={20} height={9} rx={3} fill="#6b7280" />
      <path d="M18 37 H38 M18 40 H38" stroke="#374151" strokeWidth={1} />
    </>
  );
}

export default function CircuitLab() {
  const [items, setItems] = useState<Items>({});
  const [wires, setWires] = useState<Wire[]>([]);
  const [manba, setManba] = useState(0);
  const [kalit, setKalit] = useState(false);
  const [bosildi4, setBosildi4] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [wd, setWd] = useState<{ from: string; x: number; y: number } | null>(null);
  const [tablica, setTablica] = useState<Record<number, Qator>>({ 4: {}, 6: {} });
  const [xulosa, setXulosa] = useState("");
  const [xabar, setXabar] = useState("");
  const [s1, setS1] = useState(false);
  const [s4, setS4] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const itemsRef = useRef<Items>(items);
  const dragRef = useRef<Drag | null>(null);
  const nextWire = useRef(1);

  useEffect(() => {
    itemsRef.current = items;
  });

  const toSvg = (cx: number, cy: number): Pos => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: ((cx - r.left) * W) / r.width, y: ((cy - r.top) * H) / r.height };
  };

  function connect(a: string, b: string) {
    const id = nextWire.current++;
    setWires((prev) =>
      prev.some((w) => (w.a === a && w.b === b) || (w.a === b && w.b === a))
        ? prev
        : [...prev, { id, a, b }]
    );
  }

  useEffect(() => {
    const nearTerm = (p: Pos, ex: string): string | null => {
      let best: string | null = null;
      let bd = 28;
      const its = itemsRef.current;
      (Object.keys(its) as ItemId[]).forEach((id) => {
        Object.keys(OFF[id]).forEach((nm) => {
          const t = `${id}:${nm}`;
          if (t === ex) return;
          const q = termPos(its, t);
          const dd = Math.hypot(q.x - p.x, q.y - p.y);
          if (dd < bd) {
            bd = dd;
            best = t;
          }
        });
      });
      return best;
    };

    const move = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pid || !svgRef.current) return;
      const p = toSvg(e.clientX, e.clientY);
      d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.sx, e.clientY - d.sy));
      if (d.kind === "item") {
        const id = d.id;
        const nx = p.x - d.ox;
        const ny = p.y - d.oy;
        setItems((prev) => ({ ...prev, [id]: { x: nx, y: ny } }));
      } else {
        setWd({ from: d.from, x: p.x, y: p.y });
      }
    };

    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pid || !svgRef.current) return;
      dragRef.current = null;
      const p = toSvg(e.clientX, e.clientY);

      if (d.kind === "item") {
        const id = d.id;
        if (d.fromToolbox && d.moved < 6) {
          setItems((prev) => ({ ...prev, [id]: SLOT[id] }));
          return;
        }
        const nx = p.x - d.ox;
        const ny = p.y - d.oy;
        if (nx < 0 || nx > W || ny < 0 || ny > H) {
          setItems((prev) => {
            const n = { ...prev };
            delete n[id];
            return n;
          });
          setWires((prev) => prev.filter((w) => !w.a.startsWith(id + ":") && !w.b.startsWith(id + ":")));
          setSel(null);
        } else {
          setItems((prev) => ({
            ...prev,
            [id]: { x: Math.max(60, Math.min(W - 60, nx)), y: Math.max(70, Math.min(H - 75, ny)) },
          }));
        }
      } else {
        setWd(null);
        const target = nearTerm(p, d.from);
        if (target) {
          connect(d.from, target);
          setSel(null);
        } else if (d.moved < 5) {
          const from = d.from;
          setSel((prev) => (prev === from ? null : from));
        }
      }
    };

    const cancel = (e: PointerEvent) => {
      const d = dragRef.current;
      if (d && e.pointerId === d.pid) {
        dragRef.current = null;
        setWd(null);
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toolDown(e: RPointerEvent, id: ItemId) {
    if (items[id]) return;
    e.preventDefault();
    const p = toSvg(e.clientX, e.clientY);
    dragRef.current = {
      kind: "item",
      id,
      pid: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      moved: 0,
      ox: 0,
      oy: 0,
      fromToolbox: true,
    };
    setItems((prev) => ({ ...prev, [id]: { x: p.x, y: p.y } }));
  }

  function toolKey(e: KeyboardEvent, id: ItemId) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!items[id]) setItems((prev) => ({ ...prev, [id]: SLOT[id] }));
    }
  }

  function itemDown(e: RPointerEvent, id: ItemId) {
    const it = items[id];
    if (!it) return;
    const p = toSvg(e.clientX, e.clientY);
    dragRef.current = {
      kind: "item",
      id,
      pid: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      moved: 0,
      ox: p.x - it.x,
      oy: p.y - it.y,
      fromToolbox: false,
    };
  }

  function termDown(e: RPointerEvent, t: string) {
    e.stopPropagation();
    if (sel && sel !== t) {
      connect(sel, t);
      setSel(null);
      return;
    }
    dragRef.current = { kind: "wire", from: t, pid: e.pointerId, sx: e.clientX, sy: e.clientY, moved: 0 };
  }

  function wireDel(id: number) {
    setWires((prev) => prev.filter((w) => w.id !== id));
  }

  function voltTanla(v: number) {
    setManba(v);
    if (v === 4) setBosildi4(true);
    setXabar(`Tok manbai ${v} V ga qo‘yildi.`);
  }

  function voltDel(d: number) {
    voltTanla(Math.max(0, Math.min(10, manba + d)));
  }

  function kalitBos() {
    setKalit(!kalit);
    setXabar(kalit ? "Kalit uzildi." : "Kalit ulandi.");
  }

  function namuna() {
    setItems({ ...SLOT });
    const pairs: [string, string][] = [
      ["src:p", "sw:a"],
      ["sw:b", "am:a"],
      ["am:b", "l1:a"],
      ["l1:b", "l2:a"],
      ["l2:b", "src:n"],
      ["vm:a", "l1:a"],
      ["vm:b", "l1:b"],
    ];
    setWires(pairs.map(([a, b]) => ({ id: nextWire.current++, a, b })));
    setSel(null);
    setXabar("Namuna zanjir yig‘ildi. Endi o‘zingiz sinab ko‘ring.");
  }

  function boshidan() {
    setItems({});
    setWires([]);
    setManba(0);
    setKalit(false);
    setBosildi4(false);
    setS1(false);
    setS4(false);
    setSel(null);
    setTablica({ 4: {}, 6: {} });
    setXabar("Tajriba boshidan boshlandi.");
  }

  const placed = useMemo(() => ALL_ITEMS.filter((i) => items[i]), [items]);
  const hammasi = placed.length === ALL_ITEMS.length;
  const sim = useMemo(
    () => simulate({ placed, wires, manba, kalit }),
    [placed, wires, manba, kalit]
  );
  const pol = useMemo(() => polaritet(items, wires), [items, wires]);
  const chk = useMemo(
    () => simulate({ placed, wires, manba: 4, kalit: true }),
    [placed, wires]
  );
  const good =
    hammasi &&
    !chk.qisqa &&
    !chk.amParallel &&
    chk.tokS >= 0 &&
    chk.uS >= 0 &&
    Math.abs(chk.tok - 0.2) < 0.015 &&
    Math.abs(chk.i1 - chk.tok) < 0.015 &&
    Math.abs(chk.i2 - chk.tok) < 0.015;

  useEffect(() => {
    if (good && chk.vmLamp === 1) setS1(true);
    if (good && chk.vmLamp === 2 && tablica[4].u1 !== undefined) setS4(true);
  }, [good, chk.vmLamp, tablica]);

  function yozish() {
    if (!hammasi) {
      setXabar("Avval hamma asboblarni stolga qo‘ying va zanjirni yig‘ing.");
      return;
    }
    if (manba === 0) {
      setXabar("Tok manbaining «+» tugmasi bilan kuchlanishni qo‘ying (1–10 V; jadval uchun 4 V va 6 V).");
      return;
    }
    if (!kalit) {
      setXabar("Avval kalitni ulang.");
      return;
    }
    if (sim.tokS < 0 || sim.uS < 0) {
      setXabar("Asbob teskari ulangan! Qizil (+) klemma tok manbaining plyus tomoniga qarab ulanishi kerak.");
      return;
    }
    if (sim.qisqa || sim.tok === 0) {
      setXabar("Zanjirda tok yo‘q. Ulanishlarni tekshiring.");
      return;
    }
    if (sim.vmLamp === 0) {
      setXabar("Voltmetr lampochka uchlariga ulanmagan. Uni 1- yoki 2-lampochka klemmalariga ulang.");
      return;
    }
    const lamp = sim.vmLamp;
    const u = sim.u;
    const i = sim.tok;
    if (manba !== 4 && manba !== 6) {
      setXabar(`Ko‘rsatishlar: ${u.toFixed(2)} V va ${i.toFixed(2)} A. Jadvalga faqat 4 V va 6 V qiymatlari yoziladi.`);
      return;
    }
    setTablica((t) => ({
      ...t,
      [manba]: lamp === 1 ? { ...t[manba], u1: u, i1: i } : { ...t[manba], u2: u, i2: i },
    }));
    setXabar(`Jadvalga yozildi: ${lamp}-lampochka, ${manba} V.`);
  }

  const done = [
    s1,
    bosildi4,
    tablica[4].u1 !== undefined,
    s4,
    tablica[4].u2 !== undefined,
    tablica[6].u1 !== undefined && tablica[6].u2 !== undefined,
    xulosa.trim().length >= 10,
  ];
  const joriy = done.findIndex((d) => !d);
  const tugadi = joriy === -1;

  let maslahat = "";
  if (sim.qisqa) {
    maslahat =
      "Qisqa tutashuv! Tok manbaining ikkala qutbi to‘g‘ridan-to‘g‘ri ulangan. Asbobni zanjirga ketma-ket ulang.";
  } else if (sim.amParallel) {
    maslahat =
      "Ampermetr lampochkaga parallel ulangan, lampochka o‘chib qoldi. Ampermetr zanjirga ketma-ket ulanadi!";
  } else if (sim.tokS < 0 || sim.uS < 0) {
    maslahat = `${sim.tokS < 0 ? "Ampermetr" : "Voltmetr"} teskari ulangan: strelka teskari burildi. Qizil (+) klemma tok manbaining plyus tomoniga, ko‘k (−) klemma minus tomoniga qarab ulansin.`;
  } else if (hammasi && kalit && manba > 0 && wires.length > 0 && sim.tok === 0) {
    maslahat =
      "Zanjirda tok yo‘q. Zanjir yopiq ekanini va voltmetr ketma-ket ulanmaganini tekshiring.";
  }

  const f = (n?: number) => (n === undefined ? "" : n.toFixed(2));
  const th: CSSProperties = { border: "2px solid #dbe7f5", padding: "10px 8px" };

  const ammText = sim.qisqa ? "!!!" : `${sim.tok.toFixed(2)} A`;
  const vmText = sim.qisqa ? "!!!" : `${sim.u.toFixed(2)} V`;

  const stop = (e: RPointerEvent) => e.stopPropagation();

  const terminals: { t: string }[] = [];
  (Object.keys(items) as ItemId[]).forEach((id) => {
    Object.keys(OFF[id]).forEach((nm) => terminals.push({ t: `${id}:${nm}` }));
  });

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
      {/* Topshiriqlar */}
      <section
        className="rounded-[32px] bg-white p-6 sm:p-8"
        style={{ boxShadow: "0 10px 0 #c9deee" }}
      >
        <div className="mb-5 flex items-center gap-4">
          <span
            className="h-5 w-5 flex-none rounded-full"
            style={{ background: "var(--orange)", boxShadow: "0 3px 0 var(--orange-e)" }}
          />
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>Topshiriqlar</h2>
        </div>
        <ol className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {QADAMLAR.map((q, i) => {
            const bajarildi = done[i];
            const hozir = i === joriy;
            return (
              <li
                key={i}
                className="flex gap-3 rounded-2xl p-3 leading-6"
                style={{
                  background: bajarildi ? "#e3f8ee" : hozir ? "#fff4d6" : "#f4f8fd",
                  outline: hozir ? "3px solid var(--orange)" : "none",
                }}
              >
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 flex-none place-items-center rounded-full"
                  style={{
                    background: bajarildi ? "var(--mint)" : hozir ? "var(--orange)" : "#dbe7f5",
                    font: "700 17px/1 var(--display)",
                  }}
                >
                  {bajarildi ? "✓" : i + 1}
                </span>
                <span>
                  <span className="sr-only">
                    {bajarildi ? "Bajarildi. " : hozir ? "Hozirgi qadam. " : ""}
                  </span>
                  {q.t}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Laboratoriya stoli */}
      <section
        className="min-w-0 rounded-[32px] bg-white p-4 sm:p-6"
        style={{ boxShadow: "0 10px 0 #c9deee" }}
      >
        <div
          className="mb-4 rounded-2xl p-4 font-extrabold"
          style={{ background: tugadi ? "var(--mint)" : "#fff4d6" }}
          role="status"
          aria-live="polite"
        >
          {tugadi
            ? "Barakalla! Hamma topshiriq bajarildi."
            : `${joriy + 1}-qadam: ${QADAMLAR[joriy].h}`}
        </div>

        {/* Asboblar qatori */}
        <div className="mb-3 flex flex-wrap gap-2" aria-label="Asboblar">
          {ALL_ITEMS.map((id) => {
            const bor = !!items[id];
            return (
              <button
                key={id}
                type="button"
                aria-disabled={bor}
                onPointerDown={(e) => toolDown(e, id)}
                onKeyDown={(e) => toolKey(e, id)}
                className="flex items-center gap-2 rounded-2xl py-1 pl-2 pr-4 font-extrabold"
                style={{
                  background: bor ? "#e8eef6" : "#fff",
                  border: "3px solid #dbe7f5",
                  boxShadow: bor ? "none" : "0 4px 0 #c9deee",
                  opacity: bor ? 0.55 : 1,
                  cursor: bor ? "default" : "grab",
                  touchAction: "none",
                  color: "var(--ink)",
                }}
              >
                <Ikon id={id} />
                {NOMLAR[id]}
                {bor && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="group"
          aria-label="Laboratoriya stoli"
          style={{
            display: "block",
            touchAction: "none",
            userSelect: "none",
            borderRadius: 28,
            background: "#fff6e3",
            border: "4px solid #f0d9a8",
          }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#f0dfb8" strokeWidth="1.5" />
            </pattern>
            <radialGradient id="bulbOff" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9e4f2" />
            </radialGradient>
            <radialGradient id="bulbOn" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#fffbe0" />
              <stop offset="0.5" stopColor="#ffd84d" />
              <stop offset="1" stopColor="#ff9f1c" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#grid)" />

          {!placed.length && (
            <text x={W / 2} y={H / 2} textAnchor="middle" fill="#b59a62" fontSize="28" fontWeight="800">
              Asboblarni yuqoridan shu yerga sudrang
            </text>
          )}

          {/* Asboblar */}
          {ALL_ITEMS.map((id) => {
            const it = items[id];
            if (!it) return null;
            const g = {
              transform: `translate(${it.x},${it.y})`,
              onPointerDown: (e: RPointerEvent) => itemDown(e, id),
              style: { cursor: "grab" } as CSSProperties,
            };

            if (id === "src") {
              return (
                <g key={id} {...g}>
                  <rect x={-85} y={-47} width={170} height={110} rx={18} fill="#1a39c4" />
                  <rect x={-85} y={-55} width={170} height={110} rx={18} fill="#2f5bff" />
                  <rect x={-38} y={-44} width={76} height={34} rx={8} fill="#10241f" />
                  <text x={0} y={-20} textAnchor="middle" fill="#7cfc9b" fontSize="20" fontWeight="800" fontFamily="monospace">
                    {manba} V
                  </text>
                  {[-1, 1].map((d) => (
                    <g
                      key={d}
                      role="button"
                      tabIndex={0}
                      aria-label={d > 0 ? "Kuchlanishni oshirish" : "Kuchlanishni kamaytirish"}
                      onPointerDown={stop}
                      onClick={() => voltDel(d)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") voltDel(d);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <circle cx={d * 60} cy={-27} r={17} fill="#ffd166" stroke="#e0a21f" strokeWidth={3} />
                      <text x={d * 60} y={-19} textAnchor="middle" fontSize="26" fontWeight="800" fill="#1f2a44">
                        {d > 0 ? "+" : "−"}
                      </text>
                    </g>
                  ))}
                  <text x={0} y={22} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">
                    TOK MANBAI
                  </text>
                  <text x={-45} y={44} textAnchor="middle" fill="#ffd9df" fontSize="20" fontWeight="800">
                    +
                  </text>
                  <text x={45} y={44} textAnchor="middle" fill="#d9e2ff" fontSize="22" fontWeight="800">
                    −
                  </text>
                </g>
              );
            }

            if (id === "sw") {
              const x2 = kalit ? 62 : 38;
              const y2 = kalit ? 0 : -42;
              return (
                <g key={id} {...g}>
                  <rect x={-78} y={-8} width={156} height={34} rx={8} fill="#8a5a2b" />
                  <rect x={-78} y={-16} width={156} height={34} rx={8} fill="#d9a066" />
                  <circle cx={-62} cy={0} r={9} fill="#b87333" stroke="#7a4a1e" strokeWidth={2} />
                  <rect x={50} y={-10} width={24} height={20} rx={4} fill="#b87333" stroke="#7a4a1e" strokeWidth={2} />
                  <line x1={-62} y1={0} x2={x2} y2={y2} stroke="#c0c6d4" strokeWidth={9} strokeLinecap="round" />
                  <line x1={-62} y1={-2} x2={x2} y2={y2 - 2} stroke="#eef1f7" strokeWidth={3} strokeLinecap="round" />
                  <circle cx={x2} cy={y2} r={10} fill={kalit ? "#2fb07a" : "#e5607c"} stroke="#1f2a44" strokeWidth={2} />
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label={kalit ? "Kalitni uzish" : "Kalitni ulash"}
                    onPointerDown={stop}
                    onClick={kalitBos}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") kalitBos();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <line x1={-62} y1={0} x2={x2} y2={y2} stroke="transparent" strokeWidth={34} strokeLinecap="round" />
                  </g>
                  <text x={0} y={42} textAnchor="middle" fill="#1f2a44" fontSize="16" fontWeight="800" stroke="#fff6e3" strokeWidth={5} paintOrder="stroke" strokeLinejoin="round">
                    Kalit (K) · {kalit ? "ulangan" : "uzilgan"}
                  </text>
                </g>
              );
            }

            if (id === "am" || id === "vm") {
              const isA = id === "am";
              const max = isA ? 0.6 : 10;
              const sv = isA ? sim.tokS : sim.uS;
              const rev = !sim.qisqa && sv < 0;
              const val = sim.qisqa ? max : sv;
              const ang = -55 + 110 * Math.max(-0.12, Math.min(1, val / max));
              const rad = (a: number) => ((a - 90) * Math.PI) / 180;
              const px = (a: number, r: number) => (r * Math.cos(rad(a))).toFixed(1);
              const py = (a: number, r: number) => (4 + r * Math.sin(rad(a))).toFixed(1);
              const body = isA ? "#ff8fa3" : "#a78bfa";
              const shade = isA ? "#d9506b" : "#6a4bd0";
              return (
                <g key={id} {...g}>
                  <rect x={-58} y={-42} width={116} height={102} rx={18} fill={shade} />
                  <rect x={-58} y={-50} width={116} height={102} rx={18} fill={body} />
                  <rect x={-47} y={-42} width={94} height={62} rx={10} fill="#fffdf5" stroke="#1f2a44" strokeWidth={2} />
                  <path
                    d={`M${px(-55, 40)} ${py(-55, 40)} A40 40 0 0 1 ${px(55, 40)} ${py(55, 40)}`}
                    fill="none"
                    stroke="#1f2a44"
                    strokeWidth={2}
                  />
                  {[0, 1, 2, 3, 4, 5, 6].map((k) => {
                    const a = -55 + (110 * k) / 6;
                    return (
                      <line
                        key={k}
                        x1={px(a, 40)}
                        y1={py(a, 40)}
                        x2={px(a, k % 2 === 0 ? 32 : 35)}
                        y2={py(a, k % 2 === 0 ? 32 : 35)}
                        stroke="#1f2a44"
                        strokeWidth={k % 2 === 0 ? 2.5 : 1.5}
                      />
                    );
                  })}
                  <text x={-34} y={-6} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1f2a44">0</text>
                  <text x={34} y={-6} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1f2a44">{max}</text>
                  <text x={0} y={-12} textAnchor="middle" fontSize="22" fontWeight="800" fill={shade} opacity={0.55}>
                    {isA ? "A" : "V"}
                  </text>
                  <line
                    x1={0}
                    y1={4}
                    x2={px(ang, 36)}
                    y2={py(ang, 36)}
                    stroke="#e5231b"
                    strokeWidth={3}
                    strokeLinecap="round"
                    style={{ transition: "all .5s ease-out" }}
                  />
                  <circle cx={0} cy={4} r={5} fill="#1f2a44" />
                  <rect x={-40} y={22} width={80} height={20} rx={6} fill="#10241f" />
                  <text x={0} y={37} textAnchor="middle" fill="#7cfc9b" fontSize="14" fontWeight="800" fontFamily="monospace">
                    {rev ? "TESKARI" : isA ? ammText : vmText}
                  </text>
                  <text x={-30} y={56} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">+</text>
                  <text x={30} y={56} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">−</text>
                </g>
              );
            }

            const lamp1 = id === "l1";
            const yor = lamp1 ? (sim.qisqa ? 0 : sim.yorug1) : sim.qisqa ? 0 : sim.yorug2;
            return (
              <g key={id} {...g}>
                {yor > 0 && <circle cx={0} cy={-22} r={62} fill="#ffd166" opacity={0.45 * yor} />}
                <rect x={-44} y={20} width={88} height={26} rx={8} fill="#4b5563" />
                <rect x={-44} y={16} width={88} height={26} rx={8} fill="#6b7280" />
                <rect x={-12} y={2} width={24} height={16} fill="#9ca3af" />
                <path d="M-44 26 H44 M-44 32 H44 M-44 38 H44" stroke="#374151" strokeWidth={1.5} />
                <circle cx={0} cy={-22} r={34} fill="url(#bulbOff)" stroke="#aab7c8" strokeWidth={3} />
                <circle cx={0} cy={-22} r={34} fill="url(#bulbOn)" opacity={yor} />
                <path
                  d="M-12 2 L-12 -12 Q-6 -26 0 -12 Q6 -26 12 -12 L12 2"
                  fill="none"
                  stroke={yor > 0 ? "#ff7a00" : "#6b7280"}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <text x={0} y={68} textAnchor="middle" fill="#1f2a44" fontSize="17" fontWeight="800" stroke="#fff6e3" strokeWidth={5} paintOrder="stroke" strokeLinejoin="round">
                  {lamp1 ? "L₁ (1-lampochka)" : "L₂ (2-lampochka)"}
                </text>
              </g>
            );
          })}

          {/* Simlar */}
          {wires.map((w) => {
            if (!items[w.a.split(":")[0] as ItemId] || !items[w.b.split(":")[0] as ItemId]) return null;
            const a = termPos(items, w.a);
            const b = termPos(items, w.b);
            const d = `M${a.x} ${a.y} C${a.x} ${a.y + 70} ${b.x} ${b.y + 70} ${b.x} ${b.y}`;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 + 52;
            return (
              <g key={w.id}>
                <path d={d} fill="none" stroke="rgba(31,42,68,.25)" strokeWidth={10} strokeLinecap="round" pointerEvents="none" />
                <path
                  d={d}
                  fill="none"
                  stroke={pol(w.a) === "p" ? PLUS : pol(w.a) === "n" ? MINUS : "#6b7280"}
                  strokeWidth={6}
                  strokeLinecap="round"
                  pointerEvents="none"
                />
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Simni o‘chirish"
                  onPointerDown={stop}
                  onClick={() => wireDel(w.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") wireDel(w.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={mx} cy={my} r={13} fill="#fff" stroke="#1f2a44" strokeWidth={2} />
                  <path d={`M${mx - 5} ${my - 5} L${mx + 5} ${my + 5} M${mx + 5} ${my - 5} L${mx - 5} ${my + 5}`} stroke="#1f2a44" strokeWidth={2.5} strokeLinecap="round" />
                </g>
              </g>
            );
          })}

          {/* Klemmalar */}
          {terminals.map(({ t }) => {
            const p = termPos(items, t);
            return (
              <g key={t} onPointerDown={(e) => termDown(e, t)} style={{ cursor: "crosshair" }}>
                <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
                {sel === t && <circle cx={p.x} cy={p.y} r={17} fill="none" stroke="#2f5bff" strokeWidth={4} />}
                {POST[t] ? (
                  <>
                    <circle cx={p.x} cy={p.y} r={13} fill={POST[t]} stroke="#1f2a44" strokeWidth={2.5} />
                    <circle cx={p.x} cy={p.y} r={6} fill="#f3f4f6" stroke="#1f2a44" strokeWidth={1.5} />
                  </>
                ) : (
                  <circle cx={p.x} cy={p.y} r={10} fill="#ffc83d" stroke="#8a6a00" strokeWidth={3} />
                )}
              </g>
            );
          })}

          {/* Sim tortilayotganda */}
          {wd && items[wd.from.split(":")[0] as ItemId] && (
            <line
              x1={termPos(items, wd.from).x}
              y1={termPos(items, wd.from).y}
              x2={wd.x}
              y2={wd.y}
              stroke="#2f5bff"
              strokeWidth={5}
              strokeDasharray="10 8"
              strokeLinecap="round"
              pointerEvents="none"
            />
          )}
        </svg>

        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Qizil sim — plyus (+), ko‘k sim — minus (−). Asbobni sudrab joylashtiring. Klemmani bosib, boshqa klemmaga sudrang (yoki ketma-ket
          ikkalasini bosing) va sim ulang. Simni o‘chirish uchun o‘rtasidagi ✕ ni bosing. Asbobni
          stoldan tashqariga sudrasangiz, u olib tashlanadi.
        </p>

        {maslahat && (
          <p
            role="alert"
            className="mt-4 rounded-2xl p-4 font-extrabold"
            style={{ background: "var(--berry)" }}
          >
            {maslahat}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn orange" onClick={yozish}>
            Jadvalga yozish
          </button>
          <button type="button" className="btn sm" style={col("sun")} onClick={namuna}>
            Yordam: namuna zanjir
          </button>
          <button type="button" className="btn sm" style={col("berry")} onClick={boshidan}>
            Boshidan boshlash
          </button>
        </div>

        <p className="mt-4 min-h-6 font-extrabold" role="status" aria-live="polite">
          {xabar}
        </p>
      </section>

      {/* Jadval */}
      <section
        className="rounded-[32px] bg-white p-6 sm:p-8 lg:col-span-2"
        style={{ boxShadow: "0 10px 0 #c9deee" }}
      >
        <div className="mb-5 flex items-center gap-4">
          <span
            className="h-5 w-5 flex-none rounded-full"
            style={{ background: "var(--sky2)", boxShadow: "0 3px 0 var(--sky2-e)" }}
          />
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>Natijalar jadvali</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr style={{ background: "var(--orange)" }}>
                <th style={th} rowSpan={2}>
                  Murvat holatlari
                </th>
                <th style={th} colSpan={2}>
                  1-lampochka
                </th>
                <th style={th} colSpan={2}>
                  2-lampochka
                </th>
              </tr>
              <tr style={{ background: "var(--sun)" }}>
                <th style={th}>U₁ (V)</th>
                <th style={th}>I₁ (A)</th>
                <th style={th}>U₂ (V)</th>
                <th style={th}>I₂ (A)</th>
              </tr>
            </thead>
            <tbody>
              {[4, 6].map((v, i) => (
                <tr key={v}>
                  <td style={th}>
                    {i + 1} ({v} V)
                  </td>
                  <td style={th}>{f(tablica[v].u1)}</td>
                  <td style={th}>{f(tablica[v].i1)}</td>
                  <td style={th}>{f(tablica[v].u2)}</td>
                  <td style={th}>{f(tablica[v].i2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Virtual modelda lampochkalar qarshiligi doimiy deb olingan (R₁ = {R1} Ω, R₂ = {R2} Ω).
        </p>

        <h3 className="mb-3 mt-7 text-2xl">Tajriba xulosasi</h3>
        <label htmlFor="xulosa" className="sr-only">
          Tajriba xulosasi
        </label>
        <textarea
          id="xulosa"
          value={xulosa}
          onChange={(e) => setXulosa(e.target.value)}
          placeholder="Tajriba natijasida nimalarni o‘rgandingiz? Xulosangizni yozing..."
          rows={4}
          className="w-full p-4"
          style={{
            border: "3px solid #dbe7f5",
            borderRadius: 18,
            background: "#f7fbff",
            color: "var(--ink)",
            font: "700 17px/1.5 var(--text)",
          }}
        />
      </section>
    </div>
  );
}
