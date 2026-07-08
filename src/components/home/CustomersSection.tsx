import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import MarqueeBand from "../ui/MarqueeBand";
import PageShell from "../ui/PageShell";
import SectionHeader from "../ui/SectionHeader";
import {
  customerMarqueeRow1,
  customerMarqueeRow2,
  customerSliderSettings,
} from "../../data/customer-logos";

type Customer = { file: string; name: string; logo: string };

function CustomerLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 group flex items-center justify-center w-32 sm:w-36 h-16 px-2">
      <img
        src={logo}
        alt={name}
        draggable={false}
        loading="lazy"
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

/** Lanjutkan marquee dari posisi geser (bukan dari awal). */
function resumeMarqueeFromPosition(
  el: HTMLElement,
  duration: string,
  reverse: boolean
) {
  const currentX = readTranslateX(el);
  const halfWidth = el.scrollWidth / 2;
  if (halfWidth <= 0) return;

  const durationSec = parseDurationSeconds(duration);
  const progress = reverse
    ? (((currentX / halfWidth + 1) % 1) + 1) % 1
    : (((-currentX % halfWidth) + halfWidth) % halfWidth) / halfWidth;

  el.style.transform = "";
  el.style.animation = "";
  el.style.animationDelay = `${-progress * durationSec}s`;
}

function CustomerMarqueeRow({
  items,
  reverse = false,
  duration,
  rowLabel,
}: {
  items: readonly Customer[];
  reverse?: boolean;
  duration: string;
  rowLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startTranslate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollable, autoPlay } = customerSliderSettings;
  const autoRun = autoPlay && !reduceMotion;
  const paused = isDragging || isHovered;

  const trackItems = useMemo(
    () => (autoRun ? [...items, ...items] : [...items]),
    [items, autoRun]
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
        resumeMarqueeFromPosition(el, duration, reverse);
      }
    },
    [scrollable, autoRun, duration, reverse]
  );

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
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
              ? `Logo pelanggan ${rowLabel} — berjalan otomatis, bisa digeser`
              : `Logo pelanggan ${rowLabel} — berjalan otomatis`
            : undefined
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={[
          "flex w-max gap-10 sm:gap-12 items-center px-6 sm:px-10 pb-1",
          autoRun && (reverse ? "marquee-track-reverse" : "marquee-track"),
          scrollable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
          scrollable && "select-none touch-pan-x",
        ]
          .filter(Boolean)
          .join(" ")}
        style={
          autoRun
            ? ({
                ["--marquee-duration" as string]: duration,
                animationPlayState: paused ? "paused" : "running",
              } as CSSProperties)
            : undefined
        }
      >
        {trackItems.map((c, i) => (
          <CustomerLogo key={`${c.file}-${i}`} name={c.name} logo={c.logo} />
        ))}
      </div>
      </div>
  );
}

export default function CustomersSection() {
  const { durationRow1, durationRow2 } = customerSliderSettings;

  return (
    <PageShell
      tone="muted"
      bordered
      className="!pb-0 overflow-hidden"
      bleed={
        <MarqueeBand tone="muted" className="pb-8">
          <div className="relative space-y-5 sm:space-y-6">
            <CustomerMarqueeRow
              items={customerMarqueeRow1}
              duration={durationRow1}
              rowLabel="baris 1"
            />
            <CustomerMarqueeRow
              items={customerMarqueeRow2}
              reverse
              duration={durationRow2}
              rowLabel="baris 2"
            />
          </div>
        </MarqueeBand>
      }
    >
      <SectionHeader
        align="center"
        className="mx-auto max-w-2xl"
        label="Pelanggan Kami"
        title={<>Retail, F&B, dan industri di seluruh Indonesia</>}
        description="Berbagai sektor telah mempercayakan solusi teknologi bisnis mereka bersama kami."
      />
    </PageShell>
  );
}
