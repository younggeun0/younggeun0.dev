import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export interface CameraConfig {
  position: [number, number, number]
  lookAt: [number, number, number]
}

interface CameraSetupProps {
  isRest: boolean
  config?: CameraConfig
}

export const DEFAULT_WORK_CONFIG: CameraConfig = {
  position: [36, 20, -26],
  lookAt: [0, 0, 0],
}

export const DEFAULT_REST_CONFIG: CameraConfig = {
  position: [50, 20, 5],
  lookAt: [0, 0, 0],
}

export default function CameraSetup({ isRest, config }: CameraSetupProps) {
  const { camera } = useThree()

  useEffect(() => {
    const cameraConfig = config || (isRest ? DEFAULT_REST_CONFIG : DEFAULT_WORK_CONFIG)
    camera.position.set(...cameraConfig.position)
    camera.lookAt(...cameraConfig.lookAt)
  }, [camera, isRest, config])

  return null
}

