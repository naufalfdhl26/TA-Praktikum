// ===== INISIALISASI VARIABEL & SELECTOR =====
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistBadge = document.getElementById('wishlistBadge');
const wishlistItems = document.getElementById('wishlistItems');
const body = document.body;

// Variabel untuk menyimpan stok produk secara real-time
const produktStokData = {};

// Variabel untuk tracking statistik
let totalPenjualan = 0;

// ===== FUNGSI DARK MODE =====
/**
 * Fungsi untuk toggle dark mode
 * Menyimpan preferensi ke localStorage agar tetap persisten saat halaman di-refresh
 */
function toggleDarkMode() {
  body.classList.toggle('dark');
  
  // Simpan preferensi ke localStorage
  const isDark = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  
  // Ubah icon
  updateDarkModeIcon();
}

/**
 * Fungsi untuk memperbarui icon dark mode
 * Moon untuk light mode, Sun untuk dark mode
 */
function updateDarkModeIcon() {
  const isDark = body.classList.contains('dark');
  if (isDark) {
    darkModeIcon.className = 'bi bi-brightness-high';
  } else {
    darkModeIcon.className = 'bi bi-moon-stars';
  }
}

/**
 * Fungsi untuk memuat preferensi dark mode dari localStorage saat halaman pertama kali dimuat
 */
function loadDarkModePreference() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    body.classList.add('dark');
    updateDarkModeIcon();
  }
}

// ===== FUNGSI STOK =====
/**
 * Fungsi untuk menginisialisasi data stok dari atribut data di HTML
 * Setiap produk memiliki data-stok yang akan disimpan untuk diupdate secara real-time
 */
function initializeStokData() {
  // Cek apakah ada data stok di localStorage (untuk persistensi data)
  const savedStok = localStorage.getItem('produktStok');
  if (savedStok) {
    // Load dari localStorage jika ada
    Object.assign(produktStokData, JSON.parse(savedStok));
  } else {
    // Jika tidak ada, inisialisasi dari HTML data attributes
    const products = document.querySelectorAll('.card-produk');
    products.forEach((card) => {
      const nama = card.getAttribute('data-nama');
      const stokAwal = parseInt(card.getAttribute('data-stok'));
      produktStokData[nama] = stokAwal;
    });
  }
}

/**
 * Fungsi untuk menyimpan data stok ke localStorage
 * Dipanggil setiap kali ada perubahan stok
 */
function saveStokData() {
  localStorage.setItem('produktStok', JSON.stringify(produktStokData));
}

/**
 * Fungsi untuk menghitung dan update statistik card
 * Update Total Produk, Stok Tersedia, dan Penjualan secara real-time
 */
function updateStatistik() {
  // Hitung total produk dari jumlah produk yang ada di halaman
  const totalProduk = document.querySelectorAll('.card-produk').length;
  
  // Hitung total stok dari semua produk
  let totalStok = 0;
  Object.values(produktStokData).forEach(stok => {
    totalStok += stok;
  });
  
  // Update elemen statistik di HTML
  const statElements = document.querySelectorAll('.card-glass h2');
  if (statElements.length >= 3) {
    statElements[0].textContent = totalProduk; // Total Produk
    statElements[1].textContent = totalStok;    // Stok Tersedia
    statElements[2].textContent = totalPenjualan; // Penjualan
  }
  
  // Simpan statistik ke localStorage
  localStorage.setItem('totalPenjualan', totalPenjualan);
}

/**
 * Fungsi untuk mengurangi stok produk saat tombol Beli diklik
 * @param {HTMLElement} button - Tombol Beli yang diklik
 * @param {HTMLElement} card - Card produk yang bersangkutan
 */
function handleBeli(button, card) {
  const nama = card.getAttribute('data-nama');
  const harga = card.getAttribute('data-harga');
  let stokSekarang = produktStokData[nama];
  
  // Jika stok masih ada, kurangi stok
  if (stokSekarang > 0) {
    stokSekarang--;
    produktStokData[nama] = stokSekarang;
    
    // Tambah penjualan
    totalPenjualan++;
    
    // Update tampilan stok di badge
    const stokBadge = card.querySelector('.stok-badge');
    stokBadge.textContent = `Stok ${stokSekarang}`;
    
    // Simpan data stok ke localStorage
    saveStokData();
    
    // Update statistik card
    updateStatistik();
    
    // Tampilkan alert konfirmasi
    alert(`✅ ${nama} berhasil dibeli!\nSisa stok: ${stokSekarang}`);
    
    // Disable tombol jika stok habis
    if (stokSekarang === 0) {
      button.disabled = true;
      button.classList.add('opacity-50');
      button.textContent = '❌ Stok Habis';
    }
  }
}

/**
 * Fungsi untuk setup event listener pada semua tombol Beli
 */
function setupBeliButtons() {
  const beliButtons = document.querySelectorAll('.btn-beli');
  beliButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const card = this.closest('.card-produk');
      handleBeli(this, card);
    });
    
    // Disable tombol jika stok sudah habis (dari localStorage)
    const card = button.closest('.card-produk');
    const nama = card.getAttribute('data-nama');
    if (produktStokData[nama] === 0) {
      button.disabled = true;
      button.classList.add('opacity-50');
      button.textContent = '❌ Stok Habis';
    }
    
    // Update tampilan stok di badge sesuai dengan stok yang tersimpan
    const stokBadge = card.querySelector('.stok-badge');
    stokBadge.textContent = `Stok ${produktStokData[nama]}`;
  });
}

// ===== FUNGSI WISHLIST =====
/**
 * Fungsi untuk mendapatkan data wishlist dari sessionStorage
 * @returns {Array} Array berisi nama-nama produk di wishlist
 */
function getWishlist() {
  const wishlist = sessionStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

/**
 * Fungsi untuk menyimpan wishlist ke sessionStorage
 * @param {Array} wishlist - Array berisi nama-nama produk
 */
function saveWishlist(wishlist) {
  sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/**
 * Fungsi untuk menambah produk ke wishlist
 * Tidak boleh ada duplikat item
 * @param {string} nama - Nama produk yang akan ditambahkan
 */
function tambahKeWishlist(nama) {
  let wishlist = getWishlist();
  
  // Cek apakah item sudah ada di wishlist
  if (wishlist.includes(nama)) {
    alert(`⚠️ ${nama} sudah ada di Wishlist!`);
    return;
  }
  
  // Tambahkan item ke wishlist
  wishlist.push(nama);
  saveWishlist(wishlist);
  
  // Tampilkan alert dan update tampilan
  alert(`❤️ ${nama} ditambahkan ke Wishlist!`);
  updateWishlistDisplay();
}

/**
 * Fungsi untuk menghapus produk dari wishlist
 * @param {string} nama - Nama produk yang akan dihapus
 */
function hapusDariWishlist(nama) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item !== nama);
  saveWishlist(wishlist);
  updateWishlistDisplay();
}

/**
 * Fungsi untuk memperbarui tampilan wishlist
 * Mengupdate badge count dan isi modal
 */
function updateWishlistDisplay() {
  const wishlist = getWishlist();
  
  // Update badge
  if (wishlist.length > 0) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = 'inline-block';
  } else {
    wishlistBadge.style.display = 'none';
  }
  
  // Update modal content
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <li class="list-group-item text-center text-muted py-4">
        <i class="bi bi-inbox display-3 d-block mb-2"></i>
        Wishlist kosong
      </li>
    `;
  } else {
    wishlistItems.innerHTML = wishlist.map(nama => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>❤️ ${nama}</span>
        <button class="btn btn-sm btn-danger" onclick="hapusDariWishlist('${nama}')">
          <i class="bi bi-trash"></i> Hapus
        </button>
      </li>
    `).join('');
  }
}

/**
 * Fungsi untuk setup event listener pada semua tombol Tambah ke Wishlist
 */
function setupWishlistButtons() {
  const wishlistButtons = document.querySelectorAll('.btn-wishlist');
  wishlistButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const card = this.closest('.card-produk');
      const nama = card.getAttribute('data-nama');
      tambahKeWishlist(nama);
    });
  });
}

// ===== EVENT LISTENERS =====
/**
 * Toggle Dark Mode saat tombol diklik
 */
darkModeToggle.addEventListener('click', toggleDarkMode);

// ===== FUNGSI INISIALISASI (RUN ON PAGE LOAD) =====
/**
 * Fungsi utama untuk menginisialisasi semua fitur
 * Dijalankan saat DOM sudah sepenuhnya dimuat
 */
function init() {
  // Load dark mode preference dari localStorage
  loadDarkModePreference();
  
  // Load data penjualan dari localStorage jika ada
  const savedPenjualan = localStorage.getItem('totalPenjualan');
  if (savedPenjualan) {
    totalPenjualan = parseInt(savedPenjualan);
  }
  
  // Inisialisasi data stok produk
  initializeStokData();
  
  // Setup semua event listeners
  setupBeliButtons();
  setupWishlistButtons();
  
  // Update wishlist display saat halaman pertama kali dimuat
  updateWishlistDisplay();
  
  // Update statistik saat halaman pertama kali dimuat
  updateStatistik();
}

// Jalankan fungsi init saat DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
