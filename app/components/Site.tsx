import Link from "next/link";

const PATHS: Record<string, string> = {
  book: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z",
  play: "M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM10 9.5v5l4.5-2.5z",
  flask: "M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3M7.5 15h9",
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  cup: "M8 4h8v6a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 14v4M8.5 20h7",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/">
      <span className="face">
        <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
          <circle cx="14" cy="17" r="2.8" fill="#1F2A44" />
          <circle cx="26" cy="17" r="2.8" fill="#1F2A44" />
          <path d="M13 24Q20 32 27 24" fill="none" stroke="#1F2A44" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </span>
      <span>
        Fizika<b>Lab</b>
      </span>
    </Link>
  );
}

export function Navbar({ active }: { active?: "home" | "darslik" | "oyin" }) {
  return (
    <header className="wrap top">
      <Logo />
      <nav className="nav" aria-label="Asosiy menyu">
        <Link href="/" className={active === "home" ? "on" : ""}>Bosh sahifa</Link>
        <Link href="/sinflar" className={active === "darslik" ? "on" : ""}>Darsliklar</Link>
        <Link href="/sinflar">Videodarslar</Link>
        <Link href="/sinflar">Laboratoriyalar</Link>
        <Link href="/oyin" className="play">O‘yin</Link>
      </nav>
      <Link className="btn blue sm" href="/auth/royxatdan-otish">
        Ro‘yxatdan o‘tish
      </Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot">
        <span className="logo">
          Fizika<b style={{ color: "var(--sun)" }}>Lab</b>
        </span>
        <span className="dots-c" aria-hidden="true">
          <span style={{ background: "var(--berry)" }} />
          <span style={{ background: "var(--sun)" }} />
          <span style={{ background: "var(--mint)" }} />
          <span style={{ background: "var(--sky2)" }} />
          <span style={{ background: "var(--grape)" }} />
        </span>
        <span>© 2026 FizikaLab. Fizikani tajriba orqali o‘rganing.</span>
      </div>
    </footer>
  );
}
