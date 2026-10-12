import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 text-white">
      
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-violet-500 border-2 border-black p-2 text-2xl">
            ⚛
          </div>
          <h1 className="text-3xl font-bold">FizikaLab</h1>
        </div>

        <div className="hidden md:flex gap-10 text-lg font-semibold">
          <span>Bosh sahifa</span>
          <span>Darsliklar</span>
          <span>Videodarslar</span>
          <span>Laboratoriyalar</span>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-5 min-h-[75vh]">
        
        <div className="bg-violet-500 border-4 border-black p-4 text-5xl mb-6">
          ⚛
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Fizikani tajriba orqali o‘rganing
        </h2>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
          Darsliklar, videodarslar, interaktiv laboratoriyalar va fizik
          masalalar jamlangan zamonaviy ta’lim platformasi.
        </p>

        <Link
          href="/sinflar"
          className="bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold
                     text-lg px-8 py-4 rounded-xl transition"
        >
          O‘rganishni boshlash →
        </Link>

      </section>
    </main>
  );
}