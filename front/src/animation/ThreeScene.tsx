import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Water } from "./objects/Water";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

interface ThreeSceneProps {
  textData: { content: string }[];
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ textData }) => {
  useEffect(() => {}, [textData]);
  console.log("textData", textData);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container: HTMLDivElement;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let water: Water;
    let clock: THREE.Clock;
    let delta: number;
    let texts: THREE.Mesh[] = [];
    const fontLoader = new FontLoader();
    let font: Font;

    type Wave = {
      direction: number;
      steepness: number;
      wavelength: number;
    };

    const waves: { [key: string]: Wave } = {
      A: { direction: 0, steepness: 0.4, wavelength: 60 },
      B: { direction: 30, steepness: 0.4, wavelength: 30 },
      C: { direction: 60, steepness: 0.4, wavelength: 15 },
    };

    function getWaveInfo(x: number, z: number, time: number) {
      const pos = new THREE.Vector3();
      const tangent = new THREE.Vector3(1, 0, 0);
      const binormal = new THREE.Vector3(0, 0, 1);

      Object.keys(waves).forEach((waveKey) => {
        const w = waves[waveKey];
        const k = (Math.PI * 2) / w.wavelength;
        const c = Math.sqrt(9.8 / k);
        const d = new THREE.Vector2(
          Math.sin((w.direction * Math.PI) / 180),
          -Math.cos((w.direction * Math.PI) / 180),
        );
        const f = k * (d.dot(new THREE.Vector2(x, z)) - c * time);
        const a = w.steepness / k;

        pos.x += d.y * (a * Math.cos(f));
        pos.y += a * Math.sin(f);
        pos.z += d.x * (a * Math.cos(f));

        tangent.x += -d.x * d.x * (w.steepness * Math.sin(f));
        tangent.y += d.x * (w.steepness * Math.cos(f));
        tangent.z += -d.x * d.y * (w.steepness * Math.sin(f));

        binormal.x += -d.x * d.y * (w.steepness * Math.sin(f));
        binormal.y += d.y * (w.steepness * Math.cos(f));
        binormal.z += -d.y * d.y * (w.steepness * Math.sin(f));
      });

      const normal = binormal.cross(tangent).normalize();

      return { position: pos, normal: normal };
    }

    function updateTexts(delta: number) {
      const t = water.material.uniforms["time"].value;
      texts.forEach((b) => {
        const waveInfo = getWaveInfo(b.position.x, b.position.z, t);
        b.position.y = waveInfo.position.y;
        const quat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            waveInfo.normal.x,
            waveInfo.normal.y,
            waveInfo.normal.z,
          ),
        );
        b.quaternion.rotateTowards(quat, delta * 0.5);
      });
    }

    init();

    function init() {
      container = containerRef.current!;
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        29,
        window.innerWidth / window.innerHeight,
        1,
        20000,
      );
      camera.position.set(30, 30, 100);

      fontLoader.load("Potta One_Regular.json", (loadedFont) => {
        font = loadedFont;

        textData.forEach((data) => {
          const textGeometry = new TextGeometry(data.content, {
            font: font,
            size: 3,
            height: 1,
            curveSegments: 12,
            bevelEnabled: false,
          });

          const randomColor = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random(),
          );
          const textMaterial = new THREE.MeshStandardMaterial({
            roughness: 0,
            color: randomColor,
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(
            Math.random() * 100 - 100,
            0,
            Math.random() * 200 - 100,
          );

          scene.add(textMesh);
          texts.push(textMesh);
        });
      });

      const waterGeometry = new THREE.PlaneGeometry(2048, 2048, 512, 512);

      water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/waternormals.jpg",
          function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          },
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
      });
      water.rotation.x = -Math.PI / 2;

      water.material.onBeforeCompile = function (shader) {
        shader.uniforms.waveA = {
          value: [
            Math.sin((waves.A.direction * Math.PI) / 180),
            Math.cos((waves.A.direction * Math.PI) / 180),
            waves.A.steepness,
            waves.A.wavelength,
          ],
        };
        shader.uniforms.waveB = {
          value: [
            Math.sin((waves.B.direction * Math.PI) / 180),
            Math.cos((waves.B.direction * Math.PI) / 180),
            waves.B.steepness,
            waves.B.wavelength,
          ],
        };
        shader.uniforms.waveC = {
          value: [
            Math.sin((waves.C.direction * Math.PI) / 180),
            Math.cos((waves.C.direction * Math.PI) / 180),
            waves.C.steepness,
            waves.C.wavelength,
          ],
        };
        shader.vertexShader =
          document.getElementById("vertexShader")!.textContent!;
        shader.fragmentShader =
          document.getElementById("fragmentShader")!.textContent!;
      };

      scene.add(water);

      const envTexture = new THREE.CubeTextureLoader().load([
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/px.jpg",
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/nx.jpg",
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/py.jpg",
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/ny.jpg",
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/pz.jpg",
        "https://raw.githubusercontent.com/Sean-Bradley/three.js/gerstner-waves/examples/textures/cube/skyboxsun25deg/nz.jpg",
      ]);

      scene.background = envTexture;
      scene.environment = envTexture;

      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI * 0.495;
      controls.target.set(0, 10, 0);
      controls.minDistance = 40;
      controls.maxDistance = 200;

      window.addEventListener("resize", onWindowResize);

      clock = new THREE.Clock();

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
        water.material.uniforms["time"].value += 1.0 / 60.0;
        delta = clock.getDelta();
        updateTexts(delta);
        renderer.render(scene, camera);
      }

      animate();
    }
  }, [textData]);

  return <div ref={containerRef} />;
};

export default ThreeScene;
