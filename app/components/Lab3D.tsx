"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export type LabState = {
  assembled: boolean;
  kalit: boolean;
  manba: number;
  voltmetr: 1 | 2;
  tok: number;
  u: number;
};

type Props = {
  state: LabState;
  onKalit: () => void;
  onManba: () => void;
  onVoltmetr: (n: 1 | 2) => void;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Lab3D({ state, onKalit, onManba, onVoltmetr }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const stRef = useRef<LabState>(state);
  const hRef = useRef({ onKalit, onManba, onVoltmetr });
  const stopRef = useRef<(() => void) | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    stRef.current = state;
    hRef.current = { onKalit, onManba, onVoltmetr };
  });

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(40, 1.6, 0.1, 100);
    let az = 0;
    let el = 0.75;
    const rad = 16;
    const placeCam = () => {
      camera.position.set(
        Math.sin(az) * Math.cos(el) * rad,
        Math.sin(el) * rad,
        Math.cos(az) * Math.cos(el) * rad
      );
      camera.lookAt(0, 0.3, 0.2);
    };
    placeCam();

    scene.add(new T.AmbientLight(0xffffff, 0.8));
    const dl = new T.DirectionalLight(0xffffff, 0.8);
    dl.position.set(6, 12, 8);
    scene.add(dl);

    const mat = (c: number, r = 0.5) =>
      new T.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.05 });
    const box = (w: number, h: number, d: number, c: number, x: number, y: number, z: number) => {
      const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat(c));
      m.position.set(x, y, z);
      return m;
    };
    const cyl = (rt: number, rb: number, h: number, c: number, x: number, y: number, z: number) => {
      const m = new T.Mesh(new T.CylinderGeometry(rt, rb, h, 24), mat(c, 0.4));
      m.position.set(x, y, z);
      return m;
    };
    const pickables: any[] = [];
    const tag = (m: any, action: string) => {
      m.userData.action = action;
      pickables.push(m);
    };

    /* stol */
    scene.add(box(16, 0.4, 9, 0xe3b27a, 0, -0.2, 0));

    /* ekran (displey) */
    const makeDisplay = (w: number, h: number) => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 96;
      const ctx = c.getContext("2d")!;
      const tex = new T.CanvasTexture(c);
      const mesh = new T.Mesh(
        new T.PlaneGeometry(w, h),
        new T.MeshBasicMaterial({ map: tex })
      );
      let last = "";
      const set = (t: string) => {
        if (t === last) return;
        last = t;
        ctx.fillStyle = "#10241f";
        ctx.fillRect(0, 0, 256, 96);
        ctx.fillStyle = "#7cfc9b";
        ctx.font = "700 54px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(t, 128, 50);
        tex.needsUpdate = true;
      };
      set("0.00");
      return { mesh, set };
    };

    /* yozuv (belgi) */
    const label = (text: string, bg: string, x: number, y: number, z: number) => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 96;
      const ctx = c.getContext("2d")!;
      const r = 28;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.moveTo(r, 8);
      ctx.arcTo(248, 8, 248, 88, r);
      ctx.arcTo(248, 88, 8, 88, r);
      ctx.arcTo(8, 88, 8, 8, r);
      ctx.arcTo(8, 8, 248, 8, r);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#1f2a44";
      ctx.font = "700 44px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 128, 50);
      const sp = new T.Sprite(
        new T.SpriteMaterial({ map: new T.CanvasTexture(c), transparent: true })
      );
      sp.position.set(x, y, z);
      sp.scale.set(2.4, 0.9, 1);
      scene.add(sp);
    };

    /* tok manbai */
    const src = new T.Group();
    src.position.set(-5.5, 0, -1.0);
    const srcBody = box(3, 1.3, 2.2, 0x2f5bff, 0, 0.65, 0);
    tag(srcBody, "knob");
    src.add(srcBody);
    const srcDisp = makeDisplay(1.3, 0.5);
    srcDisp.mesh.position.set(-0.6, 0.85, 1.11);
    src.add(srcDisp.mesh);
    const knob = new T.Group();
    knob.position.set(0.8, 0.8, 1.12);
    const knobDisk = cyl(0.4, 0.4, 0.3, 0xfff1d6, 0, 0, 0);
    knobDisk.rotation.x = Math.PI / 2;
    tag(knobDisk, "knob");
    knob.add(knobDisk);
    const knobPointer = box(0.09, 0.32, 0.06, 0xe5607c, 0, 0.17, 0.17);
    knob.add(knobPointer);
    src.add(knob);
    scene.add(src);
    label("Tok manbai", "#ffffff", -5.5, 2.2, -1.0);

    /* kalit */
    const sw = new T.Group();
    sw.position.set(-5.5, 0, 2.4);
    const swBase = box(2.6, 0.2, 1.0, 0xd9dde8, 0, 0.1, 0);
    tag(swBase, "switch");
    sw.add(swBase);
    const lever = new T.Group();
    lever.position.set(-0.8, 0.35, 0);
    const leverBar = box(1.6, 0.14, 0.2, 0x1f2a44, 0.8, 0, 0);
    tag(leverBar, "switch");
    lever.add(leverBar);
    const handle = new T.Mesh(new T.SphereGeometry(0.2, 20, 20), mat(0xe5607c, 0.4));
    handle.position.set(1.6, 0.05, 0);
    tag(handle, "switch");
    lever.add(handle);
    sw.add(lever);
    scene.add(sw);
    label("Kalit (K)", "#ffd166", -5.5, 2.0, 2.4);

    /* ampermetr */
    const am = new T.Group();
    am.position.set(-1.8, 0, 2.5);
    am.add(box(2, 1.3, 1.3, 0xff8fa3, 0, 0.65, 0));
    const amDisp = makeDisplay(1.5, 0.55);
    amDisp.mesh.position.set(0, 0.7, 0.66);
    am.add(amDisp.mesh);
    scene.add(am);
    label("Ampermetr (A)", "#ffd9df", -1.8, 2.2, 2.5);

    /* voltmetr */
    const vm = new T.Group();
    vm.position.set(3.0, 0, -2.6);
    vm.add(box(2, 1.3, 1.3, 0xa78bfa, 0, 0.65, 0));
    const vmDisp = makeDisplay(1.5, 0.55);
    vmDisp.mesh.position.set(0, 0.7, 0.66);
    vm.add(vmDisp.mesh);
    scene.add(vm);
    label("Voltmetr (V)", "#e4dbff", 3.0, 2.2, -2.6);

    /* lampochkalar */
    const lamps = [1.5, 4.5].map((lx, i) => {
      const act = i === 0 ? "lamp1" : "lamp2";
      const holder = box(1.8, 0.3, 1.2, 0x6b7280, lx, 0.15, 0.8);
      tag(holder, act);
      scene.add(holder);
      const neck = cyl(0.25, 0.3, 0.4, 0x9ca3af, lx, 0.5, 0.8);
      tag(neck, act);
      scene.add(neck);
      const glassMat = new T.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        transparent: true,
        opacity: 0.55,
        emissive: 0xffc040,
        emissiveIntensity: 0,
      });
      const glass = new T.Mesh(new T.SphereGeometry(0.62, 32, 32), glassMat);
      glass.position.set(lx, 1.15, 0.8);
      tag(glass, act);
      scene.add(glass);
      const filMat = new T.MeshStandardMaterial({
        color: 0x555b66,
        emissive: 0xff9a2e,
        emissiveIntensity: 0,
      });
      const fil = new T.Mesh(new T.TorusGeometry(0.2, 0.035, 8, 20), filMat);
      fil.position.set(lx, 1.1, 0.8);
      scene.add(fil);
      const light = new T.PointLight(0xffd27a, 0, 7);
      light.position.set(lx, 1.5, 0.8);
      scene.add(light);
      const ring = new T.Mesh(new T.TorusGeometry(1.05, 0.07, 10, 40), mat(0x7b5be0, 0.4));
      ring.rotation.x = Math.PI / 2;
      ring.position.set(lx, 0.34, 0.8);
      scene.add(ring);
      label(`Lampochka L${i === 0 ? "₁" : "₂"}`, "#fff3c4", lx, 2.4, 0.8);
      return { glassMat, filMat, light, ring };
    });

    /* simlar */
    const post = (x: number, y: number, z: number) => {
      const p = cyl(0.13, 0.13, 0.2, 0xffc83d, x, y - 0.05, z);
      scene.add(p);
    };
    const wire = (pts: number[][], color: number, parent: any) => {
      const curve = new T.CatmullRomCurve3(pts.map((p) => new T.Vector3(p[0], p[1], p[2])));
      parent.add(new T.Mesh(new T.TubeGeometry(curve, 60, 0.07, 8, false), mat(color, 0.6)));
    };

    const P = [-6.5, 1.4, -0.2];
    const Mn = [-6.5, 1.4, -1.7];
    const swL = [-6.3, 0.35, 2.4];
    const swR = [-4.7, 0.35, 2.4];
    const amIn = [-2.4, 1.4, 2.5];
    const amOut = [-1.2, 1.4, 2.5];
    const l1L = [0.8, 0.55, 0.8];
    const l1R = [2.2, 0.55, 0.8];
    const l2L = [3.8, 0.55, 0.8];
    const l2R = [5.2, 0.55, 0.8];
    const vL = [2.5, 1.4, -2.6];
    const vR = [3.5, 1.4, -2.6];
    [P, Mn, swL, swR, amIn, amOut, l1L, l1R, l2L, l2R, vL, vR].forEach((p) => post(p[0], p[1], p[2]));
    label("+", "#ffd9df", -6.5, 2.0, -0.2);
    label("−", "#d9e2ff", -6.5, 2.0, -1.7);

    const mainWires = new T.Group();
    wire([P, [-6.9, 2.0, 0.8], [-6.8, 1.0, 2.0], swL], 0xe5231b, mainWires);
    wire([swR, [-3.8, 1.3, 2.0], [-3.0, 1.9, 2.2], amIn], 0xe5231b, mainWires);
    wire([amOut, [-0.6, 2.0, 1.8], [0.2, 1.5, 1.1], l1L], 0xe5231b, mainWires);
    wire([l1R, [2.6, 0.3, 1.4], [3.4, 0.3, 1.4], l2L], 0xe5231b, mainWires);
    wire([l2R, [5.9, 0.5, 0.0], [6.2, 0.5, -3.8], [0, 0.5, -3.9], [-7.4, 0.5, -3.8], [-7.4, 1.0, -1.9], Mn], 0x1f2a44, mainWires);
    scene.add(mainWires);

    const vWires1 = new T.Group();
    wire([vL, [2.3, 2.3, -1.2], [1.0, 2.2, 0.0], l1L], 0x7b5be0, vWires1);
    wire([vR, [3.2, 2.0, -1.2], [2.4, 1.8, 0.0], l1R], 0x7b5be0, vWires1);
    scene.add(vWires1);
    const vWires2 = new T.Group();
    wire([vL, [3.0, 2.1, -1.2], [3.7, 1.9, 0.0], l2L], 0x7b5be0, vWires2);
    wire([vR, [4.4, 2.3, -1.2], [5.1, 1.9, 0.0], l2R], 0x7b5be0, vWires2);
    scene.add(vWires2);

    /* o'lcham va boshqaruv */
    const size = () => {
      const w = wrap.clientWidth || 600;
      const h = Math.round(w * 0.62);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    const raycaster = new T.Raycaster();
    const ndc = new T.Vector2();
    const hit = (e: PointerEvent): string | null => {
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(pickables, false);
      return hits.length ? (hits[0].object.userData.action as string) : null;
    };

    let dragging = false;
    let moved = 0;
    let lx = 0;
    let ly = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lx = e.clientX;
      ly = e.clientY;
      cv.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        lx = e.clientX;
        ly = e.clientY;
        az = Math.max(-1.2, Math.min(1.2, az - dx * 0.006));
        el = Math.max(0.3, Math.min(1.35, el + dy * 0.006));
        placeCam();
      } else {
        cv.style.cursor = hit(e) ? "pointer" : "grab";
      }
    };
    const up = (e: PointerEvent) => {
      if (dragging && moved < 6) {
        const a = hit(e);
        const h = hRef.current;
        if (a === "knob") h.onManba();
        else if (a === "switch") h.onKalit();
        else if (a === "lamp1") h.onVoltmetr(1);
        else if (a === "lamp2") h.onVoltmetr(2);
      }
      dragging = false;
      cv.style.cursor = "grab";
    };
    const cancel = () => {
      dragging = false;
    };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", cancel);
    cv.addEventListener("pointerleave", cancel);

    let vis = true;
    const io = new IntersectionObserver((en) => {
      vis = en[0].isIntersecting;
    });
    io.observe(wrap);

    let leverA = 0.95;
    let knobA = 0.9;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!vis) return;
      const s = stRef.current;

      leverA += ((s.kalit ? 0 : 0.95) - leverA) * 0.2;
      lever.rotation.z = leverA;
      handle.material.color.setHex(s.kalit ? 0x2fb07a : 0xe5607c);
      const knobT = s.manba === 0 ? 0.9 : s.manba === 4 ? 0 : -0.9;
      knobA += (knobT - knobA) * 0.2;
      knob.rotation.z = knobA;

      mainWires.visible = s.assembled;
      vWires1.visible = s.assembled && s.voltmetr === 1;
      vWires2.visible = s.assembled && s.voltmetr === 2;

      const on = s.assembled && s.kalit && s.tok > 0;
      const b = on ? Math.min(1, s.tok / 0.3) : 0;
      lamps.forEach((l, i) => {
        l.glassMat.emissiveIntensity = b * 1.4;
        l.glassMat.opacity = 0.55 + 0.35 * b;
        l.filMat.emissiveIntensity = b * 2;
        l.light.intensity = b * 1.1;
        l.ring.visible = s.voltmetr === i + 1;
      });

      srcDisp.set(`${s.manba} V`);
      amDisp.set(`${(s.assembled ? s.tok : 0).toFixed(2)} A`);
      vmDisp.set(`${(s.assembled ? s.u : 0).toFixed(2)} V`);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    stopRef.current = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", cancel);
      cv.removeEventListener("pointerleave", cancel);
      renderer.dispose();
    };
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
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onReady={start}
        onError={() => setFailed(true)}
      />
      <canvas
        ref={cvRef}
        hidden={failed}
        role="img"
        aria-label="3D virtual laboratoriya: tok manbai, kalit, ikkita lampochka, ampermetr va voltmetr"
        style={{
          width: "100%",
          aspectRatio: "1 / 0.62",
          display: "block",
          touchAction: "pan-y",
          cursor: "grab",
          borderRadius: 28,
          background: "linear-gradient(#cfeaff, #eaf6ff)",
        }}
      />
      {failed && (
        <p style={{ padding: 24, textAlign: "center", fontWeight: 800 }}>
          3D laboratoriyani yuklab bo‘lmadi. Internetni tekshirib, sahifani yangilang.
        </p>
      )}
    </div>
  );
}
