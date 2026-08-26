import { motion } from "framer-motion";

export default function AtmosphericEffects() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-6 font-mono text-[10px] uppercase tracking-widest text-muted sm:left-10"
      >
        Flight status — departing
      </motion.span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 right-6 font-mono text-[10px] uppercase tracking-widest text-muted sm:right-10"
      >
        Global Times Education
      </motion.span>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
    </>
  );
}
