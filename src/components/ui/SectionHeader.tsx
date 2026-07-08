import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  labelAccent?: boolean;
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  dark = false,
  labelAccent = false,
  className = "",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto items-center justify-center" : "";
  const titleCls = dark ? "text-white" : "text-neutral-900";
  const descCls = dark ? "text-white/55" : "text-neutral-500";

  const labelBase = `text-[11px] font-medium uppercase tracking-[0.28em] mb-3 flex items-center gap-2 ${
    align === "center" ? "justify-center" : ""
  }`;
  const labelCls = labelAccent
    ? dark
      ? `${labelBase} text-red-400 font-semibold`
      : `${labelBase} text-red-600 font-semibold`
    : dark
      ? `${labelBase} text-white/45`
      : `${labelBase} text-neutral-400`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${alignCls} ${className}`}
    >
      <p className={labelCls}>
        {labelAccent && !dark && (
          <span className="h-px w-6 bg-red-600 shrink-0" aria-hidden />
        )}
        {labelAccent && dark && (
          <span className="h-px w-6 bg-red-500 shrink-0" aria-hidden />
        )}
        {label}
      </p>
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.15] tracking-tight ${titleCls}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg font-light leading-relaxed ${descCls}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
