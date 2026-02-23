import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useState } from 'react'

export function ProjectionExample() {
  const { camera, size } = useThree()
  const worldPos = new THREE.Vector3(2, 1, -5)
  const [screen, setScreen] = useState({ x: 0, y: 0 })

  useFrame(() => {
    const projected = worldPos.clone().project(camera)

    const x = (projected.x * 0.5 + 0.5) * size.width
    const y = (-projected.y * 0.5 + 0.5) * size.height

    setScreen({
      x: x.toFixed(1),
      y: y.toFixed(1)
    })
  })

  return (
    <Html fullscreen>
      <div style={style}>
        <div>World position: (2, 1, -5)</div>
        <div>Screen position: ({screen.x}, {screen.y})</div>
      </div>
    </Html>
  )
}

const style = {
  position: 'absolute',
  bottom: 10,
  left: 10,
  padding: 10,
  background: 'rgba(0,0,0,0.7)',
  color: 'white',
  fontFamily: 'monospace',
  fontSize: 12
}
