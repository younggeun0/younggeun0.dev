/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo } from 'react'

import CameraSetup from './CameraSetup'
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
  return (
    <Canvas
      style={{ position: 'absolute', width: '100vw', height: '100vh', background: isRest ? 'black' : 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      {isRest ? <CoffeeCupModel /> : <TomatoModel paused={paused} />}

      <CameraSetup isRest={isRest} />

      <OrbitControls />
    </Canvas>
  )
}

export default memo(Domado3DScene, (prevProps: Domado3DSceneProps, nextProps: Domado3DSceneProps) => {
  return (
    prevProps.isRest === nextProps.isRest &&
    prevProps.paused === nextProps.paused
  )
})

