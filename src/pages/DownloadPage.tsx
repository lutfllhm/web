import { useState } from "react";
import { motion } from "framer-motion";
import { site, whatsappUrl } from "../config/site";

type DownloadItem = {
  name: string;
  desc: string;
  version: string;
  size: string;
  type: string;
  os?: string;
  file?: string;
};

const downloads: { category: string; icon: string; items: DownloadItem[] }[] = [
  {
    category: "Driver Printer",
    icon: "???",
    items: [
      { name: "Driver iware Thermal Printer Series", desc: "Driver universal untuk semua seri thermal printer iware. Mendukung Windows 7/8/10/11 dan macOS.", version: "v3.2.1", size: "12.4 MB", type: "driver", os: "Windows / macOS", file: "#" },
      { name: "Driver Barcode Printer BP-283i", desc: "Driver khusus untuk printer barcode BP-283i. Termasuk utility konfigurasi label.", version: "v2.1.0", size: "8.7 MB", type: "driver", os: "Windows", file: "#" },
      { name: "Driver Barcode Printer BP-429U", desc: "Driver untuk BP-429U dengan dukungan USB dan Ethernet.", version: "v1.8.3", size: "9.2 MB", type: "driver", os: "Windows / Linux", file: "#" },
      { name: "Driver Xprinter Series", desc: "Driver untuk semua produk Xprinter yang didistribusikan iware.", version: "v4.0.2", size: "15.1 MB", type: "driver", os: "Windows", file: "#" },
    ],
  },
  {
    category: "Driver Scanner",
    icon: "??",
    items: [
      { name: "Driver Barcode Scanner USB Series", desc: "Driver plug-and-play untuk scanner USB iware. Biasanya tidak perlu instalasi manual.", version: "v1.5.0", size: "3.2 MB", type: "driver", os: "Windows / macOS", file: "#" },
      { name: "Scanner Configuration Tool", desc: "Utility untuk konfigurasi scanner � ubah mode scan, baud rate, dan pengaturan lainnya.", version: "v2.3.1", size: "5.8 MB", type: "utility", os: "Windows", file: "#" },
    ],
  },
  {
    category: "Software & Utility",
    icon: "??",
    items: [
      { name: "iware Label Designer", desc: "Software desain label barcode. Buat template label dengan mudah, export ke berbagai format.", version: "v5.1.2", size: "28.6 MB", type: "software", os: "Windows", file: "#" },
      { name: "Printer Test Utility", desc: "Tool untuk test print dan diagnosa masalah printer. Berguna untuk troubleshooting.", version: "v1.2.0", size: "2.1 MB", type: "utility", os: "Windows", file: "#" },
      { name: "Barcode Generator", desc: "Generate barcode 1D dan 2D dalam berbagai format (QR, Code128, EAN, dll). Gratis.", version: "v3.0.0", size: "4.5 MB", type: "software", os: "Windows / macOS", file: "#" },
    ],
  },
  {
    category: "Manual & Dokumentasi",
    icon: "??",
    items: [
      { name: "Manual Thermal Printer iware Series", desc: "Panduan lengkap instalasi, penggunaan, dan troubleshooting thermal printer iware.", version: "Rev. 2024", size: "4.2 MB", type: "manual", os: "PDF", file: "#" },
      { name: "Manual Barcode Scanner iware", desc: "Panduan penggunaan dan konfigurasi barcode scanner iware semua seri.", version: "Rev. 2024", size: "3.8 MB", type: "manual", os: "PDF", file: "#" },
      { name: "Panduan Setup POS System", desc: "Langkah-langkah setup sistem kasir lengkap � dari unboxing sampai siap digunakan.", version: "Rev. 2024", size: "6.1 MB", type: "manual", os: "PDF", file: "#" },
      { name: "Katalog Produk iware 2024", desc: "Katalog lengkap semua produk iware beserta spesifikasi dan harga referensi.", version: "2024", size: "18.3 MB", type: "catalog", os: "PDF", file: "#" },
    ],
  },
  {
    category: "Firmware",
    icon: "??",
    items: [
      { name: "Firmware Update BP-283i", desc: "Update firmware terbaru untuk printer BP-283i. Perbaikan bug dan peningkatan stabilitas.", version: "v2.0.5", size: "1.8 MB", type: "firmware", os: "Windows", file: "#" },
      { name: "Firmware Update IW-58LP", desc: "Firmware terbaru untuk printer IW-58LP dengan dukungan koneksi Bluetooth yang lebih stabil.", version: "v1.3.2", size: "1.2 MB", type: "firmware", os: "Windows", file: "#" },
    ],
  },
];

const typeColors: Record<string, string> = {
  driver: "bg-blue-50 text-blue-600",
  software: "bg-purple-50 text-purple-600",
  utility: "bg-green-50 text-green-600",
  manual: "bg-amber-50 text-amber-600",
  catalog: "bg-red-50 text-red-600",
  firmware: "bg-slate-100 text-slate-600",
};

const typeLabels: Record<string, string> = {
  driver: "Driver",
  software: "Software",
  utility: "Utility",
  manual: "Manual",
  catalog: "Katalog",
  firmware: "Firmware",
};

function DownloadCard({ item }: { item: DownloadItem }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all duration-200 hover:border-red-200 hover:shadow-md group">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
        {item.type === "manual" || item.type === "catalog" ? "??" : item.type === "firmware" ? "??" : item.type === "software" ? "??" : "??"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug text-slate-800">{item.name}</h3>
          <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[item.type] || "bg-slate-100 text-slate-600"}`}>
            {typeLabels[item.type] || item.type}
          </span>
        </div>
        <p className="mb-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{item.version}</span>
          <span>�</span>
          <span>{item.size}</span>
          {item.os && (
            <>
              <span>�</span>
              <span>{item.os}</span>
            </>
          )}
        </div>
      </div>
      <a
        href={item.file || "#"}
        onClick={(e) => {
          if (!item.file || item.file === "#") {
            e.preventDefault();
            alert("File akan segera tersedia. Hubungi kami via WhatsApp untuk mendapatkan file ini.");
          }
        }}
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Unduh
      </a>
    </div>
  );
}

export default function DownloadPage() {
  const [search, setSearch] = useState("");

  const filtered = downloads
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const totalItems = downloads.reduce((n, c) => n + c.items.length, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="relative overflow-hidden bg-slate-900 pt-32 pb-16">
        <motion.div className="pointer-events-none absolute bottom-1/3 right-1/3 h-80 w-80 rounded-full bg-red-700/10 blur-3xl" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">Download</p>
            <h1 className="mb-5 text-5xl font-bold text-white lg:text-6xl">
              Driver & <span className="gradient-text">Software</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-300">
              {totalItems} file tersedia � driver, software, manual, dan firmware untuk semua produk iware.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="driver" className="scroll-mt-24 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari driver, software, atau manual..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-amber-700">
              Butuh file yang tidak ada di sini? Hubungi kami via WhatsApp dan kami kirimkan langsung.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-medium text-slate-400">Tidak ada file yang cocok dengan pencarian.</p>
              <button type="button" onClick={() => setSearch("")} className="mt-3 text-sm text-red-600 hover:underline">
                Reset pencarian
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((cat, ci) => (
                <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.08 }}>
                  <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                    <span>{cat.icon}</span>
                    {cat.category}
                    <span className="ml-1 text-xs font-normal text-slate-400">({cat.items.length} file)</span>
                  </h2>
                  <div className="space-y-3">
                    {cat.items.map((item) => (
                      <DownloadCard key={item.name} item={item} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 rounded-2xl border border-slate-100 bg-white p-8 text-center">
            <h3 className="mb-2 text-lg font-bold text-slate-900">File yang Anda cari tidak ada?</h3>
            <p className="mb-5 text-sm text-slate-500">Hubungi kami dan kami bantu carikan atau kirimkan file yang dibutuhkan.</p>
            <a
              href={whatsappUrl(site.whatsapp.downloadMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Minta via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
