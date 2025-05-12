export async function listenOnce(lang = "id-ID") {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return reject("SpeechRecognition not supported");

    const recognizer = new SpeechRecognition();
    recognizer.lang = lang;
    recognizer.interimResults = false;
    recognizer.continuous = false;

    recognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🗣️ Dengar:", transcript);
      resolve(transcript);
    };

    recognizer.onerror = (e) => reject(e.error);
    recognizer.start();
  });
}
