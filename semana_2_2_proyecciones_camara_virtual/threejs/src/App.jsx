import { useState } from 'react'
import Scene from './Scene'

export default function App() {
  const [usePerspective, setUsePerspective] = useState(true)
  const [cameraInfo, setCameraInfo] = useState(null)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* UI / HUD */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
          padding: 10,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          fontFamily: 'monospace'
        }}
      >
        <button onClick={() => setUsePerspective(v => !v)}>
          Switch Camera
        </button>

        {cameraInfo && (
          <pre style={{ marginTop: 10 }}>
            {JSON.stringify(cameraInfo, null, 2)}
          </pre>
        )}
      </div>

      {/* Canvas */}
      <Scene
        usePerspective={usePerspective}
        onCameraUpdate={setCameraInfo}
      />
    </div>
  )
}
