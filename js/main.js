import { initPlaceholders } from "./placeholders.js";
import { initSiswa } from "./siswa.js";
import { initJadwal } from "./jadwal.js";
import { initGaleri } from "./galeri.js";

const MENU = [
  ["beranda", "home", "Beranda"], ["pengumuman", "campaign", "Pengumuman"], ["jadwal", "calendar_month", "Jadwal"],
  ["pulang", "logout", "Pulang"], ["piket", "cleaning_services", "Piket"], ["struktur", "account_tree", "Struktur"],
  ["siswa", "groups", "Siswa"], ["galeri", "photo_library", "Galeri"]
];

function initNav() {
  const box = document.getElementById("links");
  box.innerHTML = MENU.map(([id, ic, t]) => `<a href="#${id}" data-id="${id}"><span class="ms">${ic}</span>${t}</a>`).join("");
  const aktif = id => box.querySelectorAll("a").forEach(a => {
    const on = a.dataset.id === id;
    a.classList.toggle("on", on);
    // Geser hanya menu-nya (bukan halaman) agar tidak berebut dengan scroll pengguna.
    if (on && box.scrollWidth > box.clientWidth)
      box.scrollTo({ left: a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2, behavior: "auto" });
  });
  const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && aktif(e.target.id)),
    { rootMargin: "-40% 0px -55% 0px" });
  MENU.forEach(([id]) => obs.observe(document.getElementById(id)));
}

initPlaceholders();
initNav();
initJadwal();
initSiswa();
initGaleri();
