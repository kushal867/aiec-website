import { motion } from "framer-motion";
import { whyUs } from "../data/content";

const linesA = ["The paperwork", "is the easy part."];
const linesB = ["The waiting is", "what gets to people."];

function MaskedLines({
  lines,
  className,
  baseDelay = 0,
}: {
  lines: string[];
  className: string;
  baseDelay?: number;
}) {
  return (
    <h2 className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function WhyUs() {
  return (
    <section id="about" className="relative py-32 sm:py-48">
      <div className="container-px mx-auto max-w-[1600px]">
        <MaskedLines
          lines={linesA}
          baseDelay={0}
          className="font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-paper sm:text-[6vw]"
        />

        <MaskedLines
          lines={linesB}
          baseDelay={0.25}
          className="mt-2 font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-paper/40 sm:text-[6vw]"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
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
          transition={{ duration: 0.8, delay: 0.65 }}
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
