import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import * as THREE from "three";
import IPhoneModel from "./three/IPhoneModel";

function Scene({ titleRef, canvasRef }) {
  const phoneRef = useRef();
  const floatRef = useRef();
  // valor animado pelo GSAP e lido a cada frame para a flutuação
  const [anim] = useState(() => ({ float: 0 }));

  useEffect(() => {
    const phone = phoneRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    // o canvas tem fundo transparente, então o fade dele revela só o aparelho
    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0.2)
      .fromTo(phone.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 2.2 }, 0.2)
      .fromTo(phone.position, { y: -0.4 }, { y: 0, duration: 2.2 }, 0.2)
      // entra girando e para de costas, mostrando a lateral e as câmeras
      .fromTo(phone.rotation, { y: -Math.PI * 1.2, z: 0 }, { y: 0.8, z: 0, duration: 2.8, ease: "power2.inOut" }, 0.1)
      .fromTo(anim, { float: 0 }, { float: 1, duration: 1.5, ease: "power1.inOut" }, 2.4)
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
        1.4,
      );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tl.progress(1);
    }

    return () => tl.kill();
  }, [anim, titleRef, canvasRef]);

  // flutuação suave depois que o aparelho para de girar
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    floatRef.current.position.y = Math.sin(t * 0.8) * 0.05 * anim.float;
    floatRef.current.rotation.y = Math.sin(t * 0.4) * 0.06 * anim.float;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 5]} intensity={1} />

      {/* Ambiente claro e levemente frio refletido no metal prateado, sem baixar HDR */}
      <Environment resolution={256}>
        <color attach="background" args={["#687c96"]} />
        <Lightformer form="rect" intensity={2} color="#dce6f2" position={[0, 3, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#e8f0fa" position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#dfe8f3" position={[5, 0, 0]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.5} position={[0, 0, -5]} scale={[10, 10, 1]} />
      </Environment>

      <group position={[0, -0.15, 0]}>
        <group ref={floatRef}>
          <group ref={phoneRef}>
            <IPhoneModel />
          </group>
        </group>
      </group>
    </>
  );
}

function HeroMobile() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const canvasRef = useRef();
  const [inView, setInView] = useState(true);

  // Pausa a renderização 3D quando o hero sai da tela, para poupar bateria
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-svh min-h-140 overflow-hidden bg-gray-800">
      <div
        ref={titleRef}
        className="absolute top-24 inset-x-0 z-10 px-6 text-center opacity-0"
      >
        <h2 className="text-6xl font-extrabold tracking-tight text-gradient">iPhone 17 Pro</h2>
      </div>

      <div ref={canvasRef} className="absolute inset-0 opacity-0">
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          // tone mapping neutro mantém as cores do aparelho mais vivas que o ACES padrão
          onCreated={({ gl }) => (gl.toneMapping = THREE.NeutralToneMapping)}
        >
          <Suspense fallback={null}>
            <Scene titleRef={titleRef} canvasRef={canvasRef} />
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
