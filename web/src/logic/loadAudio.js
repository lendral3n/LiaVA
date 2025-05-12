// Update playAudioWithLipSync: Tambahkan delay sinkronisasi dan improve
// animasi lip movement agar lebih sinkron dan ekspresif
import * as THREE from "three";

export async function playAudioWithLipSync(audioBlob, vrm) {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  const audioUrl = URL.createObjectURL(audioBlob);
  audioLoader.load(
    audioUrl,
    (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(1.0);
      audio.play();

      const analyser = new THREE.AudioAnalyser(audio, 64); // lebih sensitif
      const mouthKeys = ["aa", "ee", "ih", "oh", "ou"];
      const em = vrm.expressionManager;

      if (!em || !em.setValue) {
        console.warn("No expressionManager found on this VRM model.");
        return;
      }

      let prevValue = 0;
      let frameCount = 0;

      const interval = setInterval(() => {
        if (!audio.isPlaying) {
          mouthKeys.forEach((k) => em.setValue(k, 0));
          em.update();
          clearInterval(interval);
          return;
        }

        let raw = analyser.getAverageFrequency() / 256;
        const smooth = prevValue * 0.85 + raw * 0.15;
        prevValue = smooth;

        const finalValue = smooth > 0.06 ? smooth : 0;

        mouthKeys.forEach((k) => em.setValue(k, 0));

        // Bergantian pakai ekspresi
        const key = mouthKeys[frameCount % mouthKeys.length];
        em.setValue(key, finalValue);
        em.update();
        frameCount++;
      }, 33);
    },
    undefined,
    (err) => {
      console.error("Error loading audio data:", err);
    }
  );
}
