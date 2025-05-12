import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

export function initScene(canvasId) {
  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.4, 2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.4, 0);
  controls.update();

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(1, 1, 1).normalize();
  scene.add(dirLight);

  return { scene, camera, renderer, controls };
}

export function loadVRMModel(scene, path, onLoaded) {
  const loader = new GLTFLoader();
  loader.register((parser) => new VRMLoaderPlugin(parser));

  loader.load(path, (gltf) => {
    const vrm = gltf.userData.vrm;
    vrm.scene.rotation.y = Math.PI;
    scene.add(vrm.scene);
    onLoaded(vrm);
  });
}

export function focusCameraToFace(vrm, camera) {
  // Posisi kamera diatur manual (misalnya menghadap wajah dari depan agak atas)
  const cameraPos = new THREE.Vector3(0, 1.4, 0.54);
  const lookAtPos = new THREE.Vector3(0, 1.42, 0);
  camera.position.copy(cameraPos);
  camera.lookAt(lookAtPos);
}