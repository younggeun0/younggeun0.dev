/* eslint-disable react/no-unknown-property */
import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import particleFire from 'three-particle-fire'

import cupMTL from '../../../assets/3dmodel/coffee_cup.mtl?url'
import cupOBJ from '../../../assets/3dmodel/coffee_cup.obj?url'

// TODO, three-particle-fire 표시안되는 현상 수정
// install을 한 번만 실행하도록 보장 (HMR 시 재실행 방지)
if (typeof window !== 'undefined' && !(window as any).__particleFireInstalled) {
  try {
    particleFire.install({ THREE })
    ;(window as any).__particleFireInstalled = true
  } catch (error) {
    console.warn('Failed to install three-particle-fire:', error)
  }
}

function FireEffect({ parentGroup }: { parentGroup: any }) {
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

export default function CoffeeCupModel() {
  const groupRef = useRef<any>(null)
  const [isGroupSet, setIsGroupSet] = useState(false)
  const cupMaterials = useLoader(MTLLoader, cupMTL) as any
  const cupObj = useLoader(OBJLoader, cupOBJ, (loader) => {
    cupMaterials.preload()
    loader.setMaterials(cupMaterials)
  }) as THREE.Group

  const scale = 12
  cupObj.scale.set(scale, scale, scale)
  cupObj.position.set(0, -75, 0)

  useEffect(() => {
    if (groupRef.current) {
      setIsGroupSet(true)
    }
  }, [groupRef])

  return (
    <group ref={groupRef}>
      <primitive object={cupObj} />
      {isGroupSet && <FireEffect parentGroup={groupRef.current} />}
    </group>
  )
}
