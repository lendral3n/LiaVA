import { initScene, loadVRMModel, focusCameraToFace } from "./logic/vrmLoader";
import { askAI } from "./logic/api";
import { playAudioWithLipSync } from "./logic/loadAudio";
import {
  animateIdleBones,
  runFacialExpressionLoop,
} from "./logic/vrmPoseManager";
import { setupModeController } from "./menu/modeController.js";
import { listenOnce } from "./utils/listenOnce.js";

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

  focusCameraToFace(vrm, camera);
  runFacialExpressionLoop(vrm);
  animateIdleBones(vrm);
  animate();

  // 🔁 Setup mode controller after model is loaded
  setupModeController(
    async (spoken) => {
      const { response, audio } = await askAI(spoken);
      console.log("🎙️ Voice Mode Response:", response);
      playAudioWithLipSync(audio, loadedVrm);
    },
    async (listenOnce) => {
      const { response, audio } = await askAI(listenOnce);
      console.log("👋 Wake Word Response:", response);
      playAudioWithLipSync(audio, loadedVrm);
    }
  );
});
