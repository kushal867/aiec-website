import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      className="relative flex h-[100svh] items-center overflow-hidden"
    >
      {/* Hero-local darkening: strongest on the left where the copy sits,
          fading out toward the right so the person in frame stays visible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />

      <div className="container-px relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="max-w-[650px]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime"
          >
            Global Education &amp; Career Consultancy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-5 max-w-[600px] select-none font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-paper sm:mt-6 sm:text-[3.5rem] lg:text-[4.75rem] ${
              broken ? "glitch-text" : ""
            }`}
          >
            Your journey to <span className="text-lime">global education</span>{" "}
            starts here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[500px] text-base leading-[1.6] text-paper/70 sm:text-lg"
          >
            Expert guidance for studying abroad, choosing the right
            university, and building your global career.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <motion.button
              data-cursor="talk"
              onClick={onOpenContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 font-display text-sm font-semibold text-ink transition-colors duration-300 hover:bg-lime-dim"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <a
              href="#services"
              data-cursor="view"
              className="underline-sweep font-display text-sm font-semibold text-paper/85"
            >
              Explore Programs
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="absolute bottom-8 right-6 z-10 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-muted sm:right-10"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
