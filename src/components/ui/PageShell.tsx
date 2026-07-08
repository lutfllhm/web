import type { ReactNode } from "react";

type Tone = "light" | "muted" | "dark";

const toneClass: Record<Tone, string> = {
  light: "bg-white text-neutral-900",
  muted: "bg-neutral-50 text-neutral-900",
  dark: "bg-neutral-950 text-white",
};

type Props = {
  children: ReactNode;
  bleed?: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  bordered?: boolean;
};

/** Wrapper section dengan padding & background konsisten */
export default function PageShell({
  children,
  bleed,
  tone = "light",
  className = "",
  id,
  bordered = false,
}: Props) {
  const borderCls = bordered ? "border-y border-neutral-100" : "";

  return (
    <section id={id} className={`section-py ${toneClass[tone]} ${borderCls} ${className}`}>
      <div className="section-container">{children}</div>
      {bleed}
    </section>
  );
}
