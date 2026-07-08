import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { site, whatsappUrl } from "../../config/site";
import { heroSlides } from "../../data/hero-slides";
import { btnOutlineOnDark, btnPrimaryHero } from "./home-styles";

const slides = heroSlides;

const SLIDE_MS = 5500;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const slide = slides[active];

  const go = useCallback(
    (dir: 1 | -1) => setActive((p) => (p + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % total), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-neutral-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Banner produk unggulan"
    >
      {/* Foto produk — konten promosi sudah ada di dalam gambar */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[5500ms] ease-linear"
              style={{
                objectPosition: s.objectPosition,
                transform: i === active ? "scale(1.05)" : "scale(1)",
              }}
              loading={i <= 1 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Vignette netral di tepi — tidak menutupi konten tengah gambar */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-neutral-950/95 via-neutral-950/55 to-transparent sm:h-64" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-950/55 via-neutral-950/10 to-transparent" />
      </div>

      {/* CTA di bawah — area aman, tidak bertabrakan dengan teks dalam gambar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-10 text-center sm:pb-12">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-xs"
            >
              {slide.series}
            </motion.p>
          </AnimatePresence>

          <div className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/produk" className={btnPrimaryHero}>
              Lihat Katalog
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={whatsappUrl(site.whatsapp.consultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutlineOnDark}
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>

      {/* Panah navigasi kiri/kanan ala referensi */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="group absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:left-6"
        aria-label="Slide sebelumnya"
      >
        <svg className="h-7 w-7 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="group absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:right-6"
        aria-label="Slide berikutnya"
      >
        <svg className="h-7 w-7 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
