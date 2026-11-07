import { CONFIG } from "./config.js";
import { esc } from "./csv.js";
import { driveId, thumb } from "./drive.js";

// Data contoh — ganti isinya nanti (atau ambil dari sheet/GAS).
const PENGUMUMAN = [
  { judul: "Contoh pengumuman 1", tanggal: "7 Nov 2026", isi: "Isi pengumuman kelas akan tampil di sini." },
  { judul: "Contoh pengumuman 2", tanggal: "6 Nov 2026", isi: "Tambahkan info tugas, ujian, atau kegiatan kelas." }
];
const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const PULANG = HARI.map(h => ({ hari: h, jam: "--.--" }));
const PIKET = HARI.map(h => ({ hari: h, nama: ["Siswa A", "Siswa B", "Siswa C"] }));

const ph = (icon, teks) => `<div class="ph"><span class="ms">${icon}</span>${esc(teks)}</div>`;
// Tampilkan gambar dari Google Drive; jika belum diisi/gagal dimuat, tetap placeholder.
function gambar(el, sumber, w, alt, icon, teks) {
  el.innerHTML = ph(icon, teks);
  const id = driveId(sumber);
  if (!id) return;
  const img = new Image(); img.alt = alt; img.referrerPolicy = "no-referrer";
  img.onload = () => { el.innerHTML = ""; el.appendChild(img); };
  img.src = thumb(id, w);
}

export function initPlaceholders() {
  document.getElementById("heroTitle").textContent = CONFIG.kelas;
  document.getElementById("heroSub").textContent = CONFIG.sekolah;
  gambar(document.getElementById("heroPhoto"), CONFIG.fotoBersama, 1600, "Foto bersama kelas", "photo_camera", "Foto bersama (contoh)");

  document.getElementById("pengumumanList").innerHTML = PENGUMUMAN.map(p =>
    `<article class="card"><span class="tag">${esc(p.tanggal)}</span><h3>${esc(p.judul)}</h3><p>${esc(p.isi)}</p></article>`).join("");
  document.getElementById("pulangList").innerHTML = PULANG.map(p =>
    `<article class="card row"><h3>${p.hari}</h3><span class="tag">${p.jam}</span></article>`).join("");
  document.getElementById("piketList").innerHTML = PIKET.map(p =>
    `<article class="card"><h3>${p.hari}</h3><p>${p.nama.map(esc).join(", ")}</p></article>`).join("");
  const sb = document.getElementById("strukturBox"); sb.className = "struktur";
  gambar(sb, CONFIG.fotoStruktur, 1600, "Struktur kelas", "account_tree", "Struktur kelas (contoh, nanti PNG)");
}
