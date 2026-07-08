import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

type Props = {
  items: Crumb[];
  className?: string;
};

export default function Breadcrumbs({ items, className = "" }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/45">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-white/25 select-none" aria-hidden>
                  /
                </span>
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-white/70" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
