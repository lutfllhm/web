import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import catalogData from "../../data/product-catalog.json";
import PageHero from "../../components/ui/PageHero";
import SectionHeader from "../../components/ui/SectionHeader";

type Product = {
  id: string;
  slug: string;
  name: string;
  label: string;
  title: string;
  brand: string;
  series: string;
  thumbnail: string;
  images: string[];
  specs: Record<string, string | number | null>;
};

type Category = {
  jenis: string;
  slug: string;
  label: string;
  tipes: Product[];
};

const catalog = catalogData as Category[];

export type ShowcaseBadge = "windows" | "intel" | "ram";

export type ShowcaseProduct = {
  bg: string;
  image: string;
  label: string;
  model: string;
  badges?: { type: ShowcaseBadge; text: string }[];
  specs: string[];
  note?: string;
};

export type ShowcaseSpecIcon = "lcd" | "harddisk" | "os" | "ram" | "resolution" | "printer";

export type ShowcaseLightProduct = {
  image: string;
  label: string;
  model: string;
  specs: { icon: ShowcaseSpecIcon; label: string; value: string }[];
  note?: string;
};

export type ShowcaseLightTabItem = {
  model: string;
  specs: { icon: ShowcaseSpecIcon; label: string; value: string }[];
  imageLabel?: { top: string; left: string };
};

export type ShowcaseLightTabsProduct = {
  image: string;
  bg?: string;
  dark?: boolean;
  label: string;
  items: ShowcaseLightTabItem[];
  note?: string;
};

export type CategoryHero = {
  bg: string;
  productImage: string;
  heading: string;
  tagline: string;
  dark?: boolean;
  video?: string;
  videoCaption?: string;
  videoSubCaption?: string;
  showcase?: ShowcaseProduct;
  showcaseLight?: ShowcaseLightProduct;
  showcaseLightTabs?: ShowcaseLightTabsProduct;
};

function BadgeIcon({ type }: { type: ShowcaseBadge }) {
  if (type === "windows") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.2L21 3v8.5h-9.5V4.3ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.3v-7.2Z" />
      </svg>
    );
  }
  if (type === "intel") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M3 4h2.2v16H3V4Zm4 0h2.2v16H7V4Zm14 13.6c0 1.3-1.1 2.4-2.4 2.4-.5 0-1-.2-1.4-.4v-2.3c.3.3.7.5 1.1.5.6 0 1-.5 1-1.1V11h1.7v6.6ZM11.3 8h1.9v2H11.3V8Zm0 4h1.9v8h-1.9v-8Zm4.4-4h5.1v1.8h-5.1V8Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M4 8h16v8H4V8Zm2 2v4h1v-4H6Zm3 0v4h1v-4H9Zm3 0v4h1v-4h-1Zm3 0v4h1v-4h-1Z" />
    </svg>
  );
}

function ShowcaseSpecIconSvg({ icon, value, dark }: { icon: ShowcaseSpecIcon; value?: string; dark?: boolean }) {
  const common = `h-7 w-7 ${dark ? "text-white" : "text-neutral-800"}`;
  if (icon === "lcd") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M9 20h6M12 17v3" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "harddisk") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "os") {
    if (value?.toLowerCase().includes("android")) {
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M6.5 9.5v6a1 1 0 0 0 1 1h.5v2.5a1.3 1.3 0 0 0 2.6 0V16.5h2.8v2.5a1.3 1.3 0 0 0 2.6 0V16.5h.5a1 1 0 0 0 1-1v-6h-11Zm-2 0a1 1 0 0 0-1 1v4a1.3 1.3 0 0 0 2.6 0v-4a1 1 0 0 0-1-1Zm15 0a1 1 0 0 0-1 1v4a1.3 1.3 0 0 0 2.6 0v-4a1 1 0 0 0-1-1Zm-3.04-5.6 1.06-1.84a.4.4 0 0 0-.69-.4l-1.1 1.9a6.8 6.8 0 0 0-5.46 0l-1.1-1.9a.4.4 0 0 0-.69.4l1.06 1.84A6.1 6.1 0 0 0 6.5 8.7h11a6.1 6.1 0 0 0-3.04-4.8ZM9.8 7.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm4.4 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor">
        <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.2L21 3v8.5h-9.5V4.3ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.3v-7.2Z" />
      </svg>
    );
  }
  if (icon === "ram") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="4" y="8" width="16" height="9" rx="1" />
        <path d="M7 8V5M10 8V5M14 8V5M17 8V5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "resolution") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M6 8V4h12v4M5 8h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v3H7v-3H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
      <circle cx="17" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}

function ShowcaseLightSection({ showcase }: { showcase: ShowcaseLightProduct }) {
  return (
    <div className="relative w-full min-h-[420px] overflow-hidden bg-white py-16 sm:min-h-[480px] sm:py-24">
      <div className="section-container relative">
        <div className="relative z-10 max-w-lg">
          <p className="font-sans text-sm font-medium text-neutral-500">{showcase.label}</p>
          <h3 className="mt-1 font-poppins text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {showcase.model}
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
            {showcase.specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <ShowcaseSpecIconSvg icon={spec.icon} value={spec.value} />
                <div>
                  <p className="font-sans text-xs text-neutral-500">{spec.label}</p>
                  <p className="font-poppins text-lg font-bold text-neutral-900">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {showcase.note && (
            <p className="mt-6 border-t border-neutral-200 pt-4 font-sans text-xs font-medium leading-relaxed text-neutral-500">
              {showcase.note}
            </p>
          )}
        </div>
      </div>

      <motion.img
        initial={{ opacity: 0, y: -120 }}
        whileInView={{ opacity: 1, y: "6%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        src={showcase.image}
        alt={showcase.model}
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-[60%] max-w-[640px] translate-x-[8%] object-contain [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.25))_drop-shadow(0_1px_1.5px_rgba(0,0,0,0.45))_drop-shadow(0_-1px_1.5px_rgba(0,0,0,0.45))_drop-shadow(1px_0_1.5px_rgba(0,0,0,0.45))_drop-shadow(-1px_0_1.5px_rgba(0,0,0,0.45))] sm:w-[48%]"
      />
    </div>
  );
}

function ShowcaseLightTabsSection({ showcase }: { showcase: ShowcaseLightTabsProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcase.items.length);
    }, 4000);
    return () => clearInterval(id);
  }, [showcase.items.length]);

  const dark = showcase.dark;

  return (
    <div
      className={`relative w-full min-h-[420px] overflow-hidden bg-cover bg-center bg-no-repeat py-16 sm:min-h-[480px] sm:py-24 ${dark ? "bg-neutral-950" : "bg-white"}`}
      style={showcase.bg ? { backgroundImage: `url("${showcase.bg}")` } : undefined}
    >
      <div className="section-container relative">
        <div className="relative z-10 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.model}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {active.specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <ShowcaseSpecIconSvg icon={spec.icon} value={spec.value} dark={dark} />
                    <div>
                      <p className={`font-sans text-xs ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{spec.label}</p>
                      <p className={`font-poppins text-lg font-bold ${dark ? "text-white" : "text-neutral-900"}`}>{spec.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {showcase.note && (
            <p className={`mt-6 border-t pt-4 font-sans text-xs font-medium leading-relaxed ${dark ? "border-white/15 text-neutral-400" : "border-neutral-200 text-neutral-500"}`}>
              {showcase.note}
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 z-0 w-[74%] max-w-[760px] translate-x-[2%] sm:w-[62%]">
        <motion.img
          initial={{ opacity: 0, y: -120 }}
          whileInView={{ opacity: 1, y: "6%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          src={showcase.image}
          alt={showcase.label}
          className="w-full object-contain [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.25))_drop-shadow(0_1px_1.5px_rgba(0,0,0,0.45))_drop-shadow(0_-1px_1.5px_rgba(0,0,0,0.45))_drop-shadow(1px_0_1.5px_rgba(0,0,0,0.45))_drop-shadow(-1px_0_1.5px_rgba(0,0,0,0.45))]"
        />

        <AnimatePresence mode="wait">
          {active.imageLabel && (
            <motion.div
              key={active.model}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ top: active.imageLabel.top, left: active.imageLabel.left }}
              className="absolute -translate-x-1/2 text-center"
            >
              <p className={`font-sans text-xs font-medium ${dark ? "text-neutral-300" : "text-neutral-500"}`}>{showcase.label}</p>
              <p className={`font-poppins text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-neutral-900"}`}>
                {active.model}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ShowcaseSection({ showcase }: { showcase: ShowcaseProduct }) {
  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat py-16 sm:py-24"
      style={{ backgroundImage: `url("${showcase.bg}")` }}
    >
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center p-4 sm:justify-start sm:p-6"
            >
              <img
                src={showcase.image}
                alt={showcase.model}
                className="w-full max-w-[380px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:max-w-[440px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-4 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.85)] sm:p-6"
            >
              <p className="font-sans text-sm font-medium text-neutral-200">{showcase.label}</p>
              <h3 className="mt-1 font-poppins text-3xl font-extrabold tracking-tight sm:text-4xl">
                {showcase.model}
              </h3>

              {showcase.badges && showcase.badges.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  {showcase.badges.map((badge) => (
                    <div
                      key={badge.type}
                      className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm"
                    >
                      <BadgeIcon type={badge.type} />
                      <span className="text-[10px] font-semibold leading-tight">{badge.text}</span>
                    </div>
                  ))}
                </div>
              )}

              <ul className="mt-5 space-y-1.5 font-sans text-sm leading-relaxed text-neutral-100">
                {showcase.specs.map((spec) => (
                  <li key={spec} className="flex gap-2">
                    <span className="text-neutral-300">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              {showcase.note && (
                <p className="mt-4 border-t border-white/15 pt-3 font-sans text-xs font-medium leading-relaxed text-neutral-200">
                  {showcase.note}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomCategoryHero({ hero, label }: { hero: CategoryHero; label: string }) {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 pt-28 pb-16 sm:pt-32">
        {/* Ambient glow — konsisten dengan hero & section gelap lain di situs */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(225,29,72,0.28),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[10%] top-[10%] h-80 w-80 rounded-full bg-red-600/[0.14] blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[10%] top-[30%] h-72 w-72 rounded-full bg-rose-600/[0.12] blur-[110px]"
          aria-hidden
        />
        {/* Spotlight panggung di bawah produk */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(225,29,72,0.16),transparent)]"
          aria-hidden
        />

        <div className="section-container relative z-10">
          <div className="relative flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400/90"
            >
              Katalog Produk
            </motion.p>
            <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
              {hero.heading}
            </h1>

            <motion.img
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={hero.productImage}
              alt={label}
              className="relative z-10 mt-6 w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-6 mx-auto max-w-2xl text-center font-sans text-sm sm:text-lg lg:text-xl font-light leading-relaxed tracking-wide text-white/60 px-2"
          >
            {hero.tagline}
          </motion.p>
        </div>
      </div>

      {hero.video && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden bg-neutral-950"
        >
          <video
            src={hero.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="block w-full h-auto"
          />
        </motion.div>
      )}

      {hero.video && (hero.videoCaption || hero.videoSubCaption) && (
        <div className="w-full bg-white py-10 sm:py-14">
          <SectionHeader
            align="center"
            label={hero.videoCaption ?? ""}
            title={hero.videoSubCaption}
          />
        </div>
      )}

      {hero.showcase && <ShowcaseSection showcase={hero.showcase} />}
      {hero.showcaseLight && <ShowcaseLightSection showcase={hero.showcaseLight} />}
      {hero.showcaseLightTabs && <ShowcaseLightTabsSection showcase={hero.showcaseLightTabs} />}
    </div>
  );
}

export default function CategoryPageLayout({ slug, hero }: { slug: string; hero?: CategoryHero }) {
  const category = useMemo(() => catalog.find((c) => c.slug === slug), [slug]);
  const products = category?.tipes ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-neutral-50"
    >
      {hero ? (
        <CustomCategoryHero hero={hero} label={category?.label ?? slug} />
      ) : (
        <PageHero
          label="Katalog Produk"
          title={category?.label ?? "Kategori"}
          description={`${products.length} produk tersedia`}
          breadcrumbs={[
            { label: "Beranda", to: "/" },
            { label: "Produk", to: "/produk" },
            { label: category?.label ?? "Kategori" },
          ]}
        />
      )}
    </motion.div>
  );
}
