/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import CameraSetup from './CameraSetup'
import CoffeeCupModel from './CoffeeCupModel'
import TomatoModel from './TomatoModel'

export default function Domado3DScene({
  isRest,
  paused,
  remainingTime,
  pomodoroMinutes,
}: {
  isRest: boolean
  paused: boolean
  remainingTime: number
  pomodoroMinutes: number
}) {
  return (
    <Canvas
      style={{ position: 'absolute', width: '100vw', height: '100vh', background: isRest ? 'black' : 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      {isRest ? <CoffeeCupModel /> : <TomatoModel paused={paused} />}

      <CameraSetup isRest={isRest} remainingTime={remainingTime} pomodoroMinutes={pomodoroMinutes} />

      {paused && !isRest && <OrbitControls />}
    </Canvas>
  )
}

