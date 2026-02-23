import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'

export function CameraInfo() {
  const { camera } = useThree()
  const [info, setInfo] = useState({})

  useFrame(() => {
    if (camera.isPerspectiveCamera) {
      setInfo({
        type: 'Perspective',
        fov: camera.fov.toFixed(2),
        aspect: camera.aspect.toFixed(2),
        near: camera.near,
        far: camera.far
      })
    } else {
      setInfo({
        type: 'Orthographic',
        left: camera.left.toFixed(2),
        right: camera.right.toFixed(2),
        top: camera.top.toFixed(2),
        bottom: camera.bottom.toFixed(2),
        near: camera.near,
        far: camera.far
      })
    }
  })

  return (
    <Html fullscreen>
      <div style={style}>
        <div>Camera: {info.type}</div>

        {camera.isPerspectiveCamera ? (
          <>
            <div>fov: {info.fov}</div>
            <div>aspect: {info.aspect}</div>
            <div>near: {info.near}</div>
            <div>far: {info.far}</div>
          </>
        ) : (
          <>
            <div>left: {info.left}</div>
            <div>right: {info.right}</div>
            <div>top: {info.top}</div>
            <div>bottom: {info.bottom}</div>
            <div>near: {info.near}</div>
            <div>far: {info.far}</div>
          </>
        )}
      </div>
    </Html>
  )
}

const style = {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: 10,
  background: 'rgba(0,0,0,0.7)',
  color: 'white',
  fontFamily: 'monospace',
  fontSize: 12
}
