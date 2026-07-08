/** Konfigurasi situs — ubah nomor & kontak di satu tempat */
export const site = {
  name: "iware",
  legalName: "iware",
  tagline: "Pusat alat kasir & solusi teknologi bisnis terlengkap",
  description:
    "iware menyediakan POS, printer struk, scanner, jaringan, dan dukungan teknis untuk UMKM hingga retail chain di seluruh Indonesia.",

  phone: "+62 812-3456-7890",
  phoneRaw: "6281234567890",
  email: "info@iware.id",
  address: "Jakarta, Indonesia",

  whatsapp: {
    defaultMessage: "Halo iware, saya ingin bertanya tentang produk Anda.",
    consultMessage: "Halo iware, saya ingin konsultasi produk gratis.",
    featuredMessage: "Halo iware, saya ingin konsultasi produk.",
    faqMessage: "Halo iware, saya punya pertanyaan.",
    downloadMessage: "Halo iware, saya butuh file driver/software untuk produk...",
    productMessage: (productName: string) =>
      `Halo iware, saya tertarik dengan produk ${productName}.`,
  },

  stats: {
    clients: "500+",
    products: "337+",
    categories: "22",
    years: "10+",
  },

  social: {
    instagram: "https://instagram.com/iware.id",
    facebook: "https://facebook.com/iware.id",
    youtube: "https://www.youtube.com/@iwaretechindonesia",
  },
} as const;

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(message ?? site.whatsapp.defaultMessage);
  return `https://wa.me/${site.phoneRaw}?text=${text}`;
}
