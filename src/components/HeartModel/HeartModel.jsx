 import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  Float,
  useGLTF,
} from '@react-three/drei'
import { useRef, useState } from 'react'

import './HeartModel.css'

function HeartAsset() {
  const { scene } = useGLTF('/src/assets/heart.glb')

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.12}
      floatIntensity={0.2}
    >
      <primitive
        object={scene}
        scale={2.4}
        position={[0, -0.6, 0]}
      />
    </Float>
  )
}

useGLTF.preload('/src/assets/heart.glb')

function HeartModel() {
  const controlsRef = useRef()
  const [autoRotate, setAutoRotate] = useState(true)

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="heart-model">

      <div className="model-overlay">

        <div className="model-buttons">

          <button
            className={`rotate-button ${
              autoRotate ? 'rotate-active' : ''
            }`}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
          </button>

          <button
            className="rotate-button"
            onClick={resetView}
          >
            Reset View
          </button>

        </div>

      </div>

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
      >

        <ambientLight intensity={1.5} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={3}
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={2}
        />

        <HeartAsset />

        <Environment preset="studio" />

        <OrbitControls
          ref={controlsRef}
          enableZoom
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
          minDistance={3}
          maxDistance={7}
        />

      </Canvas>

      <div className="model-controls-hint">
        <span>DRAG</span> Rotate
        <span>SCROLL</span> Zoom
      </div>

    </div>
  )
}

export default HeartModel