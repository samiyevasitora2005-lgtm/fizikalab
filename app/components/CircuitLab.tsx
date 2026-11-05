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
