<?php
/*
  File Dibuat atas permintaan YouTube lain. Jika Anda memiliki direktori Mp3, dan Anda tidak ingin mengetikkan setiap tautan, gunakan kode ini untuk memindai seluruh direktori tautan.
  
   Persyaratan: Pastikan Anda menggunakan server web yang mendukung PHP (jika host web Anda mendukung cPanel, Anda sudah siap). Jika server web Anda tidak memasang PHP, atau Anda mencoba menggunakan kode ini di tempat lain (seperti tumblr), ini tidak akan berfungsi.
  
   Instruksi:
   1. Ubah nama ekstensi file Anda dari .html menjadi .php (index.html harus index.php).
   2. Tempelkan seluruh kode ini di antara daftar yang tidak berurutan (<ul id = "playlist"> CODEHERE </ul>)
   3. ubah nilai $ fileDir ke direktori mana pun yang berisi mp3 Anda (harus di server yang sama).
       Pertahankan agar tanda qutation dan titik koma tetap bijaksana.
       Contoh $ fileDir = "audio"; $ fileDir = "mp3"; $ fileDir = "src / mp3";
   4. Simpan file, dan periksa halaman web untuk memastikannya berfungsi.
  
   Jangan ragu untuk menghapus baris 2-17 dari ini.

*/

            $fileDir = "audio";
            $files = scandir($fileDir);
            foreach($files as $file) {
                 if(substr($file,-4) == ".mp3"){
            echo "<li><a href='$fileDir/$file'>".substr($file,0,-4)."</a></li>";
                 }
            }
?>
