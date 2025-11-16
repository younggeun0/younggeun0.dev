import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

interface CameraSetupProps {
  isRest: boolean
}

export default function CameraSetup({ isRest }: CameraSetupProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (isRest) {
      camera.position.set(40, 15, 0)
      camera.lookAt(0, 10, 0)
    } else {
      camera.position.set(36, 36, 0)
      camera.lookAt(0, 0, 0)
    }
  }, [camera, isRest])

  return null
}

