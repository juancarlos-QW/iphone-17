import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import IPhoneModel from "./three/IPhoneModel";

gsap.registerPlugin(ScrollTrigger);

// rotação em que o aparelho termina a entrada (de costas, mostrando a lateral)
const BACK_ROTATION = 0.8;

function Scene({ anim, titleRef, canvasRef }) {
  const phoneRef = useRef();
  const floatRef = useRef();

  useEffect(() => {
    const phone = phoneRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    // o canvas tem fundo transparente, então o fade dele revela só o aparelho
    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0.2)
      .fromTo(phone.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 2.2 }, 0.2)
      .fromTo(phone.position, { y: -0.4 }, { y: 0, duration: 2.2 }, 0.2)
      // entra girando e para de costas, mostrando a lateral e as câmeras
      .fromTo(phone.rotation, { y: -Math.PI * 1.2, z: 0 }, { y: BACK_ROTATION, z: 0, duration: 2.8, ease: "power2.inOut" }, 0.1)
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

  // flutuação suave + animações controladas pela rolagem (anim.turn e anim.exit)
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const float = floatRef.current;
    const sway = Math.sin(t * 0.4) * 0.06 * anim.float * (1 - anim.turn * 0.5);

    // gira das costas até ficar de frente (rotação total = PI)
    float.rotation.y = sway + anim.turn * (Math.PI - BACK_ROTATION);
    // depois desce inclinando em direção à próxima seção
    float.rotation.x = anim.exit * 0.35;
    float.position.y = Math.sin(t * 0.8) * 0.05 * anim.float - anim.exit * 1.6;
    float.scale.setScalar(1 + anim.turn * 0.1 - anim.exit * 0.4);
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
  const titleScrollRef = useRef();
  const canvasRef = useRef();
  const stageRef = useRef();
  const hintRef = useRef();
  const fadeRef = useRef();
  const [inView, setInView] = useState(true);
  // valores animados pelo GSAP e lidos a cada frame pela cena 3D
  const [anim] = useState(() => ({ float: 0, turn: 0, exit: 0 }));

  // Pausa a renderização 3D quando o hero sai da tela, para poupar bateria
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animação de rolagem do hero: o iPhone gira até ficar de frente e depois
  // desce suavemente junto com a passagem para a próxima seção
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 1) hero fixo na tela: título some e o iPhone gira até ficar de frente
    const pin = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    pin
      .to(titleScrollRef.current, { y: -60, opacity: 0, duration: 0.25, ease: "power1.in" }, 0)
      .to(hintRef.current, { opacity: 0, duration: 0.1 }, 0)
      .to(anim, { turn: 1, duration: 0.8, ease: "power2.inOut" }, 0.05)
      // pequena pausa com o aparelho de frente antes de liberar a página
      .to({}, { duration: 0.2 });

    // 2) a página volta a rolar e o iPhone desce e some enquanto a próxima seção sobe
    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: () => pin.scrollTrigger.end,
        end: () => pin.scrollTrigger.end + window.innerHeight * 0.8,
        scrub: 1,
      },
    });

    exit
      .to(fadeRef.current, { opacity: 1, duration: 0.3, ease: "none" }, 0)
      .to(anim, { exit: 1, duration: 1, ease: "power1.in" }, 0)
      .to(stageRef.current, { opacity: 0, duration: 0.6, ease: "none" }, 0.4);

    // o pin adiciona altura à página: recalcula as animações das outras seções
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      [pin, exit].forEach((timeline) => {
        timeline.scrollTrigger.kill();
        timeline.kill();
      });
    };
  }, [anim]);

  // a div externa fica fixa no DOM do React; o GSAP envolve só a <section> no pin
  return (
    <div>
      <section ref={sectionRef} className="relative h-svh min-h-140 overflow-hidden bg-black">
        <div ref={titleScrollRef} className="absolute top-24 inset-x-0 z-10 px-6 text-center">
          <div ref={titleRef} className="opacity-0">
            <h2 className="text-6xl font-extrabold tracking-tight text-gradient">iPhone 17 Pro</h2>
          </div>
        </div>

        <div ref={stageRef} className="absolute inset-0">
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
                <Scene anim={anim} titleRef={titleRef} canvasRef={canvasRef} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* degradê na borda de baixo: o iPhone se dissolve na próxima seção em vez de ser cortado */}
        <div
          ref={fadeRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-black opacity-0"
        />

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ArrowDown className="size-6 animate-bounce" strokeWidth={1.5} />
        </div>
      </section>
    </div>
  );
}

export default HeroMobile;
