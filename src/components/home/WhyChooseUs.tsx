import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import PageShell from "../ui/PageShell";
import { site } from "../../config/site";

const reasons = [
  { title: "Produk Berkualitas", desc: "Semua produk tersertifikasi resmi dari brand ternama." },
  { title: "Respon Cepat", desc: "Tim support balas dalam hitungan menit via WhatsApp." },
  { title: "Tim Berpengalaman", desc: "Ratusan klien dari berbagai industri sudah kami tangani." },
  { title: "Jangkauan Nasional", desc: "Pengiriman dan instalasi ke seluruh Indonesia." },
  { title: "Garansi Resmi", desc: "Garansi resmi dengan proses klaim yang jelas." },
  { title: "Teknologi Terkini", desc: "Produk terbaru agar bisnis Anda tidak ketinggalan." },
  { title: "Harga Bersaing", desc: "Harga transparan dengan opsi pembelian volume." },
  { title: "After Sales Nyata", desc: "Dukungan purna jual yang konsisten dan dapat diandalkan." },
];

export default function WhyChooseUs() {
  return (
    <PageShell tone="light" className="relative overflow-hidden">
      {/* Light background decorative element */}
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-red-100/30 blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <SectionHeader
          label="Mengapa iware"
          title={
            <>
              Dipercaya ratusan <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent font-medium">bisnis di Indonesia</span>
            </>
          }
          description="Lebih dari 10 tahun menjadi mitra teknologi — dari UMKM hingga jaringan retail. Bukan sekadar jual beli, tapi solusi yang benar-benar jalan."
          labelAccent
        />
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-6 p-8 rounded-3xl border border-neutral-100 bg-gradient-to-b from-neutral-50/80 to-white shadow-sm lg:mt-6"
        >
          {[
            { value: site.stats.clients, label: "Klien Aktif" },
            { value: site.stats.years, label: "Tahun" },
            { value: "99%", label: "Kepuasan" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-1">{m.value}</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-red-500/15 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle light sweep shimmer */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-r from-transparent via-red-500/[0.04] to-transparent" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-neutral-300 font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-2 w-2 rounded-full bg-red-600/20 group-hover:bg-red-600 transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 group-hover:text-red-600 transition-colors">{r.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
