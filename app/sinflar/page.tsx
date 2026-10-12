export default function Sinflar() {
  const sinflar = [7, 8, 9, 10, 11];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          Sinflar
        </h1>

        <p className="text-xl text-white text-center mb-10">
          O‘rganish uchun sinfni tanlang
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {sinflar.map((sinf) => (
            <div
              key={sinf}
              className="bg-white rounded-3xl p-8 text-center shadow-xl"
            >
              <div className="text-6xl mb-5">📚</div>

              <h2 className="text-3xl font-bold text-blue-950 mb-3">
                {sinf}-sinf
              </h2>

              <p className="text-gray-600 mb-6">
                {sinf}-sinf Fizika
              </p>

              <a
                href={`/sinflar/${sinf}-sinf`}
                className="inline-block bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-semibold px-7 py-3 rounded-xl"
              >
                Kirish →
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}