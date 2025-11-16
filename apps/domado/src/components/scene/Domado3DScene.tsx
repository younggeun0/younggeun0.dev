/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo, Suspense, useState } from 'react'

// import CameraDevTools from './CameraDevTools'
import CameraSetup, { type CameraConfig } from './CameraSetup'
import CoffeeCupModel from './CoffeeCupModel'
import TomatoModel from './TomatoModel'

interface Domado3DSceneProps {
  isRest: boolean
  paused: boolean
}

function Domado3DScene({
  isRest,
  paused,
}: Domado3DSceneProps) {
  const [cameraConfig, _setCameraConfig] = useState<CameraConfig | undefined>(undefined)

  // const handleConfigChange = (modeIsRest: boolean, config: CameraConfig) => {
  //   if (modeIsRest === isRest) {
  //     setCameraConfig(config)
  //   }
  // }

  return (
    <>
      <Canvas
        key={`canvas-${isRest ? 'rest' : 'work'}`}
        style={{ position: 'absolute', width: '100vw', height: '100vh', background: isRest ? 'black' : 'transparent' }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        onCreated={({ gl }) => {
          // WebGL 컨텍스트 손실 감지 및 복구
          const canvas = gl.domElement
          canvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault()
            console.warn('WebGL context lost')
          })
          canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored')
            // 필요시 씬 재로드
            window.location.reload()
          })
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />

          {isRest ? <CoffeeCupModel /> : <TomatoModel paused={paused} />}

          <CameraSetup isRest={isRest} config={cameraConfig} />

          <OrbitControls />
        </Suspense>
      </Canvas>
      {/* <CameraDevTools isRest={isRest} onConfigChange={handleConfigChange} /> */}
    </>
  )
}

export default memo(Domado3DScene, (prevProps: Domado3DSceneProps, nextProps: Domado3DSceneProps) => {
  return (
    prevProps.isRest === nextProps.isRest &&
    prevProps.paused === nextProps.paused
  )
})

