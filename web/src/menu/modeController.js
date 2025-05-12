// Fungsi ini mengatur mode interaksi: voice click vs wake word ("lia")
// Parameter:
// - onVoiceClick: fungsi yang dipanggil saat tombol voice diklik
// - onWakeWordStart: fungsi yang dipanggil saat wake word terdengar
export function setupModeController(onVoiceClick, onWakeWordStart) {
  const voiceBox = document.getElementById("voiceBox");
  const voiceBtn = document.getElementById("voiceBtn");
  const modeInputs = document.querySelectorAll('input[name="mode"]');

  let mode = "voice"; // Default mode
  let wakeWordListener = null;
  let speechRecognizer = null;

  function switchMode(selected) {
    mode = selected;

    if (mode === "voice") {
      voiceBox.style.display = "block";
      stopWakeWordListener();
    } else {
      voiceBox.style.display = "none";
      startWakeWordListener();
    }
  }

  function stopWakeWordListener() {
    if (wakeWordListener) {
      wakeWordListener.stop();
      wakeWordListener = null;
    }
  }

  function startWakeWordListener() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported");
      return;
    }

    if (wakeWordListener) {
      try {
        wakeWordListener.abort();
      } catch (e) {}
      wakeWordListener = null;
    }

    const recognizer = new SpeechRecognition();
    recognizer.continuous = true;
    recognizer.lang = "id-ID";

    recognizer.onresult = async (event) => {
      const text = event.results[event.resultIndex][0].transcript
        .toLowerCase()
        .trim();
      console.log("🎧 Wake listener heard:", text);

      if (text.includes("lia")) {
        // Ambil kata setelah 'lia' (contoh: "lia apa itu ai?" → "apa itu ai?")
        const afterLia = text.split("lia").pop().trim();
        console.log("🔍 Parsed question:", afterLia);

        if (afterLia.length > 0 && typeof onWakeWordStart === "function") {
          recognizer.abort(); // matikan listener agar tidak conflict
          await onWakeWordStart(afterLia);
          setTimeout(() => recognizer.start(), 4000); // restart lagi setelah delay
        }
      }
    };

    recognizer.onerror = (e) => {
      if (e.error !== "aborted") {
        console.error("Wake word error:", e);
      }
    };

    recognizer.start();
    wakeWordListener = recognizer;
  }

  function startVoiceRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser tidak mendukung SpeechRecognition");
      return;
    }

    if (speechRecognizer) {
      try {
        speechRecognizer.abort();
      } catch (e) {}
      speechRecognizer = null;
    }

    const recognizer = new SpeechRecognition();
    recognizer.lang = "id-ID";
    recognizer.interimResults = false;
    recognizer.continuous = false;

    recognizer.onstart = () => {
      console.log("🎤 Mulai mendengarkan...");
      voiceBtn.textContent = "Listening...";
      voiceBtn.disabled = true;
    };

    recognizer.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      console.log("🗣️ Dengar:", spoken);
      if (typeof onVoiceClick === "function") onVoiceClick(spoken);
    };

    recognizer.onend = () => {
      voiceBtn.textContent = "Talk";
      voiceBtn.disabled = false;
    };

    recognizer.onerror = (e) => {
      console.error("❌ Voice Recognition Error:", e);
      voiceBtn.textContent = "Talk";
      voiceBtn.disabled = false;
    };

    recognizer.start();
    speechRecognizer = recognizer;
  }

  modeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      switchMode(input.value);
      console.log("✅ Mode switched to:", input.value);
    });
  });

  voiceBtn.addEventListener("click", () => {
    if (mode === "voice") {
      startVoiceRecognition();
    }
  });

  switchMode(mode);
}
