import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#design", label: "Design" },
    { href: "#performance", label: "Performance" },
    { href: "#camera", label: "Camera" },
    { href: "#cores", label: "Cores" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between lg:justify-center lg:gap-8">
        {/* Links - visíveis a partir de lg (desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-white">
          {links.map((link) => (
            <a
              key={link.href}
              className="hover:text-gray-300 transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botão Comprar - sempre visível */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer">
          Comprar
        </button>

        {/* Botão hambúrguer - visível até lg (mobile/tablet) */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile/tablet - dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 text-white bg-black/95">
          {links.map((link) => (
            <a
              key={link.href}
              className="hover:text-gray-300 transition-colors py-1"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;