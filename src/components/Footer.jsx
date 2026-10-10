const sections = [
  {
    title: "Comprar e saber mais",
    links: [
      "iPhone 17 Pro",
      "iPhone 17 Pro Max",
      "Comprar modelos",
      "Acessórios",
    ],
  },
  {
    title: "Especificações",
    links: ["Características técnicas", "Câmera", "Bateria", "Display"],
  },
  {
    title: "Suporte",
    links: ["Suporte ao iPhone", "AppleCare+", "iOS 26", "Contato"],
  },
  {
    title: "Apple",
    links: ["Sobre a Apple", "Newsroom", "Privacidade", "Carreiras"],
  },
];

const bottomLinks = [
  "Política de privacidade",
  "Termos de uso",
  "Acessibilidade",
];

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Apple Inc. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            {bottomLinks.map((link) => (
              <a
                href="#"
                key={link}
                className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-xs py-4">
          Projeto de estudo, sem afiliação com a Apple Inc. Site em
          desenvolvimento.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
