import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { brandLogos, brandSliderSettings } from "../../data/brand-logos";
import MarqueeBand from "../ui/MarqueeBand";
import PageShell from "../ui/PageShell";
import SectionHeader from "../ui/SectionHeader";

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 group flex items-center justify-center w-32 sm:w-36 h-16 px-2">
      <img
        src={logo}
        alt={name}
        draggable={false}
        className="max-h-11 max-w-[7.5rem] w-auto object-contain opacity-95 saturate-100 contrast-[1.02] transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.06] group-hover:saturate-[1.08] pointer-events-none"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-xs font-medium text-neutral-400">${name}</span>`;
          }
        }}
      />
    </div>
  );
}

function readTranslateX(el: HTMLElement): number {
  return new DOMMatrix(getComputedStyle(el).transform).m41;
}

function parseDurationSeconds(duration: string): number {
  const s = duration.trim();
  if (s.endsWith("ms")) return parseFloat(s) / 1000;
  if (s.endsWith("s")) return parseFloat(s);
  return parseFloat(s) || 32;
}

function resumeMarqueeFromPosition(el: HTMLElement, duration: string) {
  const currentX = readTranslateX(el);
  const halfWidth = el.scrollWidth / 2;
  if (halfWidth <= 0) return;

  const durationSec = parseDurationSeconds(duration);
  const progress = (((-currentX % halfWidth) + halfWidth) % halfWidth) / halfWidth;

  el.style.transform = "";
  el.style.animation = "";
  el.style.animationDelay = `${-progress * durationSec}s`;
}

const BRAND_MARQUEE_DURATION = "32s";

export default function BrandSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startTranslate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollable, autoPlay } = brandSliderSettings;
  const autoRun = autoPlay && !reduceMotion;
  const paused = isDragging || isHovered;

  const items = useMemo(
    () => (autoRun ? [...brandLogos, ...brandLogos] : [...brandLogos]),
    [autoRun]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!scrollable || !autoRun) return;
      const el = trackRef.current;
      if (!el) return;

      const currentX = readTranslateX(el);
      el.style.animationDelay = "";
      el.style.animation = "none";
      el.style.transform = `translateX(${currentX}px)`;

      dragRef.current = { active: true, startX: e.clientX, startTranslate: currentX };
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
    },
    [scrollable, autoRun]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!scrollable || !autoRun || !dragRef.current.active) return;
      const el = trackRef.current;
      if (!el) return;
      e.preventDefault();
      const dx = e.clientX - dragRef.current.startX;
      el.style.transform = `translateX(${dragRef.current.startTranslate + dx}px)`;
    },
    [scrollable, autoRun]
  );

  const endDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.active) return;
      const el = trackRef.current;
      dragRef.current.active = false;
      setIsDragging(false);
      el?.releasePointerCapture(e.pointerId);

      if (scrollable && autoRun && el) {
        resumeMarqueeFromPosition(el, BRAND_MARQUEE_DURATION);
      }
    },
    [scrollable, autoRun]
  );

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <PageShell
      tone="muted"
      bordered
      className="!pb-0 overflow-hidden"
      bleed={
        <MarqueeBand tone="muted" className="pb-6">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
          >
            <div
              ref={trackRef}
              role={scrollable ? "region" : undefined}
              aria-label={
                autoRun
                  ? scrollable
                    ? "Logo brand — berjalan otomatis, bisa digeser"
                    : "Logo brand — berjalan otomatis"
                  : undefined
              }
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={[
                "flex w-max gap-10 sm:gap-12 items-center px-6 sm:px-10 pb-1",
                autoRun && "marquee-track",
                scrollable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
                scrollable && "select-none touch-pan-x",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                autoRun
                  ? {
                      ["--marquee-duration" as string]: BRAND_MARQUEE_DURATION,
                      animationPlayState: paused ? "paused" : "running",
                    }
                  : undefined
              }
            >
              {items.map((brand, i) => (
                <BrandLogo key={`${brand.name}-${i}`} name={brand.name} logo={brand.logo} />
              ))}
            </div>
          </div>
        </MarqueeBand>
      }
    >
      <SectionHeader
        align="center"
        className="mx-auto max-w-xl mb-2"
        label="Brand & Partner"
        title={<>Distribusi resmi teknologi bisnis</>}
        description="Bermitra dengan produsen global untuk solusi kasir, cetak, scan, dan jaringan."
      />
      <div className="mb-8" aria-hidden />
    </PageShell>
  );
}
