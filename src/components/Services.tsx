import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../data/content";

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between gap-6 sm:mb-24"
        >
          <h2 className="font-display text-[9vw] font-medium leading-none text-paper sm:text-6xl">
            What we do.
          </h2>
          <span className="hidden font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime sm:block">
            Services
          </span>
        </motion.div>

        <div className="border-t border-line">
          {services.map((s, i) => {
            const isHovered = hovered === i;
            return (
              <motion.a
                key={s.title}
                href="#contact"
                data-cursor="view"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative flex flex-col gap-3 overflow-hidden border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-9"
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute inset-0 bg-lime"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-baseline gap-4 sm:gap-10">
                  <span
                    className={`font-display text-sm font-semibold transition-colors ${
                      isHovered ? "text-ink/50" : "text-paper/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.h3
                    animate={{ x: isHovered ? 16 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display font-medium tracking-tight transition-colors ${
                      isHovered ? "text-ink" : "text-paper"
                    } text-3xl sm:text-5xl`}
                  >
                    {s.title}
                  </motion.h3>
                </div>

                <p
                  className={`relative z-10 max-w-xs text-sm leading-relaxed transition-colors sm:text-right ${
                    isHovered ? "text-ink/70" : "text-muted"
                  }`}
                >
                  {s.desc}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
