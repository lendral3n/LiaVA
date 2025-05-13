export async function askAI(question) {
  const res = await fetch(`${import.meta.env.API_URL}/api/ask`, { {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  // Tangani dua kemungkinan: JSON atau audio langsung
  const contentType = res.headers.get("Content-Type");

  if (contentType.includes("application/json")) {
    const data = await res.json();

    // Ambil audio dari URL, blob-kan
    const audioBlob = await fetch(data.audio).then((res) => res.blob());

    return {
      response: data.response,
      audio: audioBlob,
    };
  } else if (contentType.includes("audio/")) {
    const audioBlob = await res.blob();

    return {
      response: "", // kamu bisa tambahkan transkrip terpisah kalau perlu
      audio: audioBlob,
    };
  } else {
    throw new Error("Unexpected response type from backend");
  }
}
