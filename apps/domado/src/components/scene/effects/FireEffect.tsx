import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import particleFire from 'three-particle-fire'

particleFire.install({ THREE })

interface FireEffectProps {
  parentGroup: THREE.Group
}

export default function FireEffect({ parentGroup }: FireEffectProps) {
  const { camera, clock } = useThree()
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    console.log('set fire ')
    const fireRadius = 2
    const fireHeight = 15
    const particleCount = 500
    const height = window.innerHeight
    const geometry0 = new particleFire.Geometry(fireRadius, fireHeight, particleCount)
    const material0 = new particleFire.Material({
      color: '#FF4F30',
    })
    material0.setPerspective(camera, height)
    const particleFireMesh0 = new THREE.Points(geometry0, material0)
    particleFireMesh0.position.set(2.5, 2, -0.2)
    parentGroup.add(particleFireMesh0)

    function update() {
      const delta = clock.getDelta()
      animationFrameId.current = requestAnimationFrame(update)
      particleFireMesh0.material.update(delta)
    }
    update()

    return () => {
      parentGroup.remove(particleFireMesh0)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      geometry0.dispose()
      material0.dispose()
    }
  }, [camera, clock, parentGroup])

  return null
}

