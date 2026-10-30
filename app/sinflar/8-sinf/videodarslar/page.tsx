
"use client";

import { useState } from "react";

export default function Videodarslar() {
  const [tanlangan, setTanlangan] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 p-6 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-3 text-center text-3xl font-bold">
          8-sinf Fizika — Videodarslar
        </h1>

        <p className="mb-8 text-center text-blue-100">
          Videodarsni tomosha qilish uchun mavzuni tanlang.
        </p>

        <button
          onClick={() => setTanlangan(!tanlangan)}
          className="w-full rounded-xl bg-white p-5 text-left text-lg font-bold text-blue-950 shadow-lg transition hover:bg-cyan-100"
        >
          📘 1-mavzu. Jismlarning zaryadlanishi
          <span className="float-right">
            {tanlangan ? "▲" : "▶"}
          </span>
        </button>

        {tanlangan && (
          <div className="mt-5 rounded-xl bg-white p-3 shadow-xl">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/r-MdcNwbDNU"
                title="1-mavzu. Jismlarning zaryadlanishi"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
