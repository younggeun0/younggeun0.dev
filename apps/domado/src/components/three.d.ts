declare module 'three-particle-fire'

declare module 'three/examples/jsm/loaders/MTLLoader' {
  import { Loader, LoadingManager } from 'three'

  export class MTLLoader extends Loader {
    constructor(manager?: LoadingManager)
    load(url: string, onLoad: (materialCreator: any) => void): void
    parse(text: string): any
    setPath(path: string): MTLLoader
    setMaterialOptions(value: any): MTLLoader
    preload(): void
    setMaterials(materials: any): void
  }
}

declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Group, Loader, LoadingManager } from 'three'

  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager)
    load(url: string, onLoad: (object: Group) => void): void
    parse(data: string): Group
    setMaterials(materials: any): void
    setPath(path: string): OBJLoader
  }
}
