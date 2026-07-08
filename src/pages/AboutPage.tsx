import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";

const milestones = [
  { year: "2014", title: "Berdiri", desc: "iWare didirikan dengan visi menjadi distributor teknologi bisnis terpercaya di Indonesia." },
  { year: "2016", title: "Ekspansi Produk", desc: "Memperluas lini produk dengan menghadirkan solusi POS dan barcode scanner premium." },
  { year: "2018", title: "100+ Klien", desc: "Mencapai milestone 100 klien aktif dari berbagai sektor bisnis di Jabodetabek." },
  { year: "2020", title: "Layanan Nasional", desc: "Memperluas jangkauan layanan ke seluruh Indonesia dengan jaringan mitra resmi." },
  { year: "2022", title: "300+ Klien", desc: "Pertumbuhan signifikan dengan lebih dari 300 klien aktif dan 20+ kategori produk." },
  { year: "2024", title: "Inovasi Digital", desc: "Meluncurkan platform digital untuk kemudahan pemesanan dan dukungan teknis online." },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Integritas",
    desc: "Kami berkomitmen pada kejujuran dan transparansi dalam setiap aspek bisnis kami.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Inovasi",
    desc: "Selalu menghadirkan solusi teknologi terkini untuk memenuhi kebutuhan bisnis yang terus berkembang.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Kemitraan",
    desc: "Membangun hubungan jangka panjang yang saling menguntungkan dengan klien dan mitra bisnis.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Kualitas",
    desc: "Tidak berkompromi dalam hal kualitas produk dan layanan yang kami berikan kepada klien.",
  },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <PageHero
        label="Tentang Kami"
        title={<>Mitra teknologi bisnis terpercaya</>}
        description="Sejak 2014, iware hadir sebagai solusi teknologi bisnis yang komprehensif ? membantu ratusan perusahaan di Indonesia bertransformasi digital dengan perangkat berkualitas tinggi."
        breadcrumbs={[
          { label: "Beranda", to: "/" },
          { label: "Tentang Kami" },
        ]}
      />

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">
                Siapa Kami
              </p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Lebih dari Sekadar
                <br />
                <span className="gradient-text">Distributor Teknologi</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                iWare adalah perusahaan teknologi yang berfokus pada penyediaan solusi perangkat bisnis lengkap. Kami tidak hanya menjual produk ? kami membangun ekosistem teknologi yang mendukung pertumbuhan bisnis klien kami.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Dengan portofolio lebih dari 337 produk dari 22 kategori, didukung oleh brand-brand ternama dunia, kami siap menjadi mitra teknologi jangka panjang untuk bisnis Anda.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-red-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-blue-200 text-sm">Tahun Pengalaman</div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-slate-400 text-sm">Klien Aktif</div>
              </div>
              <div className="bg-slate-100 rounded-2xl p-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">337+</div>
                <div className="text-slate-500 text-sm">Varian Produk</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">22</div>
                <div className="text-purple-200 text-sm">Kategori Produk</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">Nilai Perusahaan</p>
            <h2 className="text-4xl font-bold text-slate-900">Prinsip yang Kami Pegang</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">Perjalanan Kami</p>
            <h2 className="text-4xl font-bold text-slate-900">Milestone Perusahaan</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-200">
                      {m.year}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 flex-1 hover:border-red-200 transition-colors">
                    <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-slate-500">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Certificate */}
      <section id="certificate" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">Certificate</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Sertifikasi & legalitas</h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              Dokumen resmi dan pengakuan mitra brand yang menjadi dasar kepercayaan pelanggan terhadap iware.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Distribusi resmi", "Garansi produk", "Kepatuhan standar"].map((title) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-500">Detail sertifikat dapat diminta melalui tim sales resmi iware.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section id="video" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">Video</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Profil perusahaan</h2>
            <p className="mt-3 text-slate-500">Cuplikan singkat layanan dan nilai yang dibawa iware untuk mitra bisnis.</p>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center text-slate-300">
              <svg className="w-14 h-14 text-red-500/90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5zm1.5 2.5L15 12l-5.5 4.5V7.5z" />
              </svg>
              <p className="text-sm font-medium text-white">Video akan segera ditambahkan</p>
              <p className="text-xs text-slate-400 max-w-md">
                Tautan YouTube atau file promosi dapat disematkan di sini ketika materi sudah tersedia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}