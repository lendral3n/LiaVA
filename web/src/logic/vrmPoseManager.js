import * as THREE from "three";

const clock = new THREE.Clock();

function bone(vrm, name) {
  return vrm?.humanoid?.getNormalizedBoneNode(name);
}

let isTalking = false; // <-- Global flag to indicate AI is speaking

export function runFacialExpressionLoop(vrm) {
  const em = vrm.expressionManager;
  if (!em || typeof em.setValue !== "function") return;

  const expressions = {
    blink: { next: 0, interval: () => 2.5 + Math.random() * 2.5 },
    happy: { next: 5, duration: 2 },
    sad: { next: 15, duration: 2 },
    angry: { next: 25, duration: 2 },
    lookAround: { next: 8, duration: 2 },
  };

  const resetAllExpressions = () => {
    const keys = [
      "neutral",
      "blink",
      "happy",
      "angry",
      "sad",
      "relaxed",
      "lookUp",
      "lookDown",
      "lookLeft",
      "lookRight",
      "blinkLeft",
      "blinkRight",
    ];
    keys.forEach((k) => em.setValue(k, 0));
  };

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Only run expressions when not talking
    if (!isTalking) {
      if (time > expressions.blink.next) {
        em.setValue("blink", 1);
        em.setValue("blinkLeft", 1);
        em.setValue("blinkRight", 1);
        em.update();
        setTimeout(() => {
          em.setValue("blink", 0);
          em.setValue("blinkLeft", 0);
          em.setValue("blinkRight", 0);
          em.update();
        }, 120);
        expressions.blink.next = time + expressions.blink.interval();
      }

      ["happy", "sad", "angry"].forEach((exp) => {
        if (time > expressions[exp].next) {
          resetAllExpressions();
          em.setValue(exp, 1);
          em.update();
          expressions[exp].next = time + 15;
          setTimeout(() => {
            em.setValue(exp, 0);
            em.update();
          }, expressions[exp].duration * 1000);
        }
      });

      if (time > expressions.lookAround.next) {
        const dir = ["lookUp", "lookDown", "lookLeft", "lookRight"][
          Math.floor(Math.random() * 4)
        ];
        em.setValue(dir, 1);
        em.update();
        setTimeout(() => {
          em.setValue(dir, 0);
          em.update();
        }, expressions.lookAround.duration * 1000);
        expressions.lookAround.next = time + 7;
      }
    }
  }

  animate();
}

export function animateIdleBones(vrm) {
  const head = bone(vrm, "head");
  const neck = bone(vrm, "neck");
  const chest = bone(vrm, "chest");
  const spine = bone(vrm, "spine");

  function idleMotion() {
    requestAnimationFrame(idleMotion);
    const t = clock.getElapsedTime();

    if (head) {
      head.rotation.set(
        Math.sin(t * 0.8) * 0.03,
        Math.sin(t * 1.5) * 0.04,
        Math.sin(t * 0.5) * 0.02
      );
      head.updateMatrixWorld(true);
    }

    if (neck) {
      neck.rotation.x = Math.sin(t * 0.6) * 0.02;
      neck.rotation.y = Math.sin(t * 0.8) * 0.01;
      neck.updateMatrixWorld(true);
    }

    if (chest) {
      chest.rotation.z = Math.sin(t * 0.3) * 0.02;
      chest.updateMatrixWorld(true);
    }

    if (spine) {
      spine.rotation.x = Math.sin(t * 0.3) * 0.01;
      spine.updateMatrixWorld(true);
    }

    vrm.scene.updateMatrixWorld(true);

    if (vrm.update) {
      const deltaTime = clock.getDelta();
      vrm.update(deltaTime);
    }
  }

  idleMotion();
}
