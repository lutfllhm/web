import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import youtubeBundle from "../data/youtube-promo-articles.json";

type Article = {
  id: number | string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  hot?: boolean;
  youtubeUrl?: string;
  thumbnail?: string;
};

const youtubeArticles = youtubeBundle.videos as Article[];

const articleThumbnails = [
  "/artikel/article-1.webp",
  "/artikel/article-2.webp",
  "/artikel/article-3.webp",
  "/artikel/article-4.webp",
];

const staticArticles: Article[] = [
  {
    id: 10,
    category: "Panduan Produk",
    title: "Kapan Self-Order Kiosk Cocok untuk Restoran Anda?",
    excerpt:
      "Kiosk pemesanan mandiri mengurangi antrean di kasir, tapi butuh investasi dan perawatan konten menu. Cek poin-poin ini sebelum memutuskan.",
    date: "14 Mei 2026",
    readTime: "5 menit",
    tag: "POS",
  },
  {
    id: 11,
    category: "Tips Bisnis",
    title: "Cadangkan Data Transaksi Kasir: Mulai dari Mana?",
    excerpt:
      "Kehilangan data penjualan bisa mengacaukan laporan pajak dan stok. Ringkasan praktis frekuensi backup, media penyimpanan, dan kebiasaan aman sehari-hari.",
    date: "10 Mei 2026",
    readTime: "4 menit",
    tag: "Kasir",
  },
  {
    id: 12,
    category: "Edukasi",
    title: "WiFi 6 untuk Toko dan Kantor Kecil — Apa Manfaatnya?",
    excerpt:
      "Lebih banyak perangkat terhubung tanpa lag, konsumsi daya lebih efisien pada perangkat modern, dan jaringan yang lebih tahan interferensi. Cocok untuk ritel yang pakai POS + handheld.",
    date: "5 Mei 2026",
    readTime: "5 menit",
    tag: "Jaringan",
  },
  {
    id: 1,
    hot: true,
    category: "Tips Bisnis",
    title: "5 Tanda Sudah Waktunya Upgrade Sistem Kasir Anda",
    excerpt: "Kasir lambat, antrian panjang, laporan tidak akurat — kalau Anda mengalami salah satu dari ini, mungkin sudah saatnya pertimbangkan upgrade. Ini tanda-tanda yang perlu diperhatikan.",
    date: "12 Jan 2025",
    readTime: "4 menit",
    tag: "Kasir",
  },
  {
    id: 2,
    hot: true,
    category: "Panduan Produk",
    title: "Perbedaan Barcode Scanner 1D dan 2D — Mana yang Cocok untuk Bisnis Anda?",
    excerpt: "Banyak yang bingung pilih scanner 1D atau 2D. Jawabannya tergantung jenis barcode yang Anda pakai dan kebutuhan bisnis. Kami jelaskan perbedaannya secara praktis.",
    date: "8 Jan 2025",
    readTime: "5 menit",
    tag: "Scanner",
  },
  {
    id: 3,
    hot: true,
    category: "Tips Bisnis",
    title: "Cara Memilih Thermal Printer yang Tepat untuk Toko Retail",
    excerpt: "Bukan soal harga termurah — ada beberapa faktor penting yang sering diabaikan saat beli thermal printer. Kecepatan cetak, lebar kertas, konektivitas, dan daya tahan jadi pertimbangan utama.",
    date: "3 Jan 2025",
    readTime: "6 menit",
    tag: "Printer",
  },
  {
    id: 4,
    category: "Panduan Produk",
    title: "Mengenal Jenis-jenis Label Barcode dan Cara Memilihnya",
    excerpt: "Label barcode bukan sekadar kertas stiker. Ada perbedaan signifikan antara label direct thermal dan thermal transfer yang berdampak pada ketahanan dan biaya jangka panjang.",
    date: "28 Des 2024",
    readTime: "5 menit",
    tag: "Label",
  },
  {
    id: 5,
    category: "Edukasi",
    title: "Apa itu POS System dan Kenapa Bisnis Anda Butuh Ini?",
    excerpt: "POS bukan cuma alat kasir. Sistem yang tepat bisa bantu Anda kelola stok, pantau penjualan real-time, dan buat laporan keuangan otomatis. Ini penjelasan lengkapnya.",
    date: "20 Des 2024",
    readTime: "7 menit",
    tag: "POS",
  },
  {
    id: 6,
    category: "Tips Bisnis",
    title: "Cara Merawat Printer Thermal Supaya Awet dan Tidak Cepat Rusak",
    excerpt: "Printer thermal yang dirawat dengan benar bisa bertahan 5-7 tahun. Beberapa kebiasaan sederhana bisa memperpanjang usia pakai secara signifikan. Ini tipsnya.",
    date: "15 Des 2024",
    readTime: "4 menit",
    tag: "Maintenance",
  },
  {
    id: 7,
    category: "Edukasi",
    title: "Kenapa Barcode Scanner Wireless Lebih Efisien untuk Gudang?",
    excerpt: "Di gudang yang luas, kabel scanner bisa jadi hambatan nyata. Scanner wireless dengan docking station bisa tingkatkan produktivitas tim gudang secara signifikan.",
    date: "10 Des 2024",
    readTime: "5 menit",
    tag: "Scanner",
  },
  {
    id: 8,
    category: "Panduan Produk",
    title: "Panduan Lengkap Memilih Cash Drawer untuk Toko",
    excerpt: "Cash drawer yang salah pilih bisa jadi masalah — terlalu kecil, tidak kompatibel dengan printer, atau cepat rusak. Ini panduan memilih yang tepat sesuai kebutuhan.",
    date: "5 Des 2024",
    readTime: "4 menit",
    tag: "Cash Drawer",
  },
  {
    id: 9,
    category: "Tips Bisnis",
    title: "Integrasi Barcode Scanner dengan Software Inventory — Langkah Awal",
    excerpt: "Manajemen stok manual memakan waktu dan rawan error. Dengan scanner yang terintegrasi ke software inventory, proses ini bisa jauh lebih cepat dan akurat.",
    date: "1 Des 2024",
    readTime: "6 menit",
    tag: "Integrasi",
  },
].map((article, index) => ({
  thumbnail: articleThumbnails[index % articleThumbnails.length],
  ...article,
}));

const categories = ["Semua", "Promosi YouTube", "Tips Bisnis", "Panduan Produk", "Edukasi"];

const tagColors: Record<string, string> = {
  Kasir: "bg-red-50 text-red-600",
  Scanner: "bg-blue-50 text-blue-600",
  Printer: "bg-orange-50 text-orange-600",
  Label: "bg-green-50 text-green-600",
  POS: "bg-purple-50 text-purple-600",
  Maintenance: "bg-amber-50 text-amber-600",
  "Cash Drawer": "bg-rose-50 text-rose-600",
  Integrasi: "bg-cyan-50 text-cyan-600",
  Jaringan: "bg-sky-50 text-sky-600",
  YouTube: "bg-red-50 text-red-700 ring-1 ring-red-100",
};

export default function ArtikelPage() {
  const [searchParams] = useSearchParams();
  const hotMode = searchParams.get("tab") === "hot";
  const [activeCat, setActiveCat] = useState("Semua");

  const articles = useMemo(() => [...youtubeArticles, ...staticArticles], []);

  const byCategory =
    activeCat === "Semua" ? articles : articles.filter((a) => a.category === activeCat);
  const filtered = hotMode ? staticArticles.filter((a) => a.hot) : byCategory;

  useEffect(() => {
    if (!hotMode) return;
    const t = window.setTimeout(() => {
      document.getElementById("hot-news")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, [hotMode]);

  const [featured, ...rest] = filtered;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="bg-slate-900 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-4">
              {hotMode ? "Hot news" : "Artikel"}
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-5">
              {hotMode ? (
                <>
                  Berita <span className="gradient-text">Hangat</span>
                </>
              ) : (
                <>
                  Tips & <span className="gradient-text">Panduan</span>
                </>
              )}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              {hotMode
                ? "Kumpulan artikel dan update yang sedang banyak dibaca pelanggan iware."
                : "Artikel praktis seputar teknologi bisnis, tips memilih perangkat, dan panduan penggunaan produk."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hotMode && (
            <div
              id="hot-news"
              className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/80 px-5 py-4 scroll-mt-24"
            >
              <p className="text-sm font-medium text-red-900">Menampilkan artikel HOT NEWS terpilih.</p>
              <Link
                to="/artikel"
                className="text-sm font-semibold text-red-700 hover:text-red-800 underline-offset-2 hover:underline"
              >
                Lihat semua artikel
              </Link>
            </div>
          )}

          {!hotMode && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCat === cat ? "bg-red-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-20">Belum ada artikel di kategori ini.</p>
          ) : (
            <>
              {featured && (
                <>
                  {featured.youtubeUrl ? (
                    <motion.a
                      href={featured.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 block cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-red-200 hover:shadow-lg"
                    >
                      <div className="grid md:grid-cols-2">
                        <div className="relative flex min-h-48 items-center justify-center md:min-h-full">
                          {featured.thumbnail ? (
                            <>
                              <img src={featured.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="relative z-10 p-8 text-center">
                                <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                  {featured.tag}
                                </span>
                                <p className="text-sm text-white/90">{hotMode ? "Hot news" : "Video promosi terbaru"}</p>
                              </div>
                            </>
                          ) : (
                            <div className="flex min-h-48 w-full flex-col items-center justify-center bg-linear-to-br from-red-600 to-rose-700 p-10">
                              <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                                {featured.tag}
                              </span>
                              <p className="text-sm text-white/70">{hotMode ? "Hot news" : "Artikel Terbaru"}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center p-8">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{featured.category}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-400">{featured.date}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-400">YouTube</span>
                          </div>
                          <h2 className="mb-3 text-xl font-bold leading-snug text-slate-900">{featured.title}</h2>
                          <p className="mb-5 text-sm leading-relaxed text-slate-500">{featured.excerpt}</p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                            Tonton di YouTube
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 cursor-default overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-red-200 hover:shadow-lg"
                    >
                      <div className="grid md:grid-cols-2">
                        <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-slate-100 p-10">
                          {featured.thumbnail ? (
                            <>
                              <img
                                src={featured.thumbnail}
                                alt={featured.title}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="relative z-10 text-center">
                                <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                  {featured.tag}
                                </span>
                                <p className="text-sm text-white/90">{hotMode ? "Hot news" : "Artikel Terbaru"}</p>
                              </div>
                            </>
                          ) : (
                            <div className="flex min-h-48 w-full flex-col items-center justify-center bg-linear-to-br from-red-600 to-rose-700 p-10">
                              <div className="text-center">
                                <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                                  {featured.tag}
                                </span>
                                <p className="text-sm text-white/70">{hotMode ? "Hot news" : "Artikel Terbaru"}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center p-8">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{featured.category}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-400">{featured.date}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-400">{featured.readTime} baca</span>
                          </div>
                          <h2 className="mb-3 text-xl font-bold leading-snug text-slate-900">{featured.title}</h2>
                          <p className="mb-5 text-sm leading-relaxed text-slate-500">{featured.excerpt}</p>
                          <span className="group inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                            Baca selengkapnya
                            <svg
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => {
                  const Card = article.youtubeUrl ? motion.a : motion.div;
                  const linkProps = article.youtubeUrl
                    ? {
                        href: article.youtubeUrl,
                        target: "_blank" as const,
                        rel: "noopener noreferrer" as const,
                      }
                    : {};
                  return (
                    <Card
                      key={article.id}
                      {...linkProps}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className={`group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-red-200 hover:shadow-lg ${article.youtubeUrl ? "block" : ""}`}
                    >
                      <div className="relative h-36 overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
                        {article.thumbnail ? (
                          <>
                            <img src={article.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                          </>
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${tagColors[article.tag] || "bg-slate-100 text-slate-600"}`}
                          >
                            {article.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{article.category}</span>
                          <span className="text-xs text-slate-300">·</span>
                          <span className="text-xs text-slate-400">
                            {article.youtubeUrl ? "YouTube" : `${article.readTime} baca`}
                          </span>
                        </div>
                        <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-slate-800">{article.title}</h3>
                        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-slate-500">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{article.date}</span>
                          <span className="text-xs font-semibold text-red-600 group-hover:underline">
                            {article.youtubeUrl ? "Tonton →" : "Baca →"}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
}
