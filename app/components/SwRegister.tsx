"use client";

import { useEffect } from "react";

// Service worker'ni ro'yxatdan o'tkazadi (ilova sifatida o'rnatish va offline sahifa uchun).
export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const reg = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    };
    if (document.readyState === "complete") reg();
    else window.addEventListener("load", reg, { once: true });
  }, []);

  return null;
}
