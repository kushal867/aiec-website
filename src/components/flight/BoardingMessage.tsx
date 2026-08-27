import { motion } from "framer-motion";

export default function BoardingMessage({
  destination,
  flag,
}: {
  destination: string;
  flag: string;
}) {
  return (
    <div className="container-px relative z-10 mx-auto w-full max-w-[1600px] text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="block font-display text-xs font-semibold uppercase tracking-[0.4em] text-lime"
      >
        Now boarding
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-display text-[clamp(2rem,10vw,3.4rem)] font-medium leading-tight tracking-tight text-paper sm:flex-nowrap sm:text-7xl sm:leading-none"
      >
        <span>{destination}</span>
        <span className="text-[clamp(1.6rem,8vw,2.6rem)] sm:text-5xl">{flag}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mx-auto mt-6 h-px w-16 bg-line"
      />
    </div>
  );
}
