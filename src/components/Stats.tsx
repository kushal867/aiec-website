import { motion } from "framer-motion";
import { stats } from "../data/content";
import AnimatedCounter from "./AnimatedCounter";

export default function Stats() {
  return (
    <section className="relative py-28 sm:py-40">
      <div className="container-px mx-auto flex max-w-[1600px] flex-col gap-16 sm:gap-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:flex-nowrap sm:gap-10 ${
              i % 2 === 1 ? "flex-row-reverse text-right" : ""
            }`}
          >
            <span className="font-display text-[clamp(2.6rem,17vw,4.2rem)] font-medium leading-none tracking-tight text-paper sm:text-[11vw]">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-lime sm:text-base">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
