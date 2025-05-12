import * as THREE from "three";

// Fungsi untuk memutar audio dengan lip sync menggunakan THREE.js
export async function playAudioWithLipSync(audioBlob, vrm) {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  // Menggunakan audio Blob yang diterima
  const audioUrl = URL.createObjectURL(audioBlob); // Membuat URL dari Blob
  audioLoader.load(
    audioUrl, // Gunakan URL yang dibentuk dari Blob
    (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(1.0);
      audio.play();

      const analyser = new THREE.AudioAnalyser(audio, 32);

      const mouthKeys = ["aa", "ee", "ih", "oh", "ou"];
      const expressionManager = vrm.expressionManager;

      if (!expressionManager || !expressionManager.setValue) {
        console.warn("No expressionManager found on this VRM model.");
        return;
      }

      let previousValue = 0;

      const interval = setInterval(() => {
        if (!audio.isPlaying) {
          mouthKeys.forEach((k) => expressionManager.setValue(k, 0));
          expressionManager.update();
          clearInterval(interval);
          return;
        }

        // Ambil frekuensi audio rata-rata
        let raw = analyser.getAverageFrequency() / 256;

        // Terapkan smoothing (low-pass filter)
        const smoothValue = previousValue * 0.8 + raw * 0.2;
        previousValue = smoothValue;

        // Threshold: agar tidak selalu buka mulut karena noise
        const finalValue = smoothValue > 0.08 ? smoothValue : 0;

        // Set ekspresi "aa" sebagai default mulut
        mouthKeys.forEach((k) => expressionManager.setValue(k, 0));
        expressionManager.setValue("aa", finalValue);
        expressionManager.update();
      }, 33); // Interval 33ms (30FPS)
    },
    undefined,
    (err) => {
      console.error("Error loading audio data:", err);
    }
  );
}
