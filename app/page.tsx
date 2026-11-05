import Link from "next/link";

const sections = [
  {
    n: "01",
    title: "Elektron darslik",
    text: "Fizika mavzularini sodda va tushunarli shaklda o‘qing.",
    card: "bg-fl-blue-50",
    chip: "bg-fl-blue text-white",
    d: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z",
  },
  {
    n: "02",
    title: "Videodarslar",
    text: "Mavzularni tushuntiruvchi videodarslarni tomosha qiling.",
    card: "bg-fl-red-50",
    chip: "bg-fl-red text-ink",
    d: "M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM10 9.5v5l4.5-2.5z",
  },
  {
    n: "03",
    title: "Virtual laboratoriya",
    text: "Fizik tajribalarni interaktiv tarzda o‘zingiz bajaring.",
    card: "bg-fl-green-50",
    chip: "bg-fl-green text-ink",
    d: "M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3M7.5 15h9",
  },
  {
    n: "04",
    title: "Mavzuga doir topshiriqlar",
    text: "O‘rgangan mavzularingiz bo‘yicha topshiriqlarni bajaring.",
    card: "bg-fl-yellow-50",
    chip: "bg-fl-yellow text-ink",
    d: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  },
  {
    n: "05",
    title: "STEAM topshirig‘i",
    text: "Bilimlaringizni amaliy va ijodiy loyihalarda qo‘llang.",
    card: "bg-fl-red-50",
    chip: "bg-fl-red text-ink",
    d: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  },
  {
    n: "06",
    title: "Sertifikat",
    text: "Kursni muvaffaqiyatli yakunlab, sertifikatga ega bo‘ling.",
    card: "bg-fl-blue-50",
    chip: "bg-fl-blue text-white",
    d: "M8 4h8v6a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 14v4M8.5 20h7",
  },
];

const grades = [
  { n: 7, tile: "bg-fl-red text-ink" },
  { n: 8, tile: "bg-fl-blue text-white" },
  { n: 9, tile: "bg-fl-green text-ink" },
  { n: 10, tile: "bg-fl-yellow text-ink" },
  { n: 11, tile: "bg-white text-ink" },
];

const steps = [
  {
    n: "1",
    color: "bg-fl-red",
    title: "Sinfni tanlang",
    text: "Ro‘yxatdan o‘ting va o‘z sinfingizdagi fizika kursiga kiring.",
  },
  {
    n: "2",
    color: "bg-fl-yellow",
    title: "O‘qing va tajriba qiling",
    text: "Darslikni o‘qing, videoni ko‘ring va virtual laboratoriyada tajribani o‘zingiz bajaring.",
  },
  {
    n: "3",
    color: "bg-fl-green",
    title: "Topshiriqlarni bajaring",
    text: "Mavzuga doir va STEAM topshiriqlarini yeching, kurs oxirida sertifikat oling.",
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function Logo() {
  return (
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
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${className}`}
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

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* NAVBAR + HERO */}
      <div className="bg-grid text-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-extrabold tracking-tight">
              FizikaLab
            </span>
          </Link>

          <div className="hidden gap-8 text-base font-bold text-soft md:flex">
            <Link href="/" className="text-white">
              Bosh sahifa
            </Link>
            <Link href="/sinflar" className="hover:text-white">
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

        <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-6 pb-24 pt-12">
          <div className="flex min-w-0 flex-1 basis-[460px] flex-col gap-7">
            <span className="self-start rounded-full border-2 border-fl-green px-4 py-1.5 font-mono text-sm text-fl-green">
              7–11-sinf · o‘zbek tilida
            </span>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Fizikani{" "}
              <span className="rounded-2xl bg-fl-yellow px-3 text-ink">
                tajriba
              </span>{" "}
              orqali o‘rganing
            </h1>

            <p className="max-w-xl text-lg font-semibold leading-relaxed text-soft md:text-xl">
              Darsliklar, videodarslar, interaktiv laboratoriyalar, o‘yinlar va
              fizik masalalar jamlangan zamonaviy ta’lim platformasi.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/sinflar"
                className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-fl-green px-8 text-lg font-extrabold text-ink shadow-[5px_5px_0_0_#ffc93c] transition hover:-translate-y-0.5"
              >
                O‘rganishni boshlash
                <Arrow />
              </Link>
              <Link
                href="/oyin"
                className="inline-flex min-h-14 items-center rounded-2xl border-2 border-white/40 px-7 text-lg font-extrabold text-white transition hover:bg-white/10"
              >
                O‘yin o‘ynash
              </Link>
            </div>
          </div>

          {/* tajriba kartasi */}
          <div className="relative min-w-0 flex-1 basis-[380px]">
            <div className="animate-float rounded-3xl border-2 border-ink bg-paper p-5 text-ink shadow-[8px_8px_0_0_#3ddc84]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm text-muted">
                  tajriba №1 · otilgan jism
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-fl-red" />
                  <span className="h-3 w-3 rounded-full bg-fl-yellow" />
                  <span className="h-3 w-3 rounded-full bg-fl-green" />
                </span>
              </div>

              <svg
                viewBox="0 0 520 330"
                className="block w-full"
                role="img"
                aria-label="Gorizontga burchak ostida otilgan jism traektoriyasi"
              >
                <g stroke="#d6dbef" strokeWidth="1">
                  <path d="M40 230H500M40 170H500M40 110H500M40 50H500" strokeDasharray="3 6" />
                </g>
                <path d="M40 290H500M40 290V20" stroke="#0b1030" strokeWidth="2" />
                <path
                  d="M40 290Q270 -90 500 290"
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="290" r="9" fill="#0b1030" />
                <circle cx="155" cy="150" r="7" fill="#2f5bff" />
                <circle cx="270" cy="98" r="7" fill="#ffc93c" stroke="#0b1030" strokeWidth="2" />
                <circle cx="385" cy="150" r="7" fill="#2f5bff" />
                <circle cx="500" cy="290" r="7" fill="#3ddc84" stroke="#0b1030" strokeWidth="2" />
                <path d="M40 290L110 220" stroke="#2f5bff" strokeWidth="4" strokeLinecap="round" />
                <text x="78" y="278" fill="#0b1030" fontFamily="monospace" fontSize="15">θ</text>
                <text x="104" y="210" fill="#0b1030" fontFamily="monospace" fontSize="15">v₀</text>
                <text x="232" y="78" fill="#0b1030" fontFamily="monospace" fontSize="15">h max</text>
              </svg>
            </div>

            <span className="absolute -left-3 top-8 -rotate-6 rounded-xl border-2 border-ink bg-fl-yellow px-3 py-2 font-mono text-sm font-bold text-ink">
              F = m·a
            </span>
            <span className="absolute -right-2 top-24 rotate-6 rounded-xl border-2 border-ink bg-fl-green px-3 py-2 font-mono text-sm font-bold text-ink">
              v = s / t
            </span>
            <span className="absolute -bottom-4 left-10 -rotate-3 rounded-xl border-2 border-ink bg-fl-red px-3 py-2 font-mono text-sm font-bold text-ink">
              I = U / R
            </span>
          </div>
        </section>
      </div>

      {/* BO'LIMLAR */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-sm font-bold text-fl-blue-700">
            // har bir sinfda
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Oltita bo‘lim, bitta yo‘l
          </h2>
          <p className="max-w-xl text-lg font-semibold text-muted">
            Mavzuni o‘qishdan sertifikat olishgacha hammasi tartib bilan
            joylashgan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.n}
              href="/sinflar"
              className={`card-pop flex flex-col gap-4 p-7 ${s.card}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink ${s.chip}`}
                >
                  <Icon d={s.d} />
                </span>
                <span className="font-mono text-sm font-bold text-muted">
                  {s.n}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                {s.title}
              </h3>
              <p className="text-base font-semibold leading-relaxed text-muted">
                {s.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SINFLAR */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-20">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-sm font-bold text-fl-blue-700">
            // sinfni tanlang
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Qaysi sinfda o‘qiysiz?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {grades.map((g) => (
            <Link
              key={g.n}
              href={`/sinflar/${g.n}-sinf`}
              className={`card-pop flex flex-col gap-2 p-6 ${g.tile}`}
            >
              <span className="text-7xl font-black leading-none tracking-tighter">
                {g.n}
              </span>
              <span className="text-lg font-extrabold">{g.n}-sinf fizika</span>
              <span className="mt-2 inline-flex items-center gap-2 font-bold">
                Kirish <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* O'YIN */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-20">
        <div className="card-pop flex flex-wrap items-center gap-10 bg-fl-yellow p-8 md:p-12">
          <div className="flex min-w-0 flex-1 basis-[340px] flex-col gap-4">
            <span className="self-start rounded-full bg-ink px-4 py-1.5 font-mono text-sm font-bold text-fl-yellow">
              yangi · fizika o‘yini
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
              O‘ynab o‘rganing: fizika viktorinasi
            </h2>
            <p className="max-w-lg text-lg font-semibold text-ink/80">
              Savolga javob bering, ball to‘plang va bilimingizni sinab
              ko‘ring. To‘rt rangdan to‘g‘ri javobni toping!
            </p>
            <Link
              href="/oyin"
              className="mt-2 inline-flex min-h-14 items-center gap-3 self-start rounded-2xl bg-ink px-8 text-lg font-extrabold text-white transition hover:-translate-y-0.5"
            >
              O‘yinni boshlash
              <Arrow />
            </Link>
          </div>

          <div
            className="grid min-w-0 flex-1 basis-[300px] grid-cols-2 gap-4"
            aria-hidden="true"
          >
            <div className="rounded-2xl border-2 border-ink bg-fl-red p-5 text-lg font-extrabold">
              A · F / s
            </div>
            <div className="rounded-2xl border-2 border-ink bg-fl-blue p-5 text-lg font-extrabold text-white">
              B · F · s
            </div>
            <div className="rounded-2xl border-2 border-ink bg-white p-5 text-lg font-extrabold">
              C · F + s
            </div>
            <div className="rounded-2xl border-2 border-ink bg-fl-green p-5 text-lg font-extrabold">
              D · s / F
            </div>
          </div>
        </div>
      </section>

      {/* QADAMLAR */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-20">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-sm font-bold text-fl-blue-700">
            // qanday ishlaydi
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Uch qadamda natijaga
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-4">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink text-2xl font-black ${s.color}`}
              >
                {s.n}
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight">
                {s.title}
              </h3>
              <p className="text-base font-semibold leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-fl-blue p-10 md:p-14">
          <div className="flex min-w-0 flex-1 basis-[360px] flex-col gap-3">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Birinchi tajribangizni boshlang
            </h2>
            <p className="text-lg font-semibold text-white/85">
              Hisob yarating va fizikani amalda o‘rganishni bugundan boshlang.
            </p>
          </div>
          <Link
            href="/auth/royxatdan-otish"
            className="inline-flex min-h-14 items-center rounded-2xl bg-fl-yellow px-8 text-lg font-extrabold text-ink shadow-[5px_5px_0_0_#0b1030] transition hover:-translate-y-0.5"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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
