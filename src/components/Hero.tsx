import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({
  broken = false,
  onOpenContact,
}: {
  broken?: boolean;
  onOpenContact: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // As the hero scrolls out of view, let it recede — fade, drift up and
  // scale down slightly — so the next section feels like it settles in
  // underneath, rather than a hard cut.
  const exitOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] items-center overflow-hidden"
    >
      {/* Hero-local darkening: strongest on the left where the copy sits,
          fading out across the middle and right so the person and the
          room behind them stay clearly visible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,8,12,0.70) 0%, rgba(5,8,12,0.42) 38%, rgba(5,8,12,0.18) 70%, rgba(5,8,12,0.10) 100%), linear-gradient(0deg, rgba(5,8,12,0.45) 0%, transparent 45%)",
        }}
      />

      <motion.div
        style={{ opacity: exitOpacity, y: exitY, scale: exitScale }}
        className="container-px relative z-10 mx-auto w-full max-w-[1600px] will-change-transform"
      >
        <div
          className="max-w-[650px]"
          style={{ textShadow: "0 2px 16px rgba(5,8,12,0.55)" }}
        >
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
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 32px rgba(204,255,51,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
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
      </motion.div>

      <motion.div
        style={{ opacity: exitOpacity }}
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
