/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import tomatoMTL from '../../../assets/3dmodel/tomato.mtl?url'
import tomatoOBJ from '../../../assets/3dmodel/tomato.obj?url'
import tomatoTexture from '../../../assets/3dmodel/tomato_texture.jpg'

interface TomatoModelProps {
  paused: boolean
}

export default function TomatoModel({ paused }: TomatoModelProps) {
  const groupRef = useRef<THREE.Group | null>(null)

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
      if (mesh.geometry && mesh.geometry.attributes.uv && mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial
        if (material) {
          material.map = texture
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

