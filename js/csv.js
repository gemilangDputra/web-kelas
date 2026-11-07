// Parser CSV kecil (mendukung tanda kutip) + pengambil data.
export function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = ""; rows.push(row); row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim() !== ""));
}

// Mengembalikan array of array (tanpa baris header) dan header-nya.
export async function fetchSheet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal memuat data (" + res.status + ")");
  const [header, ...rows] = parseCSV(await res.text());
  return { header: header.map(h => h.trim().toLowerCase()), rows };
}

export const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
export const colIndex = (header, name, fallback) => { const i = header.findIndex(h => h.includes(name)); return i >= 0 ? i : fallback; };
