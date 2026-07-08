import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  label: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: { label: string; to?: string }[];
};

export default function PageHero({ label, title, description, breadcrumbs }: Props) {
  return (
    <div className="bg-neutral-950 pt-24 pb-12 lg:pb-14 border-b border-white/5">
      <div className="section-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-red-400/90 mb-3">
            {label}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.12]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base text-white/55 font-light max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
