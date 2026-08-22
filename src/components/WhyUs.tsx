import { motion } from "framer-motion";
import { whyUs } from "../data/content";

export default function WhyUs() {
  return (
    <section id="about" className="relative py-32 sm:py-48">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-paper sm:text-[6vw]"
        >
          We don't just
          <br />
          help you apply.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-paper/40 sm:text-[6vw]"
        >
          We help you move
          <br />
          toward what's next.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-line pt-8 sm:mt-24 sm:grid-cols-4"
        >
          {whyUs.map((w) => (
            <div key={w.title}>
              <h3 className="font-display text-sm font-semibold text-paper">
                {w.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {w.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
