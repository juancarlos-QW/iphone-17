function Intro() {
  const specs = [
    { value: "6.3", label: "Display Super Retina XDR", color: "text-blue-600" },
    { value: "A18 Pro", label: "Chip mais rápido", color: "text-orange-500" },
    { value: "48MP", label: "Sistema de camera", color: "text-blue-600" },
    { value: "29h", label: "Bateria", color: "text-orange-500" },
  ];

  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Iphone 17 Pro</h1>
        <p className="text-2xl md:text-4xl text-gradient font-bold mb-4">
          Titanio. Tão forte. Tão leve. Tão Pro.
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          O iPhone 17 Pro combina design premium, alto desempenho e câmeras avançadas em uma experiência rápida, elegante e intuitiva.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer">
          Compre agora
        </button>
        <button className="border-2 border-white rounded-full hover:bg-white hover:text-black text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-gray-500/50 cursor-pointer">
          Saiba mais
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-5xl">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="cursor-pointer bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105 "
          >
            <p className={`text-3xl font-bold ${spec.color}`}>{spec.value}</p>
            <p className="text-sm text-gray-300 mt-2">{spec.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Intro;
