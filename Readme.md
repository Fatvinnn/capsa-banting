# CapSa Banting (Single-Only, 2 Pemain, Web Version)

Permainan **CapSa Banting** (Big Two) versi web sederhana, mode 2 pemain: **User vs AI**.  
Proyek ini dibuat untuk dimainkan sendiri secara online di browser dengan tampilan meja kartu modern dan responsif.

---

## 🎮 Fitur Utama

- **Mode 2 Pemain:** User vs AI.
- **Kartu Dibagikan:** Masing-masing 13 kartu, total 26 kartu di game (sisanya tidak dipakai).
- **Aturan Single Only:** Hanya boleh keluar satu kartu per giliran.
- **Tombol Pass:** Bisa pass jika tidak bisa/ingin main kartu. Setelah pass, meja direset dan giliran lawan.
- **AI Otomatis:** AI memilih kartu terkecil yang mungkin, dengan jeda berpikir.
- **Info Giliran & Log:** Informasi giliran, aksi, dan pemenang tampil jelas.
- **Tampilan Modern:** Layout meja kartu dengan nuansa hijau, kartu rounded, dan responsif di mobile.
- **Restart Game:** Tombol "Main Lagi" setelah selesai.

---

## 📦 Cara Menjalankan

1. **Clone/Download repo ini**  
2. **Buka file `index.html` di browser**  
   Tidak perlu server, cukup klik dua kali di file.

---

## 🖥️ Struktur Proyek

```
capsa-banting/
│
├── index.html      # Struktur halaman dan area permainan
├── style.css       # Tampilan modern (meja hijau, kartu, dll)
├── script.js       # Logika game, AI, render kartu & aksi
└── README.md       # Dokumentasi (file ini)
```

---

## 📋 Aturan Permainan

- User dan AI masing-masing dapat 13 kartu acak.
- Setiap giliran, pemain boleh main **1 kartu** yang lebih tinggi dari kartu di meja, atau **Pass**.
- Jika pass, meja direset dan giliran langsung berpindah.
- Siapa habis kartu duluan, menang.

---

## 🛠️ Pengembangan & Kustomisasi

- **Ubah style:** Edit `style.css` untuk warna, font, efek kartu, dsb.
- **Ubah AI:** Script AI ada di `script.js` pada fungsi `aiTurn()`.
- **Tambah fitur:** Bisa dikembangkan ke mode multiplayer, kombinasi kartu, leaderboard, dsb.

---

## 📸 Preview

![preview](https://user-images.githubusercontent.com/your-preview-image-link.png)
*(Ganti dengan screenshot jika ada)*

---

## ✨ Credits

- Dibuat oleh [Fatvinnn](https://github.com/Fatvinnn)
- Inspirasi: Big Two / CapSa Banting klasik

---

## 📄 License

MIT License.  
Silakan digunakan, dipelajari, dan dikembangkan!
