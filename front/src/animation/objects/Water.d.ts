import { Texture, Vector3, PlaneGeometry, MeshStandardMaterial, Mesh } from "three";

export interface WaterOptions {
  textureWidth: number;
  textureHeight: number;
  waterNormals: Texture;
  alpha?: number;
  sunDirection: Vector3;
  sunColor: number;
  waterColor: number;
  distortionScale: number;
  fog: boolean;
}

export class Water extends Mesh {
  constructor(geometry: PlaneGeometry, options: WaterOptions);
  material: MeshStandardMaterial & { uniforms: { [key: string]: any } };
}
