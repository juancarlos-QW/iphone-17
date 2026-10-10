import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import IPhoneModel from "./three/IPhoneModel";
import Smoke from "./three/Smoke";

function Scene({ titleRef }) {
  const phoneRef = useRef();
  const floatRef = useRef();
  // valores animados pelo GSAP e lidos a cada frame pelos componentes 3D
  const [anim] = useState(() => ({ intro: 0, reveal: 0, fade: 0 }));

  useEffect(() => {
    const phone = phoneRef.current;
    const title = titleRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(anim, { intro: 0 }, { intro: 1, duration: 1, ease: "power1.out" }, 0)
      .fromTo(anim, { fade: 0 }, { fade: 1, duration: 1.6 }, 0.5)
      .fromTo(phone.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 2.2 }, 0.5)
      .fromTo(phone.position, { y: -0.4 }, { y: 0, duration: 2.2 }, 0.5)
      // entra girando e para levemente de lado, mostrando as câmeras
      .fromTo(phone.rotation, { y: -Math.PI * 1.2, z: 0 }, { y: 0.45, z: 0.08, duration: 2.8, ease: "power2.inOut" }, 0.4)
      .fromTo(anim, { reveal: 0 }, { reveal: 1, duration: 2.4, ease: "power2.inOut" }, 1.2)
      .fromTo(
        title,
        { opacity: 0, y: 30, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
        1.6,
      );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tl.progress(1);
    }

    return () => tl.kill();
  }, [anim, titleRef]);

  // o aparelho "acende" saindo do preto (a fumaça não usa tone mapping)
  // e depois flutua suavemente
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.gl.toneMappingExposure = anim.fade;
    floatRef.current.position.y = Math.sin(t * 0.8) * 0.05 * anim.reveal;
    floatRef.current.rotation.y = Math.sin(t * 0.4) * 0.1 * anim.reveal;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />

      {/* Reflexos do metal gerados localmente, sem baixar HDR */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#3b82f6" position={[-4, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#f97316" position={[4, 0, 2]} scale={[2, 6, 1]} />
      </Environment>

      <group position={[0, -0.15, 0]}>
        <group ref={floatRef}>
          <group ref={phoneRef}>
            <IPhoneModel />
          </group>
        </group>
        <Smoke anim={anim} />
      </group>
    </>
  );
}

function HeroMobile() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const [inView, setInView] = useState(true);

  // Pausa a renderização 3D quando o hero sai da tela, para poupar bateria
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-svh min-h-140 overflow-hidden bg-black">
      <div
        ref={titleRef}
        className="absolute top-24 inset-x-0 z-10 px-6 text-center opacity-0"
      >
        <h2 className="text-5xl font-bold tracking-tight">iPhone 17 Pro</h2>
      </div>

      <div className="absolute inset-0">
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <Scene titleRef={titleRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="size-6" strokeWidth={1.5} />
      </div>
    </section>
  );
}

export default HeroMobile;
