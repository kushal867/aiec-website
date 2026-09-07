import { motion } from "framer-motion";
import { process } from "../data/content";

export default function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
            How it works
          </span>
          <span className="font-mono text-xs tracking-wider text-muted">
            4 steps, start to finish
          </span>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="font-display text-4xl font-bold text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-tight text-paper">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.desc}
              </p>
              {i < process.length - 1 && (
                <div className="absolute -right-5 top-3 hidden h-px w-4 bg-line lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
