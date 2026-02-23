import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  PerspectiveCamera,
  OrthographicCamera,
  OrbitControls
} from '@react-three/drei'
import { useState } from 'react'

/* ---------- Objetos ---------- */
function Objects() {
  return (
    <>
      <mesh position={[0, 0, -2]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[2, 1, -5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      <mesh position={[-2, -1, -8]}>
        <boxGeometry />
        <meshStandardMaterial color="lime" />
      </mesh>

      <mesh position={[-2, 2, -3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blueviolet" />
      </mesh>

      <mesh position={[2, -2, -4]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position={[0, -3, -7]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="snow" />
      </mesh>
    </>
  )
}

/* ---------- Lector de cámara (NO UI) ---------- */
function CameraReader({ onUpdate }) {
  const { camera, size } = useThree()

  useFrame(() => {
    if (camera.isPerspectiveCamera) {
      onUpdate({
        type: 'Perspective',
        fov: camera.fov,
        aspect: camera.aspect,
        near: camera.near,
        far: camera.far
      })
    } else {
      onUpdate({
        type: 'Orthographic',
        left: camera.left,
        right: camera.right,
        top: camera.top,
        bottom: camera.bottom,
        near: camera.near,
        far: camera.far
      })
    }
  })

  return null
}

/* ---------- Scene ---------- */
export default function Scene({ usePerspective, onCameraUpdate }) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}
    >
      {usePerspective ? (
        <PerspectiveCamera
          key="perspective"
          makeDefault
          position={[0, 2, 5]}
          fov={60}
          near={0.1}
          far={100}
        />
      ) : (
        <OrthographicCamera
          key="orthographic"
          makeDefault
          position={[0, 2, 5]}
          zoom={80}
          near={0.1}
          far={100}
        />
      )}

      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      <Objects />

      {/* SOLO lógica, NO UI */}
      <CameraReader onUpdate={onCameraUpdate} />
    </Canvas>
  )
}
