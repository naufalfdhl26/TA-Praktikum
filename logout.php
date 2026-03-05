`<?php
// 1. Jalankan session
session_start();

// 2. Hapus semua data session
session_unset();
session_destroy();

// 3. (Opsional tapi disarankan) Hapus juga cookie username jika kamu ingin user benar-benar "bersih" saat logout
// setcookie('saved_username', '', time() - 3600, "/"); // Hapus // di depannya jika ingin cookie terhapus saat logout

// 4. Arahkan kembali ke halaman login
header("Location: login.php");
exit;
?>