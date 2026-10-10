import { Center, useGLTF } from "@react-three/drei";

export const MODEL_URL = "/models/iphone-17-pro.glb";

function IPhoneModel() {
  const { scene } = useGLTF(MODEL_URL);

  return (
    <Center>
      <primitive object={scene} scale={10.5} />
    </Center>
  );
}

useGLTF.preload(MODEL_URL);

export default IPhoneModel;
