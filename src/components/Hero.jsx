import { lazy, Suspense } from "react";
import { ArrowDown } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";

// O 3D só é baixado no celular; no desktop continua a imagem
const HeroMobile = lazy(() => import("./HeroMobile"));

function Hero() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <Suspense fallback={<section className="h-svh bg-gray-800" />}>
        <HeroMobile />
      </Suspense>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div className="absolute top-20 left-0 right-0 bottom-0 z-0">
        <img
          className="w-full h-full object-cover opacity-90 animate-hero-zoom"
          src="/img/hero.jpg"
          alt="iPhone 17 Pro"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/80"></div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="size-6" strokeWidth={1.5} />
      </div>
    </section>
  );
}

export default Hero;
