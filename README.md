# 🍏 BeVegan - Manajemen Toko Sayur dan Buah

Project ini adalah **Tugas Akhir 3** untuk mata kuliah ISB - 310 Sistem Informasi Berbasis Web (Praktikum). Merupakan pengembangan lanjutan dari Tugas Akhir 2 (JavaScript & Web Storage), di mana website statis telah diubah menjadi dinamis menggunakan PHP.

## Informasi Mahasiswa
- **Nama:** Naufal Fadhil Setiawan
- **NRP:** 162023046
- **Program Studi:** Sistem Informasi
- **Institut Teknologi Nasional (Itenas) Bandung 2026**

---

## Fitur dan Spesifikasi Tugas

Website ini mengimplementasikan sistem autentikasi berbasis *Session* dan *Cookies* dengan rincian fitur sebagai berikut:

**1. Sistem Login Menggunakan Session (`login.php`)**
- Halaman login dengan form *Username* dan *Password*.
- Validasi login secara *hardcode*.
- Status login disimpan dengan aman di sisi server menggunakan `$_SESSION`.
- Otomatis melakukan *redirect* ke halaman utama setelah berhasil login.

**2. Proteksi Halaman (Pembatasan Akses)**
- Halaman utama (`index.php`) dan halaman produk (`produk.php`) telah "digembok" menggunakan logika pengecekan *Session*.
- Sistem akan menolak akses pengunjung yang belum login dan langsung melempar kembali ke halaman login.

**3. Fitur Remember Me Menggunakan Cookies**
- Terdapat *checkbox* "Remember Me" pada halaman login.
- Menyimpan *cookie* `saved_username` selama 7 hari.
- **Autofill:** Field username akan otomatis terisi apabila pengguna membuka halaman login kembali dalam masa aktif *cookie*.

**4. Fitur Logout (`logout.php`)**
- Tombol logout terintegrasi pada navigasi atas (*Navbar*).
- Menghapus sesi secara permanen menggunakan `session_unset()` dan `session_destroy()`.
- Mengarahkan pengguna kembali ke halaman login secara aman.

**5. Nilai Tambahan (Bonus)**
- Penanganan *error* saat login gagal tidak lagi menggunakan *alert default* JavaScript.
- Menggunakan komponen **Alert Dismissible Bootstrap 5** berwarna merah muda (*alert-danger*) yang membuat antarmuka (UI) lebih elegan.

---

## Cara Menjalankan Project (Localhost)

1. Pastikan Anda telah menginstal *local server* seperti **XAMPP**, **Laragon**, atau **MAMP**.
2. *Clone* atau unduh *repository* ini.
3. Pindahkan folder project ini ke dalam direktori server lokal Anda (contoh: `htdocs` untuk XAMPP atau `www` untuk Laragon).
4. Nyalakan service **Apache** pada *local server* Anda.
5. Buka browser dan akses URL: `http://localhost/nama-folder-project-ini`

### 🔑 Kredensial Login
Untuk mencoba sistem *login*, silakan gunakan akses berikut:
- **Username:** `admin`
- **Password:** `vegan123`

---
*BeVegan - Fresh Vegetables and Fruits. Be Healthy Be Vegan!* 🥬🍎
