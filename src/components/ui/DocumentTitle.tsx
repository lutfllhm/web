import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import catalogData from "../../data/product-catalog.json";

/** Judul tab: "iware | …" — disesuaikan per halaman */
const PAGE_TITLES: Record<string, string> = {
  "/": "Beranda",
  "/produk": "Katalog Produk",
  "/tentang": "Tentang Kami",
  "/kontak": "Kontak",
  "/faq": "FAQ",
  "/artikel": "Artikel",
  "/download": "Download",
};

const BRAND = "iware";

function categoryLabel(slug: string): string | undefined {
  return (catalogData as { slug: string; label: string }[]).find((c) => c.slug === slug)?.label;
}

export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const produkSlug = path.match(/^\/produk\/(.+)$/)?.[1];
    const page = produkSlug ? categoryLabel(produkSlug) ?? "Katalog Produk" : PAGE_TITLES[path] ?? "Halaman";
    document.title = `${BRAND} | ${page}`;
  }, [pathname]);

  return null;
}
