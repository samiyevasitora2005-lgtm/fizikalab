export default function SakkizSinf() {
  const bolimlar = [
    {
      icon: "📚",
      nom: "Elektron darslik",
      izoh: "8-sinf fizika mavzularini elektron shaklda o‘rganing",
    link: "/sinflar/8-sinf/elektron-darslik",
    },
    {
      icon: "🎥",
      nom: "Videodarslar",
      izoh: "Mavzularni tushuntiruvchi videodarslarni tomosha qiling",
    },
    {
      icon: "🧪",
      nom: "Virtual laboratoriya",
      izoh: "Fizik tajribalarni interaktiv tarzda bajaring",
    },
    {
      icon: "📝",
      nom: "Mavzuga doir topshiriqlar",
      izoh: "O‘rgangan mavzularingiz bo‘yicha topshiriqlarni bajaring",
   link: "/sinflar/8-sinf/mavzuga-doir-topshiriqlar",
},
    {
      icon: "⚙️",
      nom: "STEAM topshirig‘i",
      izoh: "Bilimlaringizni amaliy va ijodiy loyihalarda qo‘llang",
      link: "/sinflar/8-sinf/steam",
    },
    {
      icon: "🏆",
      nom: "Sertifikat",
      izoh: "Kursni muvaffaqiyatli yakunlab sertifikatga ega bo‘ling",
      
link: "/sinflar/8-sinf/sertifikat",

    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 text-white">
      <div className="max-w-6xl mx-auto px-5 py-12">

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚛️</div>

          <h1 className="text-4xl md:text-5xl font-bold">
            8-sinf Fizika
          </h1>

          <p className="text-blue-100 text-lg mt-4">
            O‘rganish bo‘limini tanlang
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {bolimlar.map((bolim) => (
            <div
              key={bolim.nom}
              className="bg-white text-blue-950 rounded-3xl p-7 text-center shadow-xl"
            >
              <div className="text-6xl mb-5">
                {bolim.icon}
              </div>

              <h2 className="text-xl md:text-2xl font-bold">
                {bolim.nom}
              </h2>

              <p className="text-gray-600 mt-3 min-h-[55px]">
                {bolim.izoh}
              </p>

              <a
  href={bolim.link || "#"}
  className="mt-5 inline-block bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold px-5 py-3 rounded-xl"
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
