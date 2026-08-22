import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const words = ["We help you", "move forward."];

export default function Hero({
  broken = false,
  onOpenContact,
}: {
  broken?: boolean;
  onOpenContact: () => void;
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10"
    >
      <div className="container-px relative z-10 mx-auto w-full max-w-[1600px] flex-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime"
        >
          Global Education &amp; Career Consultancy
        </motion.p>

        <h1
          className={`mt-6 font-display font-medium leading-[0.95] tracking-tight text-paper sm:mt-10 ${
            broken ? "glitch-text" : ""
          }`}
        >
          {words.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block text-[13vw] sm:text-[9vw] lg:text-[7.5vw] ${
                  i === words.length - 1
                    ? "ml-[6vw] text-paper/60 sm:ml-[10vw]"
                    : ""
                }`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      <div className="container-px relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <motion.button
          data-cursor="talk"
          onClick={onOpenContact}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-paper sm:text-xl"
        >
          <span className="underline-sweep">Start your journey</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-muted"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
