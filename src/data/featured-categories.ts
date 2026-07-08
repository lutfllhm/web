/** Path aman untuk nama file gambar kategori (spasi, &, dll.) */
function categoryImg(filename: string) {
  return `/produkkami/${encodeURIComponent(filename)}`;
}

/** 14 kategori produk — satu kartu per kategori, tidak digabung */
export const featuredCategories = [
  {
    slug: "all-in-one-pos-system",
    label: "POS All In One",
    tagline: "Alat kasir layar sentuh dengan sistem Windows atau Android — siap dipakai untuk ritel dan F&B.",
    image: categoryImg("all in pos system.png"),
  },
  {
    slug: "thermal-printer",
    label: "Thermal Printer",
    tagline: "Cetak struk cepat dan hemat untuk kasir dan operasional harian.",
    image: categoryImg("thermal printer.png"),
  },
  {
    slug: "barcode-label-printer",
    label: "Barcode Label Printer",
    tagline: "Cetak label dan barcode dengan hasil tajam untuk gudang dan ritel.",
    image: categoryImg("barcodelabelprinter.png"),
  },
  {
    slug: "mobile-printer",
    label: "Mobile Printer",
    tagline: "Printer portabel untuk kebutuhan cetak struk di lapangan.",
    image: categoryImg("mobile printer.png"),
  },
  {
    slug: "barcode-scanner",
    label: "Barcode Scanner",
    tagline: "Pemindaian cepat dan akurat untuk kasir hingga gudang.",
    image: categoryImg("barcode scanner.png"),
  },
  {
    slug: "cash-drawer",
    label: "Cash Drawer",
    tagline: "Laci kas aman dan tahan untuk penggunaan intensif.",
    image: categoryImg("cash drawer.png"),
  },
  {
    slug: "mini-pc",
    label: "Mini PC",
    tagline: "Perangkat ringkas untuk aktivitas kasir dan operasional toko.",
    image: categoryImg("mini pc.png"),
  },
  {
    slug: "monitor-pc",
    label: "Monitor PC",
    tagline: "Layar tajam untuk kebutuhan kasir dan operasional kantor.",
    image: categoryImg("monitor pc.png"),
  },
  {
    slug: "self-order-kiosk",
    label: "Self Order Kiosk",
    tagline: "Layar sentuh besar untuk pemesanan mandiri yang intuitif.",
    image: categoryImg("kiosk.png"),
  },
  {
    slug: "tablet",
    label: "Tablet",
    tagline: "Tablet Android untuk kasir mobile dan display promosi.",
    image: categoryImg("tablet.png"),
  },
  {
    slug: "money-counter",
    label: "Money Counter",
    tagline: "Mesin hitung uang otomatis dengan deteksi uang palsu.",
    image: categoryImg("money counter.png"),
  },
  {
    slug: "calling-system",
    label: "Calling System",
    tagline: "Sistem panggil nirkabel untuk antrian dan layanan pelanggan.",
    image: categoryImg("calling system.png"),
  },
  {
    slug: "walkie-talkie-and-handy-talkie",
    label: "Walkie Talkie & HT",
    tagline: "Komunikasi dua arah andal untuk koordinasi tim di lapangan.",
    image: categoryImg("wt-ht.png"),
  },
  {
    slug: "lainnya",
    label: "Interactive Flat Panel",
    tagline: "Panel interaktif untuk diskusi, meeting, dan presentasi.",
    image: categoryImg("IFP 55 65 75.png"),
  },
  {
    slug: "etc",
    label: "Etc",
    tagline: "Aksesori dan perangkat pendukung operasional lainnya.",
    image: categoryImg("etc.png"),
  },
] as const;

export type FeaturedCategory = (typeof featuredCategories)[number];
