
export default function ElektronDarslik() {
  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-800">
        📚 8-sinf — Elektron darsliklar
      </h1>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          1-mavzu. Fizika darsligi
        </h2>

        <a
          href="/darsliklar/8-SINF%20Darslik%201-mavzu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          📖 Darslikni ochish
        </a>
      </div>
    </main>
  );
}
