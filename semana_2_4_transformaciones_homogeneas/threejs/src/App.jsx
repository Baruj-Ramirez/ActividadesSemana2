import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function TransformDemo({ invertOrder }) {
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    if (!parentRef.current) return;

    // Resetear transformación
    parentRef.current.matrix.identity();

    const translation = new THREE.Matrix4().makeTranslation(2, 0, 0);
    const rotation = new THREE.Matrix4().makeRotationY(Math.PI / 4);

    const composite = new THREE.Matrix4();

    if (invertOrder) {
      console.log("Orden: Rotación * Traslación");
      composite.multiplyMatrices(rotation, translation);
    } else {
      console.log("Orden: Traslación * Rotación");
      composite.multiplyMatrices(translation, rotation);
    }

    parentRef.current.matrixAutoUpdate = false;
    parentRef.current.applyMatrix4(composite);

    console.log("Matriz LOCAL del padre:");
    console.table(parentRef.current.matrix.elements);

  }, [invertOrder]);

  useFrame(() => {
    if (childRef.current) {
      childRef.current.rotation.y += 0.02;
      childRef.current.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Ejes globales */}
      <axesHelper args={[5]} />

      <mesh ref={parentRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />

        {/* Ejes locales del padre */}
        <axesHelper args={[2]} />

        <mesh ref={childRef} position={[2, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </mesh>
    </>
  );
}

export default function App() {
  const [invertOrder, setInvertOrder] = useState(false);

  return (
    <>
      {/* BOTÓN FUERA DEL CANVAS */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}>
        <button onClick={() => setInvertOrder(!invertOrder)}>
          Cambiar orden de multiplicación
        </button>
      </div>

      <Canvas
        camera={{ position: [6, 4, 6] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TransformDemo invertOrder={invertOrder} />
        <OrbitControls />
      </Canvas>
    </>
  );
}