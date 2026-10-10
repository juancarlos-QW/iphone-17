import { useState } from "react";

const colors = [
  { id: "blue", name: "Titânio Azul", image: "/img/iphone-blue.jpg", colorClass: "bg-blue-500" },
  { id: "silver", name: "Titânio Prata", image: "/img/iphone-silver.jpg", colorClass: "bg-gray-300" },
  { id: "orange", name: "Titânio Laranja", image: "/img/iphone-orange.jpg", colorClass: "bg-orange-500" },
];

const models = [
  { id: "pro-max", name: "iPhone 17 Pro Max", screen: "6,9 polegadas", storage: "256GB, 512GB ou 1TB", battery: "33h de vídeo", weight: "221g" },
  { id: "pro", name: "iPhone 17 Pro", screen: "6,3 polegadas", storage: "128GB, 256GB ou 512GB", battery: "29h de vídeo", weight: "199g" },
];

const price = 9922;
const installments = 12;

const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Colors() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const selected = colors.find((color) => color.id === selectedColor);

  return (
    <section id="cores" className="bg-black py-20 px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Escolha a Cor</h2>
          <p className="text-gray-400 text-xl">Três acabamentos lindos em titânio</p>
        </div>

        <div className="flex justify-center mb-16" data-reveal>
          <div className="relative w-full max-w-3xl">
            <div className="relative flex items-center justify-center min-h-125">
              <img
                key={selected.id}
                src={selected.image}
                alt={`iPhone 17 Pro na cor ${selected.name}`}
                width={1728}
                height={912}
                loading="lazy"
                className="max-w-full h-auto max-h-150 mx-auto animate-fade-in"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 text-center">
              <div className="px-8 py-4 rounded-full backdrop-blur-md bg-black/40 inline-block">
                <h3 key={selected.id} className="text-xl font-semibold animate-fade-in">
                  {selected.name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4" data-reveal-group>
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              aria-label={color.name}
              aria-pressed={selectedColor === color.id}
              className="relative transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div
                className={`w-12 h-12 rounded-full ${color.colorClass} ${
                  selectedColor === color.id ? "border-4 border-white" : "border-2 border-gray-600"
                }`}
              ></div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16" data-reveal-group>
          {models.map((model) => (
            <div key={model.id} className="bg-linear-to-b from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
              <div className="text-3xl mb-4" aria-hidden="true">📱</div>
              <h3 className="text-2xl font-bold mb-3">{model.name}</h3>
              <p className="text-gray-500 mb-4 font-semibold">{model.screen}</p>

              <ul className="space-y-2 text-gray-400">
                <li>{model.storage}</li>
                <li>{model.battery}</li>
                <li>{model.weight}</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16" data-reveal>
          <button className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 mb-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer">
            Compre agora a partir de {formatBRL(price)}
          </button>
          <p>
            Ou em até {installments}x de {formatBRL(price / installments)} sem juros
          </p>
        </div>
      </div>
    </section>
  );
}

export default Colors;
