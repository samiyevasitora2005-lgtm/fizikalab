import Link from "next/link";

const sinflar = [
  { n: 7, card: "bg-fl-red", text: "text-ink", btn: "bg-ink text-white" },
  { n: 8, card: "bg-fl-blue", text: "text-white", btn: "bg-white text-ink" },
  { n: 9, card: "bg-fl-green", text: "text-ink", btn: "bg-ink text-white" },
  { n: 10, card: "bg-fl-yellow", text: "text-ink", btn: "bg-ink text-white" },
  { n: 11, card: "bg-white", text: "text-ink", btn: "bg-fl-blue text-white" },
];

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Sinflar() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="bg-grid text-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fl-blue">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="#fff"
                strokeWidth={1.6}
                aria-hidden="true"
              >
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="1.6" fill="#fff" />
              </svg>
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              FizikaLab
            </span>
          </Link>

          <div className="hidden gap-8 text-base font-bold text-soft md:flex">
            <Link href="/" className="hover:text-white">
              Bosh sahifa
            </Link>
            <Link href="/sinflar" className="text-white">
              Darsliklar
            </Link>
            <Link href="/sinflar" className="hover:text-white">
              Videodarslar
            </Link>
            <Link href="/sinflar" className="hover:text-white">
              Laboratoriyalar
            </Link>
            <Link href="/oyin" className="text-fl-yellow hover:text-white">
              O‘yin
            </Link>
          </div>

          <Link
            href="/auth/royxatdan-otish"
            className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 font-extrabold text-ink transition hover:bg-fl-yellow"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </nav>

        <header className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pb-24 pt-10">
          <span className="font-mono text-sm font-bold text-fl-green">
            // darsliklar
          </span>
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Sinflar
          </h1>
          <p className="text-lg font-semibold text-soft md:text-xl">
            O‘rganish uchun sinfni tanlang.
          </p>
        </header>
      </div>

      <section className="mx-auto -mt-12 max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sinflar.map((s) => (
            <Link
              key={s.n}
              href={`/sinflar/${s.n}-sinf`}
              className={`card-pop flex flex-col gap-6 p-7 ${s.card} ${s.text}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-8xl font-black leading-[0.85] tracking-tighter">
                  {s.n}
                </span>
                <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-extrabold text-ink">
                  6 bo‘lim
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {s.n}-sinf
                </h2>
                <p className="text-base font-bold opacity-80">
                  {s.n}-sinf fizika
                </p>
              </div>

              <span
                className={`inline-flex min-h-11 items-center gap-2 self-start rounded-xl border-2 border-ink px-5 font-extrabold ${s.btn}`}
              >
                Kirish
                <Arrow />
              </span>
            </Link>
          ))}

          <div className="flex flex-col justify-center gap-3 rounded-3xl border-2 border-dashed border-ink/40 p-7">
            <span className="font-mono text-sm font-bold text-fl-blue-700">
              // maslahat
            </span>
            <p className="text-xl font-extrabold leading-snug">
              Hisob yarating va o‘yinda ball to‘plang
            </p>
            <Link
              href="/auth/royxatdan-otish"
              className="inline-flex items-center gap-2 font-extrabold text-fl-blue-700 hover:underline"
            >
              Ro‘yxatdan o‘tish
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <span className="text-xl font-extrabold text-white">FizikaLab</span>
          <span className="text-sm font-semibold">
            © 2026 FizikaLab. Fizikani tajriba orqali o‘rganing.
          </span>
        </div>
      </footer>
    </main>
  );
}
