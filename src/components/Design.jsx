const features = [
  {
    title: "Design em Titânio",
    description:
      "Estrutura em titânio de alta qualidade. O smartphone é leve e resistente.",
    image: "/img/titanium-design.jpg",
    alt: "Lateral do iPhone 17 Pro em titânio",
  },
  {
    title: "iOS 26",
    description:
      "Um sistema mais inteligente e fluido, com recursos pensados para o seu dia a dia.",
    image: "/img/ios-features.jpg",
    alt: "Telas com recursos do iOS",
  },
];

function Design() {
  return (
    <section className="bg-black py-20 px-6 scroll-mt-20" id="design">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <h2 className="text-5xl font-bold mb-4">Design Revolucionário</h2>
          <p className="text-lg text-gray-400">
            Um design inovador que combina estética e funcionalidade para
            oferecer a melhor experiência ao usuário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal-group>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900 rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <img
                className="w-full h-auto rounded-2xl mb-6"
                src={feature.image}
                alt={feature.alt}
                width={1260}
                height={680}
                loading="lazy"
              />
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Design;
