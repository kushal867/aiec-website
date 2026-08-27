import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundVideoLayer({
  broken = false,
}: {
  broken?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.7]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink">
      <motion.div
        style={{
          scale,
          filter: broken ? "saturate(2.2) hue-rotate(30deg) contrast(1.3)" : "none",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <motion.div
          aria-hidden
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-[-10%] h-[55vw] w-[55vw] rounded-full bg-ink-soft blur-[110px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.08, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-1/3 h-[45vw] w-[45vw] rounded-full bg-lime/10 blur-[120px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, 40, -60, 0], y: [0, -20, 40, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-1/4 h-[50vw] w-[50vw] rounded-full bg-paper/10 blur-[130px]"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink"
      />
      {broken && (
        <div className="pointer-events-none absolute inset-0 bg-red-500/10 mix-blend-hue" />
      )}
    </div>
  );
}
