import { CONFIG } from "./config.js";
import { fetchSheet, esc, colIndex } from "./csv.js";

const URUTAN = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const NAMA_HARI = ["Minggu", ...URUTAN];

export async function initJadwal() {
  const list = document.getElementById("jadwalList"), tabs = document.getElementById("hariTabs");
  list.innerHTML = '<div class="state">Memuat jadwal…</div>';
  try {
    const { header, rows } = await fetchSheet(CONFIG.jadwalCsvUrl);
    const iMapel = colIndex(header, "pelajaran", 1), iHari = colIndex(header, "hari", 2), iGuru = colIndex(header, "guru", 3);
    const perHari = {};
    rows.forEach(r => {
      (r[iHari] || "").split(",").map(h => h.trim()).filter(Boolean).forEach(h => {
        const hari = URUTAN.find(u => u.toLowerCase() === h.toLowerCase());
        if (hari) (perHari[hari] ||= []).push({ mapel: r[iMapel], guru: r[iGuru] });
      });
    });
    const hariAda = URUTAN.filter(h => perHari[h]); // hanya hari yang punya pelajaran
    if (!hariAda.length) { list.innerHTML = '<div class="state">Jadwal belum diisi.</div>'; return; }
    const hariIni = NAMA_HARI[new Date().getDay()];
    const tampil = h => {
      tabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.h === h));
      list.innerHTML = perHari[h].map(p => `<article class="card"><h3>${esc(p.mapel)}</h3><p>${esc(p.guru)}</p></article>`).join("");
    };
    tabs.innerHTML = hariAda.map(h => `<button data-h="${h}" class="${h === hariIni ? "today" : ""}">${h}</button>`).join("");
    tabs.onclick = e => e.target.dataset.h && tampil(e.target.dataset.h);
    tampil(hariAda.includes(hariIni) ? hariIni : hariAda[0]);
  } catch (e) {
    list.innerHTML = '<div class="state err">Jadwal tidak bisa dimuat. Cek pengaturan berbagi sheet.</div>';
  }
}
