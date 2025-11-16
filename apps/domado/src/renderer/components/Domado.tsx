/* eslint-disable react/no-unknown-property */
import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import particleFire from 'three-particle-fire'


import cupMTL from '../../../assets/3dmodel/coffee_cup.mtl?url'
import cupOBJ from '../../../assets/3dmodel/coffee_cup.obj?url'
import tomatoMTL from '../../../assets/3dmodel/tomato.mtl?url'
import tomatoOBJ from '../../../assets/3dmodel/tomato.obj?url'
import tomatoTexture from '../../../assets/3dmodel/tomato_texture.jpg'
import { getTimeInfo } from '../../components/pomodoro'



particleFire.install({ THREE })

function FireEffect({ parentGroup }: { parentGroup: THREE.Group }) {
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

function CoffeeCupModel() {
  const groupRef = useRef<THREE.Group | null>(null)
  const [isGroupSet, setIsGroupSet] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cupMaterials = useLoader(MTLLoader, cupMTL) as any
  const cupObj = useLoader(OBJLoader, cupOBJ, loader => {
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
      {isGroupSet && groupRef.current && <FireEffect parentGroup={groupRef.current} />}
    </group>
  )
}

function TomatoModel({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tomatoMaterials = useLoader(MTLLoader, tomatoMTL) as any
  const tomatoObj = useLoader(OBJLoader, tomatoOBJ, loader => {
    tomatoMaterials.preload()
    loader.setMaterials(tomatoMaterials)
  }) as THREE.Group

  const texture = useTexture(tomatoTexture)
  // 텍스처를 모델에 적용
  tomatoObj.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      if (mesh.geometry.attributes.uv) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            if (mat && 'map' in mat) {
              ;(mat as THREE.MeshStandardMaterial).map = texture
            }
          })
        } else if (mesh.material && 'map' in mesh.material) {
          ;(mesh.material as THREE.MeshStandardMaterial).map = texture
        }
      }
    }
  })

  tomatoObj.rotation.x = -Math.PI / 2

  // 애니메이션
  useFrame(() => {
    if (groupRef.current && !paused) {
      groupRef.current.rotation.z += 0.01
    }
  })

  return <primitive ref={groupRef} object={tomatoObj} />
}

function CameraSetup({ isRest, remainingTime }: { isRest: boolean; remainingTime: number }) {
  const { camera } = useThree()
  const timeInfo = getTimeInfo(25, 5)

  useEffect(() => {
    if (isRest) {
      camera.position.set(40, 15, 0)
      camera.lookAt(0, 10, 0)
    } else {
      const codinate = 14 + 36 * (remainingTime / timeInfo.POMODORO_SEC)
      camera.position.set(codinate, codinate, 0)
      camera.lookAt(0, 0, 0)
    }
  }, [camera, isRest, remainingTime, timeInfo])

  return null
}

export default function Domado({
  isRest,
  paused,
  remainingTime,
}: {
  isRest: boolean
  paused: boolean
  remainingTime: number
}) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        background: isRest ? 'black' : 'transparent',
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      {isRest ? <CoffeeCupModel /> : <TomatoModel paused={paused} />}
      <CameraSetup isRest={isRest} remainingTime={remainingTime} />
      {paused && !isRest && <OrbitControls />}
    </Canvas>
  )
}
