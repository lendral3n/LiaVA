# LiaVA – Virtual Assistant dengan GPT & VRM

LiaVA adalah proyek asisten virtual berbasis AI yang menggabungkan teknologi GPT untuk percakapan alami, karakter 3D VRM untuk interaksi visual, serta antarmuka web yang interaktif. Proyek ini dirancang untuk memberikan pengalaman asisten pribadi yang imersif dan responsif.

---

## 🚀 Fitur Utama

- 🎙️ **Interaksi Suara**: Mendukung input suara melalui tombol atau deteksi wake word.
- 🧠 **Percakapan Alami**: Integrasi dengan GPT untuk memahami dan merespons percakapan.
- 👩‍💻 **Karakter VRM**: Representasi visual asisten menggunakan model 3D VRM.
- 🌐 **Antarmuka Web**: UI interaktif untuk berkomunikasi dengan asisten.
- 🔊 **Text-to-Speech (TTS)**: Mengubah teks menjadi suara untuk respons asisten.

---

## 🗂️ Struktur Proyek

```
LiaVA/
├── backend/          # Server backend (API GPT, STT, TTS)
├── character/        # Model karakter VRM dan aset terkait
├── docs/             # Dokumentasi proyek
├── unity/            # Proyek Unity untuk karakter VRM
├── web/              # Antarmuka web (React.js)
├── .gitignore
└── README.md
```

---

## ⚙️ Teknologi yang Digunakan

- **Backend**: Python (FastAPI), OpenAI GPT, Whisper (STT), ElevenLabs (TTS)
- **Frontend**: React.js, Three.js, VRM Loader
- **Karakter**: Model VRM, Unity
- **Lainnya**: WebSocket untuk komunikasi real-time, REST API

---

## 🛠️ Cara Menjalankan Proyek

### 1. Clone Repositori

```bash
git clone https://github.com/lendral3n/LiaVA.git
cd LiaVA
```

### 2. Menjalankan Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Untuk Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Menjalankan Frontend

```bash
cd web
npm install
npm start
```

### 4. Menjalankan Karakter VRM

- Buka proyek Unity di folder `unity/`.
- Pastikan semua dependensi telah diimpor.
- Jalankan scene utama untuk melihat karakter VRM.

---

## 🔧 Konfigurasi

- **API Keys**: Simpan kunci API (OpenAI, ElevenLabs) di file `.env` di folder `backend/`.
- **Model VRM**: Tempatkan file `.vrm` di folder `character/`.

---

## 📄 Dokumentasi

Dokumentasi lengkap tersedia di folder `docs/`. Termasuk:

- Arsitektur sistem
- Alur data
- Panduan pengembangan

---

## 📌 Catatan

- Proyek ini masih dalam tahap pengembangan aktif.
- Kontribusi sangat dihargai! Silakan buat issue atau pull request.

---

## 📃 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 🙌 Kontribusi

Terima kasih kepada semua kontributor yang telah membantu dalam pengembangan LiaVA.

---

## 📬 Kontak

Untuk pertanyaan atau saran, silakan hubungi:

- **Nama**: Lendra Syaputra
- **Email**: [email@example.com](mailto:l3nteam@gmail.com)
- **GitHub**: [@lendral3n](https://github.com/lendral3n)
