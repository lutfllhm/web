/**
 * Ambil video terbaru dari channel YouTube (@handle) lewat RSS resmi,
 * rapikan judul untuk tampilan artikel, tulis ke src/data/youtube-promo-articles.json
 *
 * Tanpa API key — butuh koneksi internet saat script jalan.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../src/data/youtube-promo-articles.json");

const HANDLE = process.env.YOUTUBE_HANDLE ?? "iwaretechindonesia";
const LIMIT = Math.min(12, Math.max(1, Number(process.env.YOUTUBE_LIMIT) || 6));

function decodeXml(text) {
  return text
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'");
}

/** Judul video → judul artikel: tanpa hashtag brand, spasi rapi */
function titleForArticle(raw) {
  let s = decodeXml(raw).replace(/\uFFFD/g, "").trim();
  s = s.replace(/\s*#iware\b/gi, "").replace(/\s*#\s*iware\b/gi, "");
  s = s.replace(/\s+#([\p{L}\p{N}_]+)\s*$/gu, "").trim();
  s = s.replace(/\s{2,}/g, " ");
  if (!s) return raw.trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatIdDate(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(d);
  } catch {
    return "";
  }
}

function parseRssEntries(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const videoId = block.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1]?.trim();
    const titleRaw = block.match(/<title(?:[^>]*)>([^<]*)<\/title>/)?.[1];
    const published = block.match(/<published>([^<]*)<\/published>/)?.[1]?.trim();
    if (!videoId || !titleRaw || !published) continue;
    entries.push({ videoId, titleRaw, published });
  }
  return entries;
}

async function resolveChannelId() {
  const url = `https://www.youtube.com/@${HANDLE}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; iware-site/1.0; +https://iware.id)" },
  });
  if (!res.ok) throw new Error(`Gagal buka halaman channel: ${res.status}`);
  const html = await res.text();
  const match = html.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})\b/);
  if (!match) throw new Error("channelId UC… tidak ditemukan di HTML channel");
  return match[1];
}

async function main() {
  const channelId = await resolveChannelId();
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const rssRes = await fetch(rssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; iware-site/1.0)" },
  });
  if (!rssRes.ok) throw new Error(`Gagal ambil RSS: ${rssRes.status}`);
  const xml = await rssRes.text();
  const parsed = parseRssEntries(xml).slice(0, LIMIT);

  const articles = parsed.map(({ videoId, titleRaw, published }) => {
    const title = titleForArticle(titleRaw);
    return {
      id: `yt-${videoId}`,
      category: "Promosi YouTube",
      title,
      excerpt:
        "Video promosi & edukasi produk dari channel resmi iware Tech Indonesia — tonton lengkapnya di YouTube.",
      date: formatIdDate(published),
      readTime: "Video",
      tag: "YouTube",
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedISO: published,
    };
  });

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ channelId, handle: HANDLE, fetchedAt: new Date().toISOString(), videos: articles }, null, 2), "utf8");
  console.log(`youtube-promo-articles: ${articles.length} video → ${OUT}`);
}

main().catch((e) => {
  console.error(`\x1b[33m[Warning] Gagal mengambil artikel YouTube: ${e.message}\x1b[0m`);
  
  // Jika file output belum ada, buat file fallback kosong agar build/dev server tidak error saat import
  if (!existsSync(OUT)) {
    try {
      mkdirSync(dirname(OUT), { recursive: true });
      writeFileSync(
        OUT,
        JSON.stringify({ channelId: "", handle: HANDLE, fetchedAt: "", videos: [] }, null, 2),
        "utf8"
      );
      console.log(`[Warning] Membuat data youtube fallback kosong di ${OUT}`);
    } catch (writeErr) {
      console.error("Gagal menulis file fallback:", writeErr);
      process.exit(1);
    }
  } else {
    console.log(`[Warning] Menggunakan data youtube yang sudah ada di ${OUT}`);
  }
  
  // Jangan keluar dengan error (exit code 0) agar npm run dev/build tidak gagal
  process.exit(0);
});
