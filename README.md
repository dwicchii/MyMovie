# 🎬 MyMovie - Pendamping Sinema Anda

[![Ionic](https://img.shields.io/badge/Ionic-8.0.0-blue.svg?logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-20.0.0-red.svg?logo=angular&logoColor=white)](https://angular.io/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.3.0-lightgrey.svg?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![API](https://img.shields.io/badge/API-TMDB-green.svg?logo=themoviedb&logoColor=white)](https://www.themoviedb.org/)

**MyMovie** adalah aplikasi mobile hibrida berbasis **Ionic Angular** dan **Capacitor** yang dirancang secara elegan untuk membantu pengguna menjelajahi dunia perfilman. Dengan mengintegrasikan **The Movie Database (TMDB) API**, aplikasi ini menyajikan katalog film, series populer, dan anime secara *real-time* lengkap dengan detail pemain, rekomendasi, dan sistem ulasan pribadi.

---

## ✨ Fitur Utama

### 1. 🏠 Beranda Dinamis (Home Screen)
*   **Hero Slider Auto-Play**: Menampilkan film/series pilihan secara otomatis menggunakan *Swiper.js* modern yang interaktif.
*   **Kategori Terstruktur**: Akses cepat ke kategori **Trending**, **Series Populer**, dan **Anime** langsung dari halaman utama.
*   **Pull-to-Refresh**: Kemudahan memperbarui konten beranda dengan gerakan sapu ke bawah (*swipe down*).

### 2. 🔍 Pencarian Pintar (Multi-Search)
*   Fitur pencarian multi-kueri yang responsif dan cepat untuk menemukan film, acara TV, maupun anime hanya dengan mengetik kata kunci.

### 3. 📄 Detail Sinema Mendalam
*   Informasi komprehensif mulai dari sinopsis dalam **Bahasa Indonesia / English**, rating bintang, tanggal rilis, hingga rekomendasi film serupa.
*   Daftar pemeran (*Credits*) lengkap dengan foto aktor/aktris.

### 4. 👤 Manajemen Profil & Histori Personal
*   **Profil Kustom**: Edit foto profil, nama pengguna, dan bio dengan validasi tangguh (dilengkapi *auto-fallback* default bio).
*   **Statistik Sinema**: Menampilkan jumlah film yang telah ditonton (*Watched*), daftar antrean (*Watchlist*), dan jumlah ulasan (*Reviews*) secara instan.
*   **Sistem Review & Log**: Tulis ulasan pribadi untuk film favorit Anda, baca kembali lewat histori ulasan, atau hapus ulasan lama yang ingin Anda perbarui.
*   **Watchlist & Bookmarks**: Tandai film yang ingin ditonton di kemudian hari atau film terfavorit agar mudah diakses kembali.

### 5. 📱 Optimalisasi Platform Native Android
*   **Splash Screen Premium**: Splash screen kustom yang halus dengan logo aplikasi dan warna tema gelap (*dark theme*) yang serasi.
*   **Double-Tap Back Button**: Penanganan tombol kembali (*hardware back button*) native Android untuk mencegah pengguna keluar aplikasi secara tidak sengaja.
*   **Keamanan & Kecepatan**: Validasi data input profil dan integrasi optimal dengan penyimpanan lokal (*LocalStorage*) perangkat Anda.

---

## 🛠️ Tech Stack & Dependensi

Aplikasi ini dibangun menggunakan kombinasi teknologi modern:

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework UI** | `Ionic Framework (^8.0.0)` | Komponen antarmuka mobile yang responsif & modern |
| **Framework Logika**| `Angular (^20.0.0)` | Pengolahan data, routing, dan arsitektur modular yang kuat |
| **Native Bridge** | `Capacitor (^8.3.0)` | Integrasi fungsionalitas native Android & iOS |
| **Data Provider** | `TMDB API (v3)` | Penyedia metadata film, rating, cast, dan poster resmi |
| **Carousel Slider** | `Swiper (^12.1.3)` | Komponen slider responsif berkinerja tinggi |
| **Penyimpanan** | `LocalStorage` | Penyimpanan lokal untuk data profil, ulasan, & watchlist |

---

## 🚀 Panduan Instalasi & Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal Anda:

### 📋 Persyaratan Sistem
*   **Node.js** (Sangat disarankan versi v18 atau yang lebih baru)
*   **Angular CLI** (`npm install -g @angular/cli`)
*   **Ionic CLI** (`npm install -g @ionic/cli`)
*   **Android Studio** (Jika ingin mem-build aplikasi ke platform Android)

### ⚙️ Cara Menjalankan Project

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/USERNAME_ANDA/MyMovie.git
    cd MyMovie
    ```

2.  **Instalasi Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi API Key TMDB**
    Buka file `src/environments/environment.ts` dan masukkan API Key TMDB Anda sendiri:
    ```typescript
    export const environment = {
      production: false,
      tmdbApiKey: 'API_KEY_TMDB_ANDA_DI_SINI',
      tmdbBaseUrl: 'https://api.themoviedb.org/3'
    };
    ```
    *(Lakukan hal yang sama pada `environment.prod.ts` jika ingin mem-build untuk tahap produksi).*

4.  **Jalankan Server Pengembangan**
    ```bash
    ionic serve
    ```
    Aplikasi akan terbuka secara otomatis di browser Anda di alamat `http://localhost:8100`.

---

## 🤖 Menjalankan di Android (Native Mobile)

Untuk melakukan pengujian atau build aplikasi Android (.APK) menggunakan Capacitor:

1.  **Build Web Assets**
    ```bash
    ionic build
    ```

2.  **Tambahkan Platform Android (Jika belum pernah ditambahkan)**
    ```bash
    ionic cap add android
    ```

3.  **Sinkronisasi Aset & Plugin**
    ```bash
    ionic cap sync
    ```

4.  **Buka Project di Android Studio**
    ```bash
    ionic cap open android
    ```
    Android Studio akan terbuka otomatis. Dari sana, Anda dapat menghubungkan HP Anda (lewat USB Debugging) atau menggunakan emulator, kemudian klik **Run** atau build **APK/Bundle Release**.

---

## 📤 Panduan Upload Project ke GitHub

Bagi Anda yang ingin mengunggah atau memperbarui project ini di repositori GitHub baru, jalankan perintah berikut secara berurutan di terminal Anda:

1.  **Inisialisasi Git (Jika baru pertama kali)**
    ```bash
    git init
    ```

2.  **Tambahkan Semua Perubahan File**
    ```bash
    git add .
    ```

3.  **Lakukan Commit Pertama**
    ```bash
    git commit -m "feat: initial commit - MyMovie App dengan Ionic Angular & TMDB API"
    ```

4.  **Buat Cabang Utama (Main)**
    ```bash
    git branch -M main
    ```

5.  **Hubungkan ke Repositori GitHub Anda**
    *(Ganti URL di bawah dengan tautan repositori GitHub Anda)*
    ```bash
    git remote add origin https://github.com/USERNAME_ANDA/MyMovie.git
    ```

6.  **Unggah (Push) Project ke GitHub**
    ```bash
    git push -u origin main
    ```

Untuk pembaruan selanjutnya di masa mendatang, Anda hanya perlu menjalankan:
```bash
git add .
git commit -m "Penjelasan singkat mengenai perubahan yang Anda lakukan"
git push
```

---

## 📝 Catatan Tambahan
*   Aplikasi ini dikonfigurasi dengan package name `com.ratemymovie.app` pada file `capacitor.config.ts`.
*   Data API bersumber sepenuhnya dari [The Movie Database (TMDB)](https://www.themoviedb.org/). Silakan patuhi pedoman penggunaan konten dari TMDB.

---

⭐ **Suka dengan project ini?** Berikan bintang di repositori GitHub ini!
