import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { stats } from "../data/content";
import AnimatedCounter from "./AnimatedCounter";

const positions = [
  "sm:left-8 sm:top-24 lg:left-16 lg:top-28",
  "sm:right-8 sm:top-24 lg:right-16 lg:top-28",
  "sm:left-8 sm:bottom-28 lg:left-16 lg:bottom-32",
  "sm:right-8 sm:bottom-28 lg:right-16 lg:bottom-32",
];

const align = [
  "items-start text-left",
  "items-end text-right sm:flex-row-reverse",
  "items-start text-left",
  "items-end text-right sm:flex-row-reverse",
];

function StatBlock({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <span className="font-display text-[clamp(2.1rem,6.5vw,3.6rem)] font-light leading-none tracking-tight text-paper/95">
        <AnimatedCounter value={value} suffix={suffix} />
      </span>
      <span className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-lime sm:text-xs">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* vignette: darker at the edges where the stats/CTA sit, lighter
          through the centre so the person stays the visual anchor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(7,9,13,0.55) 78%, rgba(7,9,13,0.8) 100%)",
        }}
      />

      {/* faint editorial grid + corner marks */}
      <div
        className="pointer-events-none absolute inset-6 hidden opacity-[0.08] sm:block sm:inset-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%",
          backgroundPosition: "0 0",
        }}
      />
      <span className="pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 text-sm text-paper/25 sm:block">
        +
      </span>
      <span className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-sm text-paper/25 sm:block">
        +
      </span>

      {/* desktop / tablet — asymmetric floating corners */}
      <div className="relative hidden h-full w-full sm:block">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`absolute flex ${positions[i]} ${align[i]}`}
          >
            <StatBlock value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          </div>
        ))}
      </div>

      {/* mobile — clean 2x2 grid over the same background */}
      <div className="container-px relative flex h-full items-center sm:hidden">
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i % 2 === 1 ? "text-right" : "text-left"}
            >
              <StatBlock value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>

      {onOpenContact && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenContact}
          data-cursor="talk"
          className="group absolute bottom-6 right-6 z-10 inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3 font-display text-sm font-semibold text-ink transition-colors duration-300 hover:bg-lime-dim sm:bottom-10 sm:right-10"
        >
          Talk to a Counsellor
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      )}
    </section>
  );
}
