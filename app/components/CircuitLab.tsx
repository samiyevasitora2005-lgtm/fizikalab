// Elektr zanjirni hisoblash (soddalashtirilgan, o'quv modeli).
// Tok manbai, kalit, ampermetr, voltmetr va ikkita lampochkadan iborat
// ixtiyoriy ulanishni (tugun potensiallari usulida) hisoblaydi.

export type ItemId = "src" | "sw" | "am" | "vm" | "l1" | "l2";
export type Wire = { id: number; a: string; b: string };

export const R1 = 8; // 1-lampochka qarshiligi (Ω)
export const R2 = 12; // 2-lampochka qarshiligi (Ω)
const RA = 0.02; // ampermetr qarshiligi (juda kichik)
const RV = 1e6; // voltmetr qarshiligi (juda katta)
const RSW = 0.001; // ulangan kalit qarshiligi

export const ALL_ITEMS: ItemId[] = ["src", "sw", "am", "vm", "l1", "l2"];

export type SimIn = {
  placed: ItemId[];
  wires: Wire[];
  manba: number;
  kalit: boolean;
};

export type SimOut = {
  tok: number; // ampermetr ko'rsatishi (A)
  u: number; // voltmetr ko'rsatishi (V)
  tokS: number; // ampermetr: a→b yo'nalishda ishorali tok (manfiy = teskari ulangan)
  uS: number; // voltmetr: ishorali kuchlanish (manfiy = teskari ulangan)
  i1: number;
  i2: number;
  yorug1: number; // 0..1
  yorug2: number; // 0..1
  qisqa: boolean; // qisqa tutashuv
  amParallel: boolean; // ampermetr lampochkaga parallel ulangan
  vmLamp: 0 | 1 | 2; // voltmetr qaysi lampochka uchlariga ulangan
};

const ZERO: SimOut = {
  tok: 0,
  u: 0,
  tokS: 0,
  uS: 0,
  i1: 0,
  i2: 0,
  yorug1: 0,
  yorug2: 0,
  qisqa: false,
  amParallel: false,
  vmLamp: 0,
};

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-15) continue;
    [A[c], A[p]] = [A[p], A[c]];
    [b[c], b[p]] = [b[p], b[c]];
    for (let r = c + 1; r < n; r++) {
      const f = A[r][c] / A[c][c];
      if (f === 0) continue;
      for (let k = c; k < n; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = b[r];
    for (let k = r + 1; k < n; k++) s -= A[r][k] * x[k];
    x[r] = Math.abs(A[r][r]) < 1e-15 ? 0 : s / A[r][r];
  }
  return x;
}

const clean = (x: number, eps = 1e-3) => (Math.abs(x) < eps ? 0 : Math.abs(x));

export function simulate(inp: SimIn): SimOut {
  const placed = new Set<ItemId>(inp.placed);
  if (!placed.has("src")) return { ...ZERO };

  const parent = new Map<string, string>();
  const find = (x: string): string => {
    if (!parent.has(x)) parent.set(x, x);
    const p = parent.get(x)!;
    if (p === x) return x;
    const r = find(p);
    parent.set(x, r);
    return r;
  };
  const ok = (t: string) => placed.has(t.split(":")[0] as ItemId);
  inp.wires.forEach((w) => {
    if (ok(w.a) && ok(w.b)) parent.set(find(w.a), find(w.b));
  });

  const gnd = find("src:n");
  const pos = find("src:p");

  const els: { a: string; b: string; r: number }[] = [];
  const add = (id: ItemId, r: number) => {
    if (placed.has(id)) els.push({ a: find(`${id}:a`), b: find(`${id}:b`), r });
  };
  if (inp.kalit) add("sw", RSW);
  add("am", RA);
  add("vm", RV);
  add("l1", R1);
  add("l2", R2);

  const nodes = new Set<string>([pos, gnd]);
  els.forEach((e) => {
    nodes.add(e.a);
    nodes.add(e.b);
  });
  nodes.delete(gnd);

  const idx = new Map<string, number>();
  Array.from(nodes).forEach((n, i) => idx.set(n, i));
  const V = (node: string, x: number[]) => (node === gnd ? 0 : x[idx.get(node) ?? -1] ?? 0);

  // Qisqa tutashuv: tok manbaining ikkala qutbi bir simga ulangan
  if (pos === gnd && inp.manba > 0) return { ...ZERO, qisqa: true };

  const m = nodes.size + 1;
  const A: number[][] = Array.from({ length: m }, () => new Array(m).fill(0));
  const b = new Array(m).fill(0);

  const stamp = (na: string, nb: string, g: number) => {
    const ia = na === gnd ? -1 : idx.get(na)!;
    const ib = nb === gnd ? -1 : idx.get(nb)!;
    if (ia >= 0) A[ia][ia] += g;
    if (ib >= 0) A[ib][ib] += g;
    if (ia >= 0 && ib >= 0) {
      A[ia][ib] -= g;
      A[ib][ia] -= g;
    }
  };
  els.forEach((e) => stamp(e.a, e.b, 1 / e.r));
  nodes.forEach((n) => {
    A[idx.get(n)!][idx.get(n)!] += 1e-9; // suzuvchi tugunlar uchun
  });

  const k = m - 1;
  if (pos !== gnd) {
    const ip = idx.get(pos)!;
    A[ip][k] += 1;
    A[k][ip] += 1;
    b[k] = inp.manba;
  } else {
    A[k][k] = 1;
  }

  const x = solve(A, b);
  const isrc = Math.abs(x[k]);
  if (isrc > 2) return { ...ZERO, qisqa: true };

  const volt = (id: ItemId) =>
    placed.has(id) ? Math.abs(V(find(`${id}:a`), x) - V(find(`${id}:b`), x)) : 0;

  const sgn = (x: number) => (Math.abs(x) < 1e-3 ? 0 : x);
  const vs = (id: ItemId) =>
    placed.has(id) ? V(find(`${id}:a`), x) - V(find(`${id}:b`), x) : 0;
  const tokS = placed.has("am") ? sgn(vs("am") / RA) : 0;
  const uS = placed.has("vm") ? sgn(vs("vm")) : 0;
  const tok = placed.has("am") ? clean(volt("am") / RA) : 0;
  const u = placed.has("vm") ? clean(volt("vm")) : 0;
  const i1 = placed.has("l1") ? clean(volt("l1") / R1) : 0;
  const i2 = placed.has("l2") ? clean(volt("l2") / R2) : 0;

  const same = (x1: string, x2: string, y1: string, y2: string) =>
    (find(x1) === find(y1) && find(x2) === find(y2)) ||
    (find(x1) === find(y2) && find(x2) === find(y1));

  let vmLamp: 0 | 1 | 2 = 0;
  let amParallel = false;
  if (placed.has("vm")) {
    if (placed.has("l1") && same("vm:a", "vm:b", "l1:a", "l1:b")) vmLamp = 1;
    else if (placed.has("l2") && same("vm:a", "vm:b", "l2:a", "l2:b")) vmLamp = 2;
  }
  if (placed.has("am")) {
    if (
      (placed.has("l1") && same("am:a", "am:b", "l1:a", "l1:b")) ||
      (placed.has("l2") && same("am:a", "am:b", "l2:a", "l2:b"))
    )
      amParallel = true;
  }

  return {
    tok,
    u,
    tokS,
    uS,
    i1,
    i2,
    yorug1: Math.min(1, i1 / 0.3),
    yorug2: Math.min(1, i2 / 0.3),
    qisqa: false,
    amParallel,
    vmLamp,
  };
}
