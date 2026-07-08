import type { ReactNode } from "react";

type Tone = "white" | "muted";

const fadeClass: Record<Tone, string> = {
  white: "from-white",
  muted: "from-neutral-50",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

/** Area marquee full-bleed dengan fade kiri/kanan */
export default function MarqueeBand({ children, tone = "muted", className = "" }: Props) {
  const from = fadeClass[tone];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r ${from} to-transparent`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l ${from} to-transparent`}
        aria-hidden
      />
      {children}
    </div>
  );
}