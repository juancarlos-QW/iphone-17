
function Card() {
  return (
    <section className="bg-black py-20 px-6" id="design">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Design Revolucionário</h2>
          <p className="text-lg text-gray-400">
            Um design inovador que combina estética e funcionalidade para
            oferecer a melhor experiência ao usuário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img
              className="w-full rounded-2xl"
              src="../../public/img/titanium-design.jpg"
              alt="Titanium Design"
            />
            <h3 className="text-2xl font-bold mb-2">Titanium Design</h3>
            <p className="text-gray-400">
              Estrutura em titanium de alta qualidade. O smartphone é leve e
              resistente.
            </p>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img
              className="w-full rounded-2xl"
              src="../../public/img/ios-features.jpg"
              alt="iOS Features"
            />
            <h3 className="text-2xl font-bold mb-2">iOS 28</h3>
            <p className="text-gray-400">
              Com apenas 6,9 mm de espessura, o smartphone é fino e elegante.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-12 mb-16" id="performance">
          <h3 className="text-4xl font-bold mb-6 text-gradient">A18 Pro</h3>
          <p className="text-gray-400 mb-4">
            O processador A18 Pro oferece desempenho excepcional para tarefas
            mais exigentes.
          </p>
          <img
            className="w-full rounded-2xl mb-4"
            src="../../public/img/chip-a18-pro.jpg"
            alt="A18 Pro"
          />

          <ul className="space-y-3 text-gray-400">
            <li>CPU 20% mais rápido</li>
            <li>GPU 25% mais eficiente</li>
            <li>Memória 30% mais rápida</li>
            <li>Capacidade de bateria 15% maior</li>
          </ul>
        </div>

        <div className="text-center" id="camera">
          <h3 className="text-4xl font-bold mb-6 text-gradient">
            Sistema de câmera avançado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer hover:bg-gray-800">
              <div className="text-2xl font-bold mb-2 text-blue-600">48MP</div>
              <h4 className="text-xl font-semibold mb-2">Principal</h4>
              <p className="text-gray-400">
                Sensor quad-pixel com foco automático
              </p>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer hover:bg-gray-800">
              <div className="text-2xl font-bold mb-2 text-orange-500">
                12MP
              </div>
              <h4 className="text-xl font-semibold mb-2">Ultra Wide</h4>
              <p className="text-gray-400">Campo de visão ampliado</p>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer hover:bg-gray-800">
              <div className="text-2xl font-bold mb-2 text-blue-600">12MP</div>
              <h4 className="text-xl font-semibold mb-2">Telephoto 5x</h4>
              <p className="text-gray-400">
                Sensor de imagem de 12MP com zoom óptico de 5x
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
