<?php
// 1. Mulai Session
session_start();

// Cek jika user sudah login, langsung lempar ke halaman beranda
if (isset($_SESSION['is_logged_in'])) {
    header("Location: index.php");
    exit;
}

$error = false;

// 2. Proses form ketika disubmit
if (isset($_POST['login_submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validasi Hardcode (Bisa kamu ubah sesuai selera)
    if ($username === 'admin' && $password === 'vegan123') {
        
        // Simpan status login ke Session
        $_SESSION['is_logged_in'] = true;
        $_SESSION['username'] = $username;

        // 3. Proses Cookies untuk Remember Me
        if (isset($_POST['remember'])) {
            // Set cookie bernama 'saved_username' selama 7 hari
            setcookie('saved_username', $username, time() + (86400 * 7), "/");
        } else {
            // Jika tidak dicentang, pastikan cookie dihapus
            setcookie('saved_username', '', time() - 3600, "/");
        }

        // Redirect ke halaman utama
        header("Location: index.php");
        exit;
    } else {
        // Set trigger untuk memunculkan alert Bootstrap (Nilai Bonus)
        $error = true;
    }
}

// Ambil data cookie jika ada untuk fitur autofill
$autofill_user = isset($_COOKIE['saved_username']) ? $_COOKIE['saved_username'] : '';
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login • BeVegan</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="css/style.css">
  <style>
    /* Styling khusus agar form di tengah layar */
    body { height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; }
    .login-glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); border-radius: 15px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0,0,0,0.1); width: 100%; max-width: 400px; border: 1px solid rgba(255, 255, 255, 0.3); }
  </style>
</head>
<body class="bg-success"> <div class="container d-flex justify-content-center">
  <div class="login-glass text-center">
    <h2 class="fw-bold mb-4"><i class="bi bi-flower2 text-success me-2"></i>BeVegan</h2>
    
    <?php if ($error) : ?>
      <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
        <i class="bi bi-exclamation-circle me-2"></i>Username atau password salah!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    <?php endif; ?>

    <form action="" method="POST" class="text-start">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="username" name="username" placeholder="Username" value="<?= $autofill_user ?>" required>
        <label for="username">Username</label>
      </div>
      
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
        <label for="password">Password</label>
      </div>

      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="remember" name="remember" <?= ($autofill_user != '') ? 'checked' : '' ?>>
        <label class="form-check-label" for="remember">
          Remember Me
        </label>
      </div>

      <button type="submit" name="login_submit" class="btn btn-success w-100 py-2 rounded-pill fw-semibold">Masuk</button>
    </form>
    
    <div class="mt-3">
      <small class="text-muted">Gunakan <b>admin</b> / <b>vegan123</b></small>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>