// Ambil id dari link Drive (?id=..., /d/..., /folders/...) atau id polos.
export function driveId(v) {
  v = String(v || "").trim();
  const m = v.match(/[?&]id=([\w-]+)|\/d\/([\w-]+)|\/folders\/([\w-]+)/);
  return m ? (m[1] || m[2] || m[3]) : (/^[\w-]{20,}$/.test(v) ? v : "");
}
export const thumb = (id, w = 800) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
export const viewUrl = id => `https://drive.google.com/file/d/${id}/view`;
