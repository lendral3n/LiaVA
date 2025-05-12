import { initScene, loadVRMModel, focusCameraToFace } from "./logic/vrmLoader";
import { askAI } from "./logic/api";
import { playAudioWithLipSync } from "./logic/loadAudio";
import {
  applyRelaxedPose,
  startIdleLoop,
  setupAutoBlink,
} from "./logic/vrmPoseManager";

const { scene, camera, renderer } = initScene("viewer");
let loadedVrm = null;

const modelPath = "/model/pochi/PochibyKT_Pochi_VRM_1.0.0.vrm";
console.log("🔍 Loading:", modelPath);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
}

loadVRMModel(scene, modelPath, (vrm) => {
  loadedVrm = vrm;
  scene.add(vrm.scene);

  vrm.humanoid.resetNormalizedPose();

  focusCameraToFace(vrm, camera);
  
  applyRelaxedPose(vrm);
  startIdleLoop(vrm);
  setupAutoBlink(vrm);
  animate();
});

const input = document.getElementById("chatInput");
const button = document.getElementById("sendBtn");

button.addEventListener("click", async () => {
  const question = input.value;
  const { response, audio } = await askAI(question);
  console.log("AI says:", response);
  playAudioWithLipSync(audio, loadedVrm);
});
