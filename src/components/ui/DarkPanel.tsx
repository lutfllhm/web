import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const darkPanelInnerClass =
  "relative z-10 p-8 sm:p-10 lg:p-12 xl:p-14";

type Props = {
  children: ReactNode;
  className?: string;
  animate?: boolean;
};

/** Panel gelap konsisten — Trust, CTA, dan highlight homepage */
export default function DarkPanel({ children, className = "", animate = true }: Props) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 24 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10 ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-red-600/25 blur-3xl"
        animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-red-950/50 blur-3xl"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(225,29,72,0.18),transparent)]"
      />
      {children}
    </motion.div>
  );
}
