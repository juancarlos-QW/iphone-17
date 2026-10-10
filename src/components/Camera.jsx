const cameras = [
  {
    resolution: "48MP",
    name: "Principal",
    description: "Sensor quad-pixel com foco automático",
    color: "text-blue-600",
  },
  {
    resolution: "12MP",
    name: "Ultra Wide",
    description: "Campo de visão ampliado",
    color: "text-orange-500",
  },
  {
    resolution: "12MP",
    name: "Telephoto 5x",
    description: "Sensor de imagem de 12MP com zoom óptico de 5x",
    color: "text-blue-600",
  },
];

function Camera() {
  return (
    <section className="bg-black px-6 pb-20 text-center scroll-mt-20" id="camera">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gradient" data-reveal>
          Sistema de câmera avançado
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-reveal-group>
          {cameras.map((camera) => (
            <div
              key={camera.name}
              className="bg-gray-900 rounded-3xl p-8 hover:scale-105 hover:bg-gray-800 transition-all duration-300"
            >
              <div className={`text-2xl font-bold mb-2 ${camera.color}`}>
                {camera.resolution}
              </div>
              <h3 className="text-xl font-semibold mb-2">{camera.name}</h3>
              <p className="text-gray-400">{camera.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Camera;
