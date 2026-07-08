import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PRODUCT_DIR = path.join(ROOT, "product");
const OUT_CATALOG = path.join(ROOT, "src", "data", "product-catalog.json");
const OUT_MEGA = path.join(ROOT, "src", "data", "product-mega-menu.json");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"]);
const SPEC_EXT = new Set([".json", ".txt"]);

// Folder jenis asli (di product/<jenis>) → 1 dari 14 kategori tampilan.
// Jenis yang tidak terdaftar di sini otomatis masuk ke kategori "lainnya".
const CATEGORY_MAP = {
  "thermal printer": "thermal printer",
  "barcode printer": "barcode label printer",
  "mobile printer": "mobile printer",
  "barcode scanner": "barcode scanner",
  "cash drawer": "cash drawer",
  "pos all in one android pos": "all in one pos system",
  "pos all in one": "all in one pos system",
  "mini pc": "mini pc",
  "monitor pc": "monitor pc",
  "self order kiosk": "self order kiosk",
  tablet: "tablet",
  "money counter": "money counter",
  "calling system wireless": "calling system",
  "ht & wt": "walkie talkie & handy talkie",
};
const FALLBACK_CATEGORY = "lainnya";

// Urutan tampil 14 kategori di sidebar produk & mega menu.
const CATEGORY_ORDER = [
  "thermal printer",
  "barcode label printer",
  "mobile printer",
  "barcode scanner",
  "cash drawer",
  "all in one pos system",
  "mini pc",
  "monitor pc",
  "self order kiosk",
  "tablet",
  "money counter",
  "calling system",
  "walkie talkie & handy talkie",
  "lainnya",
];

// Kategori yang selalu tampil meski belum ada produknya sama sekali.
const ALWAYS_SHOW_CATEGORIES = CATEGORY_ORDER;

const MEGA_COLUMNS = [
  {
    title: "iware Print",
    subtitle: "Printer struk, label & mobile",
    jenis: ["thermal printer", "barcode label printer", "mobile printer"],
  },
  {
    title: "iware Scan",
    subtitle: "Barcode scanner & cash drawer",
    jenis: ["barcode scanner", "cash drawer"],
  },
  {
    title: "iware POS",
    subtitle: "Kasir, tablet & periferal",
    jenis: ["all in one pos system", "self order kiosk", "tablet", "money counter"],
  },
  {
    title: "iware Connect",
    subtitle: "Perangkat & sistem lainnya",
    jenis: ["mini pc", "monitor pc", "calling system", "walkie talkie & handy talkie", "lainnya"],
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value) {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

function isImage(name) {
  return IMAGE_EXT.has(path.extname(name).toLowerCase());
}

function sortImages(a, b) {
  const na = Number.parseInt(a.replace(/\D/g, ""), 10);
  const nb = Number.parseInt(b.replace(/\D/g, ""), 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function toAssetUrl(relParts, file) {
  const encoded = [...relParts, file].map((p) => encodeURIComponent(p)).join("/");
  return `/product/${encoded}`;
}

function readSpecs(dir) {
  const specs = {};
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return specs;
  }

  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!SPEC_EXT.has(ext)) continue;
    try {
      const raw = fs.readFileSync(path.join(dir, e.name), "utf8");
      if (ext === ".json") {
        Object.assign(specs, JSON.parse(raw));
      } else {
        for (const line of raw.split(/\r?\n/)) {
          const idx = line.indexOf(":");
          if (idx === -1) continue;
          const key = line.slice(0, idx).trim();
          const val = line.slice(idx + 1).trim();
          if (key && val) specs[key] = val;
        }
      }
    } catch {
      /* ignore invalid spec files */
    }
  }
  return specs;
}

function inferSeries(name, pathParts) {
  if (pathParts.length >= 2) return pathParts[pathParts.length - 2];
  if (pathParts.length === 1) return pathParts[0];
  const prefix = name.match(/^([A-Za-z]{1,5}\d*)/);
  if (prefix) return `${prefix[1]} Series`;
  return "Umum";
}

function parsePrice(val) {
  if (val == null || val === "") return null;
  if (typeof val === "number" && val > 0) return val;
  const n = Number(String(val).replace(/\D/g, ""));
  return n > 0 ? n : null;
}

function inferBrand(name, raw) {
  if (raw.brand || raw.merek) return String(raw.brand || raw.merek);
  const upper = name.toUpperCase();
  if (upper.includes("EPSON")) return "Epson";
  if (upper.includes("HONEYWELL")) return "Honeywell";
  if (upper.includes("ARGOX")) return "Argox";
  const prefixMap = { BI: "Bison", TP: "Iware", IW: "Iware", TH: "Iware", EP: "Epson", MC: "Iware" };
  const m = name.match(/^([A-Za-z]{2})/);
  if (m && prefixMap[m[1].toUpperCase()]) return prefixMap[m[1].toUpperCase()];
  return "Iware";
}

function buildTitle(name, jenisLabel, pathParts, raw) {
  if (raw.title || raw.judul) return String(raw.title || raw.judul);
  const mm = pathParts.find((p) => /\d+\s*mm/i.test(p)) ?? pathParts.find((p) => /mm/i.test(p));
  if (mm) return `${jenisLabel} ${mm} ${name}`;
  return `${jenisLabel} ${name}`;
}

function collectTipes(dir, parts, tipes) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const subdirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith("."));
  const images = entries
    .filter((e) => e.isFile() && isImage(e.name))
    .map((e) => e.name)
    .sort(sortImages);

  if (images.length > 0) {
    const rel = parts.join("/");
    const pathParts = parts.slice(1);
    const label = pathParts.length > 1 ? pathParts.join(" / ") : (pathParts[0] ?? parts[parts.length - 1]);
    const name = parts[parts.length - 1];
    const series = inferSeries(name, pathParts);
    const group = pathParts.length > 0 ? pathParts[0] : series;
    const fileSpecs = readSpecs(dir);
    const jenisLabel = titleCase(parts[0]);
    const title = buildTitle(name, jenisLabel, pathParts, fileSpecs);
    const brand = inferBrand(name, fileSpecs);
    const harga = parsePrice(fileSpecs.harga ?? fileSpecs.price);
    const hargaCoret = parsePrice(fileSpecs.hargaCoret ?? fileSpecs.hargaAsli);

    tipes.push({
      id: rel,
      slug: slugify(rel),
      name,
      label,
      title,
      brand,
      harga,
      hargaCoret,
      series,
      group,
      pathParts,
      thumbnail: toAssetUrl(parts, images[0]),
      images: images.map((file) => toAssetUrl(parts, file)),
      specs: {
        model: name,
        series,
        group,
        kategori: pathParts.join(" › ") || jenisLabel,
        jumlahFoto: images.length,
        merek: brand,
        ...fileSpecs,
      },
    });
  }

  for (const sub of subdirs) {
    collectTipes(path.join(dir, sub.name), [...parts, sub.name], tipes);
  }
}

function buildSeriesGroups(tipes) {
  const map = new Map();
  for (const t of tipes) {
    const key = `${t.group}::${t.series}`;
    if (!map.has(key)) {
      map.set(key, {
        id: slugify(`${t.group}-${t.series}`),
        label: t.series,
        group: t.group,
        description: t.group !== t.series ? t.group : "",
        tipes: [],
      });
    }
    map.get(key).tipes.push(t);
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));
}

function buildFilters(tipes) {
  const groups = new Map();
  for (const t of tipes) {
    groups.set(t.group, (groups.get(t.group) ?? 0) + 1);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: "base" }))
    .map(([label, count]) => ({ id: slugify(label), label, count }));
}

function buildMegaMenu(catalogByJenis) {
  const used = new Set();

  const columns = MEGA_COLUMNS.map((col) => {
    const sections = [];
    for (const jenisName of col.jenis) {
      const cat = catalogByJenis.get(jenisName);
      if (!cat) continue;
      used.add(jenisName);

      sections.push({
        heading: cat.label.toUpperCase(),
        links: [{ label: cat.label, to: `/produk/${cat.slug}` }],
      });
    }

    return {
      title: col.title,
      subtitle: col.subtitle,
      sections,
    };
  }).filter((c) => c.sections.length > 0);

  for (const cat of catalogByJenis.values()) {
    if (used.has(cat.jenis)) continue;
    const last = columns[columns.length - 1];
    if (!last) break;
    last.sections.push({
      heading: cat.label.toUpperCase(),
      links: [{ label: cat.label, to: `/produk/${cat.slug}` }],
    });
  }

  return columns;
}

function buildCatalog() {
  if (!fs.existsSync(PRODUCT_DIR)) {
    console.warn("[catalog] folder product/ tidak ditemukan");
    return [];
  }

  const jenisList = fs
    .readdirSync(PRODUCT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const tipesByCategory = new Map();
  for (const cat of ALWAYS_SHOW_CATEGORIES) tipesByCategory.set(cat, []);

  for (const jenis of jenisList) {
    const tipes = [];
    collectTipes(path.join(PRODUCT_DIR, jenis), [jenis], tipes);
    if (tipes.length === 0) continue;

    const category = CATEGORY_MAP[jenis] ?? FALLBACK_CATEGORY;
    if (!tipesByCategory.has(category)) tipesByCategory.set(category, []);
    tipesByCategory.get(category).push(...tipes);
  }

  const order = [...CATEGORY_ORDER, ...[...tipesByCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c))];

  const catalog = [];
  for (const category of order) {
    const tipes = tipesByCategory.get(category);
    if (!tipes) continue;
    tipes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));

    catalog.push({
      jenis: category,
      slug: slugify(category),
      label: titleCase(category),
      tipes,
      seriesGroups: buildSeriesGroups(tipes),
      filters: buildFilters(tipes),
    });
  }

  return catalog;
}

const catalog = buildCatalog();
const catalogByJenis = new Map(catalog.map((c) => [c.jenis, c]));
const megaMenu = buildMegaMenu(catalogByJenis);
const totalTipes = catalog.reduce((n, c) => n + c.tipes.length, 0);

fs.mkdirSync(path.dirname(OUT_CATALOG), { recursive: true });
fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog, null, 2), "utf8");
fs.writeFileSync(OUT_MEGA, JSON.stringify({ columns: megaMenu }, null, 2), "utf8");

console.log(`[catalog] ${catalog.length} jenis, ${totalTipes} tipe → src/data/product-catalog.json`);
console.log(`[catalog] mega menu ${megaMenu.length} kolom → src/data/product-mega-menu.json`);
