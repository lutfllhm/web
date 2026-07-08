import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { site, whatsappUrl } from "../../config/site";
import { featuredCategories, type FeaturedCategory } from "../../data/featured-categories";
import SectionHeader from "../ui/SectionHeader";

const easeOut = [0.16, 1, 0.3, 1] as const;

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  );
}

function CategoryTile({
  item,
  reduceMotion,
}: {
  item: FeaturedCategory;
  reduceMotion: boolean;
}) {
  const [imgErr, setImgErr] = useState(false);
  const href = `/produk/${encodeURIComponent(item.slug)}`;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="h-full"
    >
      <Link
        to={href}
        className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:ring-red-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 sm:min-h-[400px]"
      >
        {/* Panel gambar produk */}
        <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 sm:h-52">
          <div
            className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(225,29,72,0.18),transparent)]"
            aria-hidden
          />
          {/* Luxury light sweep shimmer */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          {!imgErr && item.image ? (
            <img
              src={item.image}
              alt={item.label}
              loading="lazy"
              onError={() => setImgErr(true)}
              className="relative z-10 max-h-[150px] w-auto max-w-[75%] object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] brightness-[1.08] contrast-[1.03] sm:max-h-[170px]"
            />
          ) : null}
        </div>

        {/* Blok teks */}
        <div className="flex flex-1 flex-col px-6 py-6 sm:px-7">
          <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-lg">
            {item.label}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-white/50">
            {item.tagline}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-red-400">
            Pelajari Lebih
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-py relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Floating Mesh Orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-[10%] h-[350px] w-[350px] rounded-full bg-red-600/[0.03] blur-[120px]"
        aria-hidden
      />
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-rose-600/[0.02] blur-[130px]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-neutral-50 to-transparent sm:h-24 opacity-[0.02]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-neutral-50 to-transparent sm:h-24 opacity-[0.02]"
        aria-hidden
      />

      <div className="section-container relative z-10">
        <div className="mb-12 lg:mb-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col items-center"
          >
            <SectionHeader
              dark
              align="center"
              label="Katalog"
              title={<span className="text-5xl sm:text-6xl lg:text-7xl font-semibold">Produk Kami</span>}
              description="POS, printer, scanner, dan perangkat pendukung operasional — kurasi untuk UMKM hingga retail chain."
            />

            <Link
              to="/produk"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-red-600/15 transition-all duration-300 hover:from-red-500 hover:to-rose-500 hover:shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              Lihat Katalog
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Grid 13-14 kategori — satu kartu per kategori, tidak digabung */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredCategories.map((item) => (
            <CategoryTile key={item.slug} item={item} reduceMotion={!!reduceMotion} />
          ))}
        </div>

        {/* CTA terpisah di bawah */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-neutral-900 to-neutral-950 mt-6 lg:mt-8 shadow-lg hover:shadow-red-500/[0.01] hover:border-red-500/10 transition-all duration-300"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-[96px] flex-col gap-5 px-8 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-10">
            <div className="min-w-0 flex-1">
              <p className="text-xl font-semibold sm:text-2xl">Tertarik dengan produk kami?</p>
              <p className="mt-1 text-sm font-light text-white/60">
                Konsultasi gratis — tim iware bantu pilih perangkat yang tepat.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-red-500 hover:bg-red-500/5 hover:-translate-y-0.5 active:translate-y-0"
              >
                Semua Kategori
              </Link>
              <a
                href={whatsappUrl(site.whatsapp.featuredMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
