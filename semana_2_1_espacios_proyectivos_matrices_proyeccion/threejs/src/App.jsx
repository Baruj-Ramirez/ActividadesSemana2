import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "./Scene";

export default function App() {
  const [cameraType, setCameraType] = useState("perspective");

  return (
    <>
      <div style={{ position: "absolute", zIndex: 10, padding: 10 }}>
        <button onClick={() => setCameraType("perspective")}>
          Perspective Camera
        </button>

        <button onClick={() => setCameraType("orthographic")}>
          Orthographic Camera
        </button>
      </div>

      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Scene cameraType={cameraType} />
      </Canvas>
    </>
  );
}