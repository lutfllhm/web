import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import PageShell from "../ui/PageShell";
import SectionHeader from "../ui/SectionHeader";

const highlights: {
  value: string;
  label: string;
  icon: ReactNode;
}[] = [
  {
    value: site.stats.clients,
    label: "Klien aktif",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.21a2.25 2.25 0 011.91-2.255 10.962 10.962 0 011.988-.273M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    value: site.stats.products,
    label: "Varian produk",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    value: site.stats.categories,
    label: "Kategori",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    value: site.stats.years,
    label: "Tahun pengalaman",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const trustPoints = ["Garansi resmi distributor", "Instalasi & maintenance", "Support responsif"];

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { end: 0, suffix: value };
  return { end: Number(match[1]), suffix: match[2] };
}

function CountUp({ value, className }: { value: string; className?: string }) {
  const { end, suffix } = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    let cancelled = false;
    const start = performance.now();
    const durationMs = 1400;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(end * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [isInView, end]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

export default function TrustStrip() {
  return (
    <PageShell tone="light" className="border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14"
      >
        <div className="lg:col-span-5">
          <SectionHeader
            labelAccent
            className="max-w-none"
            label="Dipercaya bisnis di Indonesia"
            title={
              <>
                Partner resmi <span className="font-medium">brand teknologi global</span>
              </>
            }
            description="Produk bergaransi resmi, dukungan purna jual, dan tim teknisi berpengalaman untuk instalasi hingga maintenance."
          />

          <ul className="mt-6 flex flex-wrap gap-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/tentang"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Profil perusahaan
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <span className="hidden text-xs text-neutral-400 sm:inline">
              {site.stats.years} pengalaman melayani bisnis
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 lg:col-span-7">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
              className="group bg-white p-5 text-center transition-colors hover:bg-neutral-50 sm:p-6 lg:text-left"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors group-hover:border-red-200 group-hover:text-red-600 lg:mx-0">
                {h.icon}
              </div>
              <p className="text-3xl font-light tabular-nums tracking-tight text-neutral-900 sm:text-4xl">
                <CountUp value={h.value} />
              </p>
              <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-sm">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
