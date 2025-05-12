import * as THREE from "three";

const clock = new THREE.Clock();

/**
 * Helper ambil tulang dari humanoid
 * @param {*} vrm
 * @param {*} name
 */
function bone(vrm, name) {
  return vrm?.humanoid?.getNormalizedBoneNode(name);
}

/**
 * Terapkan pose dasar yang lebih natural
 * @param {*} vrm
 */
export function applyRelaxedPose(vrm) {
  if (!vrm?.humanoid) return;

  const set = (name, euler) => {
    const bone = vrm.humanoid.getNormalizedBoneNode(name);
    if (bone) {
      bone.rotation.copy(euler);
      bone.updateMatrixWorld(true);
    }
  };

  set("leftUpperArm", new THREE.Euler(-1.1, 0.15, 0.3));
  set("rightUpperArm", new THREE.Euler(-1.1, -0.15, -0.3));
  set("leftLowerArm", new THREE.Euler(-0.2, 0.1, 0));
  set("rightLowerArm", new THREE.Euler(-0.2, -0.1, 0));
  set("leftHand", new THREE.Euler(0.1, 0.1, 0.1));
  set("rightHand", new THREE.Euler(0.1, -0.1, -0.1));
  set("spine", new THREE.Euler(0.05, 0, 0));
  set("neck", new THREE.Euler(0.02, 0, 0));

  vrm.scene.updateMatrixWorld(true); // penting!
  console.log("✅ Pose berhasil diterapkan (fixed)");
}

/**
 * Idle animasi kecil biar karakter hidup
 * @param {*} vrm
 */
export function startIdleLoop(vrm) {
  let initialized = false;

  function animateIdle() {
    requestAnimationFrame(animateIdle);
    const t = clock.getElapsedTime();

    const sway = Math.sin(t * 1.2) * 0.02;
    const nod = Math.sin(t * 1.5) * 0.015;

    const spine = bone(vrm, "spine");
    const neck = bone(vrm, "neck");
    const lArm = bone(vrm, "leftUpperArm");
    const rArm = bone(vrm, "rightUpperArm");

    if (!initialized) {
      applyRelaxedPose(vrm);
      initialized = true;
    }

    if (spine) spine.quaternion.setFromEuler(new THREE.Euler(sway, 0, 0));
    if (neck) neck.quaternion.setFromEuler(new THREE.Euler(nod, 0, 0));

    if (lArm)
      lArm.quaternion.setFromEuler(
        new THREE.Euler(-1.2, 0.1, 0.3 + Math.sin(t * 0.7) * 0.02)
      );
    if (rArm)
      rArm.quaternion.setFromEuler(
        new THREE.Euler(-1.2, -0.1, -0.3 + Math.sin(t * 0.7) * 0.02)
      );
  }

  animateIdle();
}

/**
 * Simulasi mata berkedip setiap 4 detik
 * @param {*} vrm
 */
export function setupAutoBlink(vrm) {
  const em = vrm.expressionManager;
  if (!em) return;

  let nextBlinkTime = 0;

  function blinkLoop() {
    requestAnimationFrame(blinkLoop);

    const time = clock.getElapsedTime();

    if (time > nextBlinkTime) {
      // Nyalakan semua blink expression
      em.setValue("blink", 1.0);
      em.setValue("blinkLeft", 1.0);
      em.setValue("blinkRight", 1.0);
      em.update();

      // Matikan setelah delay
      setTimeout(() => {
        em.setValue("blink", 0.0);
        em.setValue("blinkLeft", 0.0);
        em.setValue("blinkRight", 0.0);
        em.update();
      }, 120); // durasi kedip

      // Jadwal blink berikutnya
      nextBlinkTime = time + 2.5 + Math.random() * 2.5;
    }
  }

  blinkLoop();
}
