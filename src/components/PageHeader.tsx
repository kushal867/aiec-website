import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  eyebrow,
  title,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="container-px mx-auto max-w-[1600px] pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted">
        {crumbs.map((c, i) => (
          <span key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {c.href ? (
              <Link to={c.href} className="hover:text-paper">
                {c.label}
              </Link>
            ) : (
              <span className="text-paper">{c.label}</span>
            )}
          </span>
        ))}
      </div>

      <span className="mt-6 block font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
        {eyebrow}
      </span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 font-display text-[clamp(2.1rem,9vw,3.2rem)] font-medium leading-[1.05] tracking-tight text-paper sm:text-7xl sm:leading-[0.95]"
      >
        {title}
      </motion.h1>
    </div>
  );
}
