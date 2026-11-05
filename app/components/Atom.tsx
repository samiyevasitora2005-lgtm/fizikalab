"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const FACTS = [
  "Salom! Meni bosib ko‘r!",
  "Men atomman! Yadro atrofida elektronlar aylanadi.",
  "Yorug‘lik 1 soniyada Yerni taxminan 7 marta aylanib chiqadi.",
  "Oyda sen Yerdagidan taxminan 6 marta yengil bo‘lasan!",
  "Chaqmoq tovushdan oldin ko‘rinadi: yorug‘lik tezroq yuradi.",
  "Suv 4 °C da eng zich bo‘ladi.",
  "Tezlikni v = s / t bilan topamiz. Sinab ko‘ramizmi?",
  "Ishqalanish bo‘lmasa, mashina to‘xtamay yurardi!",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Atom() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const kickRef = useRef(0);
  const stopRef = useRef<(() => void) | null>(null);
  const [failed, setFailed] = useState(false);
  const [fact, setFact] = useState(0);
  const [pop, setPop] = useState(0);

  function start() {
    if (stopRef.current) return;
    const T = (window as any).THREE;
    const cv = cvRef.current;
    const wrap = wrapRef.current;
    if (!T || !cv || !wrap) return;

    let renderer: any;
    try {
      renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    scene.add(new T.AmbientLight(0xffffff, 0.8));
    const dl = new T.DirectionalLight(0xffffff, 0.95);
    dl.position.set(3, 5, 7);
    scene.add(dl);
    const pl = new T.PointLight(0xffd9a0, 0.55);
    pl.position.set(-4, -2, 4);
    scene.add(pl);

    const mat = (c: number, r = 0.35) =>
      new T.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.05 });
    const ball = (r: number, c: number, x: number, y: number, z: number, rough = 0.35) => {
      const m = new T.Mesh(new T.SphereGeometry(r, 40, 40), mat(c, rough));
      m.position.set(x, y, z);
      return m;
    };

    const root = new T.Group();
    scene.add(root);
    const nucleus = new T.Group();
    nucleus.add(ball(1.1, 0xffd166, 0, 0, 0, 0.3));
    nucleus.add(ball(0.13, 0x1f2a44, -0.38, 0.2, 1.0, 0.4));
    nucleus.add(ball(0.13, 0x1f2a44, 0.38, 0.2, 1.0, 0.4));
    nucleus.add(ball(0.04, 0xffffff, -0.34, 0.25, 1.1, 0.2));
    nucleus.add(ball(0.04, 0xffffff, 0.42, 0.25, 1.1, 0.2));
    const cl = ball(0.17, 0xff9db0, -0.7, -0.12, 0.82, 0.6);
    cl.scale.set(1, 0.7, 0.5);
    nucleus.add(cl);
    const cr = ball(0.17, 0xff9db0, 0.7, -0.12, 0.82, 0.6);
    cr.scale.set(1, 0.7, 0.5);
    nucleus.add(cr);
    const smile = new T.Mesh(new T.TorusGeometry(0.36, 0.05, 12, 32, Math.PI), mat(0x1f2a44, 0.4));
    smile.rotation.z = Math.PI;
    smile.position.set(0, -0.1, 1.03);
    nucleus.add(smile);
    root.add(nucleus);

    const pivots: any[] = [];
    [
      { c: 0x2f5bff, rz: 0 },
      { c: 0xff8fa3, rz: Math.PI / 3 },
      { c: 0x5dd6a2, rz: -Math.PI / 3 },
    ].forEach((d) => {
      const g = new T.Group();
      g.rotation.set(1.15, 0, d.rz);
      g.add(new T.Mesh(new T.TorusGeometry(2.6, 0.045, 14, 160), mat(d.c, 0.5)));
      const pv = new T.Group();
      pv.add(ball(0.26, d.c, 2.6, 0, 0, 0.25));
      g.add(pv);
      pivots.push(pv);
      root.add(g);
    });

    const floats: any[] = [];
    [
      [-3.4, 2.5, -1.5, 0xff8fa3, 0.26],
      [3.5, -2.6, -1, 0xffa24c, 0.3],
      [3.3, 2.7, -2, 0xa78bfa, 0.24],
      [-3.3, -2.4, -1, 0x5dd6a2, 0.22],
    ].forEach((f) => {
      const b = ball(f[4], f[3], f[0], f[1], f[2], 0.3);
      b.userData.y = f[1];
      scene.add(b);
      floats.push(b);
    });

    const size = () => {
      const w = wrap.clientWidth || 400;
      renderer.setSize(w, w, false);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    let mx = 0,
      my = 0,
      vis = true,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    const io = new IntersectionObserver((en) => {
      vis = en[0].isIntersecting;
    });
    io.observe(wrap);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!vis) return;
      const s = reduce ? 0 : t / 1000;
      const kick = (kickRef.current *= 0.95);
      root.rotation.y += (mx * 1.5 - root.rotation.y) * 0.07;
      root.rotation.x += (my * 1.0 - root.rotation.x) * 0.07;
      root.rotation.z = kick * kick * Math.sin(kick * 10) * 0.5;
      nucleus.position.y = Math.sin(s * 1.6) * 0.09 + Math.abs(Math.sin(kick * 6)) * kick * 0.9;
      nucleus.scale.setScalar(1 + Math.sin(kick * 14) * kick * 0.18);
      pivots.forEach((p, i) => {
        p.rotation.z = s * (0.9 + i * 0.3) + kick * kick * 4 * (i + 1);
      });
      floats.forEach((b, i) => {
        b.position.y = b.userData.y + Math.sin(s * 1.2 + i * 1.7) * 0.22;
      });
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    stopRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
    };
  }

  function poke() {
    kickRef.current = 1;
    setFact((f) => (f + 1) % FACTS.length);
    setPop((p) => p + 1);
  }

  useEffect(() => {
    start();
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="atom" ref={wrapRef}>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onReady={start}
        onError={() => setFailed(true)}
      />
      <canvas
        ref={cvRef}
        hidden={failed}
        onClick={poke}
        role="img"
        aria-label="Kulib turgan 3D atom qahramon"
      />
      {failed && (
        <svg className="fallback" viewBox="0 0 160 160" role="img" aria-label="Kulib turgan atom qahramon">
          <g fill="none" strokeWidth="4" strokeLinecap="round">
            <ellipse cx="80" cy="80" rx="72" ry="26" stroke="#2F5BFF" />
            <ellipse cx="80" cy="80" rx="72" ry="26" transform="rotate(60 80 80)" stroke="#FF8FA3" />
            <ellipse cx="80" cy="80" rx="72" ry="26" transform="rotate(120 80 80)" stroke="#5DD6A2" />
          </g>
          <circle cx="80" cy="80" r="36" fill="#FFD166" />
          <circle cx="68" cy="74" r="4.5" fill="#1F2A44" />
          <circle cx="92" cy="74" r="4.5" fill="#1F2A44" />
          <path d="M68 90Q80 103 92 90" fill="none" stroke="#1F2A44" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )}
      <span className="sticker a">F = m·a</span>
      <span className="sticker b">v = s / t</span>
      <span className="sticker c">I = U / R</span>
      <span className="sticker d">ρ = m / V</span>
      <button key={pop} type="button" className={`bubble ${pop ? "pop" : ""}`} onClick={poke}>
        {FACTS[fact]}
      </button>
    </div>
  );
}
