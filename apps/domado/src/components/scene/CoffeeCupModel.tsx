/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import FireEffect from './effects/FireEffect'

import cupMTL from '../../../assets/3dmodel/coffee_cup.mtl?url'
import cupOBJ from '../../../assets/3dmodel/coffee_cup.obj?url'

export default function CoffeeCupModel() {
  const groupRef = useRef<THREE.Group | null>(null)
  const [isGroupSet, setIsGroupSet] = useState(false)
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

