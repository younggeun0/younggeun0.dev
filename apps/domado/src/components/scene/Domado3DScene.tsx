/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo, Suspense, useState } from 'react'

// import CameraDevTools from './CameraDevTools'
// import FireDevTools from './FireDevTools'
import CameraSetup, { type CameraConfig } from './CameraSetup'
import CoffeeCupModel, { DEFAULT_FIRE_POSITION, type FirePosition } from './CoffeeCupModel'
import TomatoModel from './TomatoModel'

interface Domado3DSceneProps {
  isRest: boolean
  paused: boolean
}

function Domado3DScene({ isRest, paused }: Domado3DSceneProps) {
  const [cameraConfig, _setCameraConfig] = useState<CameraConfig | undefined>(undefined)
  const [firePosition, _setFirePosition] = useState<FirePosition>(DEFAULT_FIRE_POSITION)

  // const handleConfigChange = (modeIsRest: boolean, config: CameraConfig) => {
  //   if (modeIsRest === isRest) {
  //     setCameraConfig(config)
  //   }
  // }

  return (
    <>
      <Canvas
        style={{ position: 'absolute', width: '100vw', height: '100vh', background: isRest ? 'black' : 'transparent' }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        onCreated={({ gl }) => {
          // WebGL 컨텍스트 손실 감지 및 복구 (실제 예기치 않은 손실만 감지)
          const canvas = gl.domElement

          const handleContextLost = (event: Event) => {
            event.preventDefault()
            // Canvas가 DOM에 연결되어 있는 경우에만 경고 (정상적인 언마운트는 무시)
            if (canvas.isConnected) {
              console.warn('WebGL context lost unexpectedly')
            }
          }

          const handleContextRestored = () => {
            console.log('WebGL context restored')
            // 필요시 씬 재로드
            window.location.reload()
          }

          canvas.addEventListener('webglcontextlost', handleContextLost)
          canvas.addEventListener('webglcontextrestored', handleContextRestored)

          // cleanup 함수 반환하여 이벤트 리스너 정리
          return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost)
            canvas.removeEventListener('webglcontextrestored', handleContextRestored)
          }
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />

          {isRest ? <CoffeeCupModel firePosition={firePosition} /> : <TomatoModel paused={paused} />}

          <CameraSetup isRest={isRest} config={cameraConfig} />

          <OrbitControls />
        </Suspense>
      </Canvas>
      {/* {isRest && <FireDevTools position={firePosition} onPositionChange={setFirePosition} />} */}
      {/* <CameraDevTools isRest={isRest} onConfigChange={handleConfigChange} /> */}
    </>
  )
}

export default memo(Domado3DScene, (prevProps: Domado3DSceneProps, nextProps: Domado3DSceneProps) => {
  return prevProps.isRest === nextProps.isRest && prevProps.paused === nextProps.paused
})
