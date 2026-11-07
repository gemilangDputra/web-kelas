// Semua pengaturan utama ada di sini.
export const CONFIG = {
  kelas: "Kelas 7.2 (VII.II)",
  sekolah: "SMP Muhammadiyah 1 Lubuklinggau",
  // Pastikan kedua sheet dibagikan sebagai "Siapa saja yang memiliki link: Pelihat".
  // Nanti bisa diganti URL Google Apps Script (GAS) agar data lebih aman.
  siswaCsvUrl: "https://docs.google.com/spreadsheets/d/10Te3EMKOVs7OTPRQOd7tjWjSFSskmRxYMmiNkN6C7kQ/gviz/tq?tqx=out:csv",
  jadwalCsvUrl: "https://docs.google.com/spreadsheets/d/1CPA0vXS2XY15Oqb-tbME7b1yy5Bxf7AbiVtSAFGtBLU/gviz/tq?tqx=out:csv",

  // Google Drive. Isi dengan link atau id file; kosong = tampil placeholder.
  // File/folder harus dibagikan "Siapa saja yang memiliki link: Pelihat".
  fotoBersama: "",
  fotoStruktur: "",
  // Foto kegiatan: tempel link Drive satu per satu (tambah baris baru untuk foto berikutnya).
  galeri: [
    "https://drive.google.com/file/d/1H7vXQFyI-KxpXkQKxzLBBBM_NJA6ZEfe/view?usp=drivesdk"
  ]
};
