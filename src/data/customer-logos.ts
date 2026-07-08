/** Logo pelanggan — file di folder `logo pelanggan` di root proyek */

export function customerLogoSrc(file: string): string {
  return `/logo-pelanggan/${encodeURIComponent(file)}`;
}

function displayNameFromFile(file: string): string {
  const base = file.replace(/\.[^.]+$/i, "");
  const slug = base.replace(/^\d+\.\d+\s+/, "").trim();
  const acronyms = new Set(["jne", "jnt", "br"]);
  if (acronyms.has(slug.toLowerCase())) return slug.toUpperCase();
  return slug
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const customerFiles = [
  "indomaret.png",
  "hartono.png",
  "jnt.png",
  "1.3 wardah.png",
  "1.4 trans.png",
  "2.1 kidza.png",
  "2.2 hitachi.png",
  "2.3 gyukatsu.png",
  "2.4 jne.png",
  "3.1 joybox.png",
  "3.2 sambalbakar.png",
  "3.3 tamansafari.png",
  "3.4 br.png",
  "4.1 coffeebean.png",
  "4.2 tasty.png",
  "4.3 hisana.png",
  "4.4 kai.png",
  "5.1 gacoan.png",
  "5.2 solaria.png",
  "5.3 laliomah.png",
  "5.4 toeng.png",
  "6.1 pro design.png",
  "6.2 wizzmie.png",
  "6.3 mamayo.png",
  "6.4 tiki.png",
  "7.1 chicken holic.png",
  "7.2 gyukaku.png",
  "7.3 miejol.png",
  "7.4 jiwa.png",
  "8.1 angkasa.png",
  "8.2 anteraja.png",
  "8.3 sociolla.png",
  "8.4 lotte.png",
  "9.1 datasys.png",
  "9.2 wendys.png",
  "9.3 berca.png",
  "9.4 famima.png",
] as const;

export const customerLogos = customerFiles.map((file) => ({
  file,
  name: displayNameFromFile(file),
  logo: customerLogoSrc(file),
}));

export const customerSliderSettings = {
  /** Logo berjalan otomatis (marquee) */
  autoPlay: true,
  /** Pengunjung bisa geser/drag manual */
  scrollable: true,
  durationRow1: "52s",
  durationRow2: "46s",
} as const;

const splitAt = Math.ceil(customerLogos.length / 2);
export const customerMarqueeRow1 = customerLogos.slice(0, splitAt);
export const customerMarqueeRow2 = customerLogos.slice(splitAt);
