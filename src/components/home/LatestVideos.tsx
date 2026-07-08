import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import youtubeBundle from "../../data/youtube-promo-articles.json";
import PageShell from "../ui/PageShell";
import SectionHeader from "../ui/SectionHeader";

type Video = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  youtubeUrl: string;
  thumbnail: string;
};

const videos = (youtubeBundle.videos || []) as Video[];

export default function LatestVideos() {
  // Ambil maksimal 3 video terbaru
  const latestVideos = videos.slice(0, 3);

  if (latestVideos.length === 0) return null;

  return (
    <PageShell tone="light" className="border-t border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          label="Edukasi & Demo"
          title={
            <>
              Video Promosi & <span className="gradient-text-red font-medium">Review Produk</span>
            </>
          }
          description="Tonton demo unit, review fitur, dan panduan penggunaan langsung dari channel YouTube resmi kami."
          labelAccent
          className="max-w-2xl"
        />
        <div className="shrink-0">
          <Link
            to="/artikel?tab=youtube"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-red-600 hover:text-red-600 hover:bg-red-50/20"
          >
            Lihat Semua Video
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {latestVideos.map((vid, i) => (
          <motion.article
            key={vid.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200/60 hover:shadow-lg hover:shadow-red-500/[0.04]"
          >
            {/* Thumbnail Wrapper */}
            <a
              href={vid.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video w-full overflow-hidden bg-neutral-100 block"
            >
              <img
                src={vid.thumbnail}
                alt={vid.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 transition-opacity duration-300 group-hover:bg-black/35" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg ring-4 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:ring-red-600/30">
                  <svg
                    className="ml-0.5 h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* YouTube Tag */}
              <span className="absolute bottom-3 right-3 rounded bg-red-600 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm">
                YouTube
              </span>
            </a>

            {/* Content Wrapper */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600">
                Edukasi & Demo
              </span>
              <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-neutral-900 group-hover:text-red-600 transition-colors">
                <a href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  {vid.title}
                </a>
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-xs font-light leading-relaxed text-neutral-500">
                {vid.excerpt}
              </p>
              
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-light text-neutral-400">
                  {vid.date}
                </span>
                <a
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition-all group-hover:underline"
                >
                  Tonton Sekarang
                  <svg
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
