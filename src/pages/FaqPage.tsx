import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, whatsappUrl } from "../config/site";

const faqs = [
  {
    category: "Pembelian & Pembayaran",
    items: [
      { q: "Bagaimana cara memesan produk dari iware?", a: "Paling mudah lewat WhatsApp kami. Ceritakan kebutuhan Anda, tim kami bantu pilih produk yang tepat, lalu kami kirimkan penawaran harga. Tidak perlu daftar akun atau isi form panjang." },
      { q: "Apakah ada minimum order?", a: "Tidak ada minimum order. Beli satu unit pun kami layani dengan serius. Untuk pembelian dalam jumlah besar, ada harga khusus yang bisa didiskusikan." },
      { q: "Metode pembayaran apa saja yang diterima?", a: "Transfer bank (semua bank besar), QRIS, kartu kredit, dan cicilan 0% untuk pembelian tertentu. Kami juga melayani pembelian dengan PO (Purchase Order) untuk perusahaan." },
      { q: "Apakah harga yang tertera sudah termasuk pajak?", a: "Harga yang kami berikan biasanya belum termasuk PPN 11%. Untuk pembelian korporat yang membutuhkan faktur pajak, kami siapkan. Konfirmasi saat pemesanan." },
    ],
  },
  {
    category: "Pengiriman & Instalasi",
    items: [
      { q: "Berapa lama waktu pengiriman?", a: "Untuk Jabodetabek biasanya 1-2 hari kerja. Luar Jawa 3-7 hari kerja tergantung lokasi. Kami pakai ekspedisi terpercaya dan semua pengiriman dilengkapi asuransi." },
      { q: "Apakah tersedia layanan instalasi?", a: "Ya, kami punya tim teknisi yang bisa datang ke lokasi Anda. Untuk area Jabodetabek biasanya bisa dijadwalkan dalam 1-3 hari kerja setelah produk diterima. Luar kota bisa diatur sesuai ketersediaan." },
      { q: "Berapa biaya instalasi?", a: "Untuk produk tertentu instalasi sudah termasuk dalam harga. Untuk produk lain ada biaya tambahan tergantung kompleksitas dan lokasi. Tanyakan saat pemesanan supaya tidak ada kejutan." },
    ],
  },
  {
    category: "Garansi & After Sales",
    items: [
      { q: "Berapa lama garansi produk?", a: "Garansi bervariasi per produk, umumnya 1-2 tahun garansi resmi dari brand. Beberapa produk ada garansi tambahan dari kami. Detail garansi selalu kami informasikan sebelum pembelian." },
      { q: "Bagaimana proses klaim garansi?", a: "Hubungi kami via WhatsApp dengan foto/video masalah yang dialami. Tim kami akan diagnosa dulu — banyak masalah bisa diselesaikan tanpa harus kirim barang. Kalau perlu servis, kami atur prosesnya." },
      { q: "Apakah ada layanan perbaikan untuk produk yang sudah habis garansi?", a: "Ada. Kami punya teknisi yang bisa menangani perbaikan dengan biaya transparan. Kami informasikan estimasi biaya dulu sebelum mulai perbaikan." },
      { q: "Bagaimana cara menghubungi technical support?", a: "WhatsApp adalah cara tercepat — nomor ada di website ini. Kami juga bisa dihubungi via telepon dan email. Jam operasional Senin-Jumat 08.00-17.00, Sabtu 08.00-14.00." },
    ],
  },
  {
    category: "Produk & Kompatibilitas",
    items: [
      { q: "Apakah produk iware kompatibel dengan software kasir yang sudah saya pakai?", a: "Sebagian besar produk kami kompatibel dengan software kasir populer di Indonesia. Ceritakan software yang Anda pakai dan kami cek kompatibilitasnya sebelum Anda beli." },
      { q: "Apakah tersedia driver dan software pendukung?", a: "Ya, semua tersedia di halaman Download website ini. Untuk produk tertentu kami juga bantu instalasi driver saat setup awal." },
      { q: "Bisakah saya mencoba produk sebelum membeli?", a: "Untuk klien di area Jabodetabek, kami bisa atur demo produk di kantor kami atau di lokasi Anda. Hubungi kami untuk jadwalkan demo." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-red-200 bg-red-50/30" : "border-slate-100 bg-white hover:border-slate-200"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`text-sm font-semibold leading-snug ${open ? "text-red-700" : "text-slate-800"}`}>{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-red-600 text-white rotate-45" : "bg-slate-100 text-slate-500"}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="bg-slate-900 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-4">FAQ</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-5">
              Pertanyaan yang <span className="gradient-text">Sering Ditanya</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Tidak ketemu jawabannya? Langsung tanya ke tim kami via WhatsApp — kami respons cepat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((cat, ci) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                  {cat.category}
                </h2>
                <div className="space-y-2">
                  {cat.items.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center p-8 bg-white rounded-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Masih ada pertanyaan?</h3>
            <p className="text-slate-500 text-sm mb-6">Tim kami siap bantu. Chat langsung via WhatsApp untuk jawaban paling cepat.</p>
            <a
              href={whatsappUrl(site.whatsapp.faqMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tanya via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
