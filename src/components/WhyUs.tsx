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
          The paperwork
          <br />
          is the easy part.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-paper/40 sm:text-[6vw]"
        >
          The waiting is
          <br />
          what gets to people.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-muted"
        >
          Most of what we actually do is answer the same question at 11pm
          that you asked at 9am — because for most students, this is the
          first time they've done any of this.
        </motion.p>

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
