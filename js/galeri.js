import { CONFIG } from "./config.js";
import { esc } from "./csv.js";
import { driveId, thumb, viewUrl } from "./drive.js";

export function initGaleri() {
  const box = document.getElementById("galeriList");
  const ids = CONFIG.galeri.map(driveId).filter(Boolean);
  box.innerHTML = ids.length
    ? ids.map((id, i) => `<figure class="gal"><a href="${viewUrl(id)}" target="_blank" rel="noopener"><img src="${thumb(id, 600)}" alt="Kegiatan ${i + 1}" loading="lazy" referrerpolicy="no-referrer"></a><figcaption>Kegiatan ${i + 1}</figcaption></figure>`).join("")
    : Array.from({ length: 6 }, (_, i) => `<figure class="gal"><div class="ph"><span class="ms">image</span>Foto contoh</div><figcaption>Kegiatan ${i + 1}</figcaption></figure>`).join("");
}
