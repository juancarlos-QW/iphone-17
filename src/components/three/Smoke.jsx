import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PUFF_COUNT = 28;

// Gera uma "nuvem" macia num canvas, assim não dependemos de imagem externa
function createSmokeTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < 40; i++) {
    const x = size / 2 + (Math.random() - 0.5) * size * 0.45;
    const y = size / 2 + (Math.random() - 0.5) * size * 0.45;
    const r = size * (0.12 + Math.random() * 0.22);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "rgba(255,255,255,0.14)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // Suaviza as bordas para não aparecer o quadrado do sprite
  ctx.globalCompositeOperation = "destination-in";
  const mask = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  mask.addColorStop(0.5, "rgba(0,0,0,1)");
  mask.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createPuffs() {
  const tints = ["#6b7280", "#6b7280", "#6b7280", "#1e3a8a", "#7c2d12"];

  return Array.from({ length: PUFF_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.15 + Math.random() * 0.7;
    const position = [
      Math.cos(angle) * radius * 0.8,
      Math.sin(angle) * radius * 1.2,
      -0.8 + Math.random() * 1.8,
    ];

    return {
      position,
      // direção em que a fumaça se espalha ao revelar o aparelho
      direction: [Math.cos(angle), Math.sin(angle) * 0.6 + 0.3, 0.2],
      spread: 0.8 + Math.random() * 1.2,
      size: 0.9 + Math.random() * 1.1,
      opacity: 0.18 + Math.random() * 0.22,
      spin: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      color: tints[Math.floor(Math.random() * tints.length)],
    };
  });
}

// anim.intro: 0 → 1 a fumaça aparece | anim.reveal: 0 → 1 a fumaça se dissipa
function Smoke({ anim }) {
  const texture = useMemo(() => createSmokeTexture(), []);
  const puffs = useMemo(() => createPuffs(), []);
  const sprites = useRef([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { intro, reveal } = anim;

    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      const puff = puffs[i];
      const drift = Math.sin(t * 0.3 + puff.phase) * 0.15;
      const distance = reveal * puff.spread;

      sprite.position.set(
        puff.position[0] + puff.direction[0] * distance + drift,
        puff.position[1] + puff.direction[1] * distance + Math.cos(t * 0.25 + puff.phase) * 0.1,
        puff.position[2] + puff.direction[2] * distance,
      );
      // depois de revelar, fica só uma névoa leve ao redor
      sprite.material.opacity = puff.opacity * intro * (1 - 0.85 * reveal);
      sprite.material.rotation += puff.spin * delta;
    });
  });

  return (
    <group>
      {puffs.map((puff, i) => (
        <sprite
          key={i}
          ref={(el) => (sprites.current[i] = el)}
          position={puff.position}
          scale={[puff.size, puff.size, 1]}
          renderOrder={1}
        >
          <spriteMaterial
            map={texture}
            color={puff.color}
            rotation={puff.rotation}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export default Smoke;
