import { OrbitControls } from "@react-three/drei";
import Cameras from "./Cameras";
import Objects from "./Objects";

export default function Scene({ cameraType }) {
  return (
    <>
      {/* Cámaras */}
      <Cameras type={cameraType} />

      {/* Luces */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />

      {/* Objetos */}
      <Objects />

      {/* Controles */}
      <OrbitControls />
    </>
  );
}