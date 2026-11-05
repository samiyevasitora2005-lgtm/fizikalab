"use client";

import { useEffect } from "react";

export default function Effects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((c) => {
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateX(${(-y * 14).toFixed(1)}deg) rotateY(${(x * 14).toFixed(1)}deg) translateY(-6px)`;
      };
      const leave = () => {
        c.style.transform = "";
      };
      c.addEventListener("pointermove", move);
      c.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        c.removeEventListener("pointermove", move);
        c.removeEventListener("pointerleave", leave);
      });
    });

    const items = document.querySelectorAll<HTMLElement>("[data-rv]");
    items.forEach((n) => n.classList.add("rv"));
    const io = new IntersectionObserver(
      (en) => {
        en.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((n, i) => {
      n.style.animationDelay = `${(i % 3) * 0.08}s`;
      io.observe(n);
    });
    cleanups.push(() => io.disconnect());

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
