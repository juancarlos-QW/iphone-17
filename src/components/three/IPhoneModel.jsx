import { useLayoutEffect, useMemo } from "react";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const MODEL_URL = "/models/iphone-17-pro-max.glb";

// altura do aparelho na cena, independente da escala original do arquivo
const TARGET_HEIGHT = 1.6;

function IPhoneModel() {
  const { scene, materials } = useGLTF(MODEL_URL);

  const scale = useMemo(() => {
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    return TARGET_HEIGHT / size.y;
  }, [scene]);

  useLayoutEffect(() => {
    // o vidro frontal vem preto e opaco, escondendo o papel de parede da tela
    Object.assign(materials["17ProMax_glass"] ?? {}, {
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
  }, [materials]);

  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

useGLTF.preload(MODEL_URL);

export default IPhoneModel;
