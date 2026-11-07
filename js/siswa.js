import { CONFIG } from "./config.js";
import { fetchSheet, esc, colIndex } from "./csv.js";
import { driveId, thumb } from "./drive.js";

let siswa = []; // [{id, nama, foto}] — "Nama pengguna" jadi id unik

const fotoUrl = id => id ? thumb(id, 200) : "";

export async function initSiswa() {
  const list = document.getElementById("siswaList");
  list.innerHTML = '<div class="state">Memuat data siswa…</div>';
  try {
    const { header, rows } = await fetchSheet(CONFIG.siswaCsvUrl);
    const iUser = colIndex(header, "pengguna", 1), iNama = colIndex(header, "siswa", 2), iFoto = colIndex(header, "foto", 3);
    siswa = rows.map(r => ({
      id: (r[iUser] || "").trim(), nama: (r[iNama] || "").trim(), foto: driveId(r[iFoto])
    })).filter(s => s.id && s.nama).sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    render("");
    document.getElementById("cari").addEventListener("input", e => render(e.target.value));
  } catch (e) {
    list.innerHTML = '<div class="state err">Data siswa tidak bisa dimuat. Cek apakah sheet sudah dibagikan sebagai "Pelihat" untuk semua yang punya link.</div>';
  }
}

function render(q) {
  q = q.trim().toLowerCase();
  const hasil = siswa.filter(s => s.nama.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  document.getElementById("siswaCount").textContent = `${hasil.length} dari ${siswa.length} siswa`;
  document.getElementById("siswaList").innerHTML = hasil.length ? hasil.map(s => `
    <article class="card siswa" id="siswa-${esc(s.id)}">
      <div class="avatar">${esc(s.nama[0].toUpperCase())}${s.foto ? `<img src="${fotoUrl(s.foto)}" alt="Foto ${esc(s.nama)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}</div>
      <div><b>${esc(s.nama)}</b><span>@${esc(s.id)}</span></div>
    </article>`).join("") : '<div class="state">Tidak ada siswa yang cocok.</div>';
}
