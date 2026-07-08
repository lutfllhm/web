import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import megaMenuData from "../../data/product-mega-menu.json";
import { featuredCategories } from "../../data/featured-categories";
import { whatsappUrl } from "../../config/site";

function taglineForCategoryLink(to: string): string {
  const [path, query] = to.split("?");
  const slug = query
    ? new URLSearchParams(query).get("kategori") ?? ""
    : path.replace(/^\/produk\//, "");
  return featuredCategories.find((c) => c.slug === slug)?.tagline ?? "";
}

const LOGO_HERO = "/brand-logos/Iware/Iware.png";
const LOGO_SCROLLED = "/brand-logos/Iware/Iware3.png";

type MegaColumn = {
  title: string;
  subtitle: string;
  sections: { heading: string; links: { label: string; to: string }[] }[];
};

const downloadMegaColumns: MegaColumn[] = [
  {
    title: "Download",
    subtitle: "Driver, utility & dokumentasi",
    sections: [
      {
        heading: "DRIVER",
        links: [
          { label: "Download driver", to: "/download#driver" },
          { label: "Pusat unduhan lengkap", to: "/download" },
        ],
      },
    ],
  },
];

const informationMegaColumns: MegaColumn[] = [
  {
    title: "Hot news",
    subtitle: "Update & pengumuman terbaru",
    sections: [
      {
        heading: "HOT NEWS",
        links: [{ label: "Berita hangat", to: "/artikel?tab=hot" }],
      },
    ],
  },
  {
    title: "Artikel",
    subtitle: "Tips, panduan & edukasi",
    sections: [
      {
        heading: "ARTIKEL",
        links: [{ label: "Semua artikel", to: "/artikel" }],
      },
    ],
  },
  {
    title: "FAQ",
    subtitle: "Pertanyaan yang sering diajukan",
    sections: [
      {
        heading: "BANTUAN",
        links: [{ label: "FAQ", to: "/faq" }],
      },
    ],
  },
];

const aboutMegaColumns: MegaColumn[] = [
  {
    title: "Certificate",
    subtitle: "Legalitas & pengakuan resmi",
    sections: [
      {
        heading: "CERTIFICATE",
        links: [{ label: "Sertifikat & penghargaan", to: "/tentang#certificate" }],
      },
    ],
  },
  {
    title: "Video",
    subtitle: "Profil & dokumentasi visual",
    sections: [
      {
        heading: "MEDIA",
        links: [{ label: "Video perusahaan", to: "/tentang#video" }],
      },
    ],
  },
];

type DropdownId = "products" | "download" | "information" | "about";

const DROPDOWN_COLS: Record<DropdownId, string> = {
  products: "grid-cols-4",
  download: "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto",
  information: "grid-cols-3",
  about: "grid-cols-2 max-w-3xl mx-auto",
};

function MegaColumns({
  columns,
  gridClass,
  showHeader = true,
}: {
  columns: MegaColumn[];
  gridClass: string;
  showHeader?: boolean;
}) {
  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {columns.map((col) => (
        <div key={col.title} className="p-5">
          {showHeader && (
            <div className="mb-4 flex items-center gap-2">
              <span className="h-5 w-0.5 rounded-full bg-gradient-to-b from-red-500 to-rose-600" aria-hidden />
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{col.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{col.subtitle}</p>
              </div>
            </div>
          )}
          {col.sections.map((sec) => {
            const headingIsRedundant =
              sec.links.length === 1 && sec.links[0].label.toUpperCase() === sec.heading.toUpperCase();
            return (
            <div key={sec.heading} className="mb-4 last:mb-0">
              {!headingIsRedundant && (
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">{sec.heading}</p>
              )}
              <ul className="space-y-0.5">
                {sec.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 -mx-2 text-sm text-slate-600 transition-all duration-150 hover:bg-white hover:text-red-600 hover:shadow-sm group"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300 transition-all group-hover:w-2.5 group-hover:bg-red-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ProductMegaColumns({ columns }: { columns: MegaColumn[] }) {
  const allLinks = columns.flatMap((col) => col.sections.flatMap((sec) => sec.links));

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {allLinks.map((link) => {
        const tagline = taglineForCategoryLink(link.to);
        return (
          <Link key={link.to + link.label} to={link.to} className="group rounded-xl p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-5 w-0.5 shrink-0 rounded-full bg-gradient-to-b from-red-500 to-rose-600 transition-all group-hover:h-6" aria-hidden />
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{link.label}</p>
            </div>
            {tagline && <p className="pl-2.5 text-[11px] leading-snug text-slate-400">{tagline}</p>}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownId | null>(null);
  const [mobileExpand, setMobileExpand] = useState<DropdownId | null>(null);
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setDropdown(null), 160);
  };

  const openDropdown = (id: DropdownId) => {
    clearCloseTimer();
    setDropdown(id);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
    setMobileExpand(null);
  }, [location.pathname, location.search, location.hash]);

  const activeCls = () =>
    scrolled ? "text-red-600 bg-red-50" : "text-white bg-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]";
  const idleCls = () =>
    scrolled
      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      : "text-white/85 hover:text-white hover:bg-white/10";

  const isHome = location.pathname === "/";
  const isProducts = location.pathname.startsWith("/produk");
  const isDownload = location.pathname.startsWith("/download");
  const isInformation = location.pathname.startsWith("/artikel") || location.pathname === "/faq";
  const isAbout = location.pathname.startsWith("/tentang");

  const triggerClass = (active: boolean, hasChevron: boolean) =>
    `relative flex items-center ${hasChevron ? "gap-1" : ""} px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active ? activeCls() : idleCls()
    }`;

  const underline = (active: boolean) => (
    <span
      className={`pointer-events-none absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-transform duration-300 origin-left ${
        active ? "scale-x-100" : "scale-x-0"
      }`}
      aria-hidden
    />
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_24px_-12px_rgba(0,0,0,0.12)] border-b border-slate-100"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="shrink-0 flex items-center h-9 min-w-[7.5rem] relative">
              <img
                src={LOGO_HERO}
                alt="iware"
                className={`h-9 w-auto object-contain transition-opacity duration-300 ${
                  scrolled ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100"
                }`}
              />
              <img
                src={LOGO_SCROLLED}
                alt="iware"
                className={`h-9 w-auto object-contain transition-opacity duration-300 ${
                  scrolled ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className={triggerClass(isHome, false)}>
                Home
                {underline(isHome)}
              </Link>

              <div className="relative" onMouseEnter={() => openDropdown("products")} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  onClick={() => setDropdown((d) => (d === "products" ? null : "products"))}
                  className={triggerClass(isProducts, true)}
                >
                  Products
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropdown === "products" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {underline(isProducts || dropdown === "products")}
                </button>
              </div>

              <div className="relative" onMouseEnter={() => openDropdown("download")} onMouseLeave={scheduleClose}>
                <Link to="/download" className={triggerClass(isDownload, true)}>
                  Download
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropdown === "download" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {underline(isDownload || dropdown === "download")}
                </Link>
              </div>

              <div className="relative" onMouseEnter={() => openDropdown("information")} onMouseLeave={scheduleClose}>
                <Link to="/artikel" className={triggerClass(isInformation, true)}>
                  Information
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropdown === "information" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {underline(isInformation || dropdown === "information")}
                </Link>
              </div>

              <div className="relative" onMouseEnter={() => openDropdown("about")} onMouseLeave={scheduleClose}>
                <Link to="/tentang" className={triggerClass(isAbout, true)}>
                  About Us
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropdown === "about" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {underline(isAbout || dropdown === "about")}
                </Link>
              </div>
            </nav>

            <div className="hidden lg:flex items-center">
              <Link
                to="/kontak"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Hubungi Kami
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Buka menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span
                  className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {dropdown && (
            <motion.div
              key={dropdown}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
              className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-red-100 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)]"
            >
              <div className="h-[2px] bg-gradient-to-r from-red-500 via-rose-500 to-amber-400" aria-hidden />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
                {dropdown === "products" && (
                  <ProductMegaColumns columns={megaMenuData.columns} />
                )}
                {dropdown === "download" && (
                  <MegaColumns columns={downloadMegaColumns} gridClass={DROPDOWN_COLS.download} />
                )}
                {dropdown === "information" && (
                  <MegaColumns columns={informationMegaColumns} gridClass={DROPDOWN_COLS.information} />
                )}
                {dropdown === "about" && <MegaColumns columns={aboutMegaColumns} gridClass={DROPDOWN_COLS.about} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <img
                  src={LOGO_SCROLLED}
                  alt="iware"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Tutup menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isHome ? "text-red-600 bg-red-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Home
                </Link>

                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpand((e) => (e === "products" ? null : "products"))}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    Products
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileExpand === "products" ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpand === "products" && (
                    <div className="border-t border-slate-100 bg-slate-50/80 px-2 py-2 max-h-64 overflow-y-auto">
                      <Link
                        to="/produk"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm font-semibold text-red-600 hover:bg-white rounded-lg"
                      >
                        Semua produk
                      </Link>
                      {megaMenuData.columns.slice(0, 2).map((col) => (
                        <div key={col.title} className="mt-2 px-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{col.title}</p>
                          {col.sections[0]?.links.slice(0, 4).map((lnk) => (
                            <Link
                              key={lnk.to}
                              to={lnk.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1.5 text-xs text-slate-600 hover:text-red-600"
                            >
                              {lnk.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpand((e) => (e === "download" ? null : "download"))}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    Download
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileExpand === "download" ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpand === "download" && (
                    <div className="border-t border-slate-100 bg-slate-50/80 px-2 py-2 space-y-1">
                      <Link
                        to="/download#driver"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        Download driver
                      </Link>
                      <Link
                        to="/download"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        Pusat unduhan
                      </Link>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpand((e) => (e === "information" ? null : "information"))}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    Information
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileExpand === "information" ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpand === "information" && (
                    <div className="border-t border-slate-100 bg-slate-50/80 px-2 py-2 space-y-1">
                      <Link
                        to="/artikel?tab=hot"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg font-medium"
                      >
                        HOT NEWS
                      </Link>
                      <Link
                        to="/artikel"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        Artikel
                      </Link>
                      <Link
                        to="/faq"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        FAQ
                      </Link>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpand((e) => (e === "about" ? null : "about"))}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    About Us
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileExpand === "about" ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpand === "about" && (
                    <div className="border-t border-slate-100 bg-slate-50/80 px-2 py-2 space-y-1">
                      <Link
                        to="/tentang#certificate"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        Certificate
                      </Link>
                      <Link
                        to="/tentang#video"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-white rounded-lg"
                      >
                        Video
                      </Link>
                      <Link
                        to="/tentang"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm font-semibold text-red-600 hover:bg-white rounded-lg"
                      >
                        Halaman tentang
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
              <div className="p-4 border-t border-slate-100">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
