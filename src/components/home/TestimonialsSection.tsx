import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import PageShell from "../ui/PageShell";

const testimonials = [
  { name: "Budi Santoso", company: "Supermarket Maju Jaya", role: "Owner", text: "Sudah pakai produk iware hampir 2 tahun. Scanner dan printer-nya awet. Tim support respons cepat.", gradient: "from-red-500 to-rose-600" },
  { name: "Siti Rahayu", company: "Apotek Sehat Selalu", role: "Manager Operasional", text: "Kualitas tidak kalah dari kompetitor. Printer thermal kami 3 tahun jalan tanpa ganti sparepart.", gradient: "from-blue-500 to-indigo-600" },
  { name: "Ahmad Fauzi", company: "Toko Elektronik Berkah", role: "Pemilik", text: "Pembelian mudah, pengiriman cepat, teknisi datang tepat waktu untuk instalasi.", gradient: "from-amber-500 to-orange-600" },
  { name: "Dewi Kusuma", company: "Restoran Nusantara", role: "General Manager", text: "Sistem POS mengubah operasional kami. Kasir lebih cepat dan laporan lebih akurat.", gradient: "from-purple-500 to-pink-600" },
  { name: "Rudi Hermawan", company: "Minimarket Sejahtera", role: "Direktur", text: "After sales terbaik. Saat ada masalah mendadak, tim iware datang dalam 2 jam.", gradient: "from-emerald-500 to-teal-600" },
  { name: "Linda Wijaya", company: "Fashion Store Premium", role: "Store Manager", text: "Scanner dan printer label sangat membantu manajemen stok kami.", gradient: "from-cyan-500 to-sky-600" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsSection() {
  return (
    <PageShell tone="dark" className="relative overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-red-600/[0.03] blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-rose-600/[0.03] blur-3xl" aria-hidden />

        <SectionHeader
          label="Testimoni"
          title={<>Apa kata klien kami</>}
          description="Pengalaman nyata dari bisnis yang sudah memakai produk dan layanan iware."
          dark
          align="center"
          className="mb-16 mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const initials = getInitials(t.name);
            return (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="glass-dark relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.12)] hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Quote Icon Background */}
                <div className="absolute right-6 top-6 text-red-500/10 pointer-events-none" aria-hidden>
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="relative z-10 text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                <footer className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-bold text-white uppercase shadow-sm`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white tracking-wide">{t.name}</p>
                    <p className="text-xs text-white/40 mt-0.5 font-light">
                      {t.role} · <span className="text-white/50">{t.company}</span>
                    </p>
                  </div>
                </footer>
              </motion.article>
            );
          })}
        </div>
    </PageShell>
  );
}
