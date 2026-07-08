import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import PageShell from "../ui/PageShell";
import { site, whatsappUrl } from "../../config/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Konsultasi Gratis",
    desc: "Tim kami siap bantu pilih solusi yang pas — tanpa biaya, tanpa tekanan.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Instalasi & Setup",
    desc: "Teknisi datang ke lokasi, pasang, konfigurasi, dan uji sampai siap operasi.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Technical Support",
    desc: "Respons cepat via WhatsApp, telepon, atau kunjungan langsung.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Maintenance Berkala",
    desc: "Perawatan rutin menjaga performa perangkat tetap optimal.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Training Penggunaan",
    desc: "Pelatihan tim Anda sampai paham cara pakai setiap perangkat.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Custom Solution",
    desc: "Integrasi sistem dan konfigurasi khusus sesuai kebutuhan bisnis Anda.",
  },
];

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <PageShell tone="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-red-500/[0.04] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-neutral-900/[0.03] blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            labelAccent
            label="Layanan Kami"
            title={
              <>
                Lebih dari sekadar <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent font-medium">penjualan</span>
              </>
            }
            description="Kami hadir sebagai mitra jangka panjang — dari konsultasi awal sampai dukungan setelah pembelian."
            className="max-w-none"
          />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl(site.whatsapp.consultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/25 hover:-translate-y-0.5"
            >
              Konsultasi Gratis
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              to="/kontak"
              className="text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
            >
              Hubungi tim kami
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: easeOut }}
              className="group relative rounded-2xl border border-neutral-200/60 bg-white p-7 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-red-500/20 hover:shadow-[0_20px_40px_rgba(239,68,68,0.04)] sm:p-8"
            >
              <span
                className="absolute right-6 top-6 text-[11px] font-bold tabular-nums tracking-wider text-neutral-200 transition-colors group-hover:text-red-300"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100/80 text-red-600 ring-1 ring-red-100/80 transition-all duration-300 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:ring-red-600 group-hover:shadow-md group-hover:shadow-red-600/25">
                {s.icon}
              </div>
              <h3 className="pr-10 text-lg font-semibold tracking-tight text-neutral-900 group-hover:text-red-600 transition-colors">{s.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-neutral-500">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
