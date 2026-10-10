const highlights = [
  "CPU 20% mais rápida",
  "GPU 25% mais eficiente",
  "Memória 30% mais rápida",
  "Capacidade de bateria 15% maior",
];

function Performance() {
  return (
    <section className="bg-black px-6 pb-20 scroll-mt-20" id="performance">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-3xl p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-6 text-gradient">A18 Pro</h2>
        <p className="text-gray-400 mb-4">
          O processador A18 Pro oferece desempenho excepcional para as tarefas
          mais exigentes.
        </p>
        <img
          className="w-full h-auto rounded-2xl mb-4"
          src="/img/chip-a18-pro.jpg"
          alt="Chip A18 Pro"
          width={1728}
          height={912}
          loading="lazy"
        />

        <ul className="space-y-3 text-gray-400">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Performance;
