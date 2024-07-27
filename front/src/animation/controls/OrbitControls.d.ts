import { Camera, Event, Object3D, Renderer } from "three";

export interface OrbitControlsOptions {
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  enableRotate?: boolean;
  rotateSpeed?: number;
  enablePan?: boolean;
  panSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  target?: THREE.Vector3;
}

export class OrbitControls {
  [x: string]: number;
  constructor(camera: Camera, domElement: HTMLElement);
  enableDamping: boolean;
  dampingFactor: number;
  enableZoom: boolean;
  zoomSpeed: number;
  enableRotate: boolean;
  rotateSpeed: number;
  enablePan: boolean;
  panSpeed: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  target: THREE.Vector3;
  update(): void;
  dispose(): void;
}
