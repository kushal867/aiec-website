import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundVideoLayer({
  broken = false,
}: {
  broken?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.78, 0.9]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink">
      <motion.video
        style={{
          scale,
          filter: broken
            ? "saturate(2.2) hue-rotate(30deg) contrast(1.3)"
            : "none",
        }}
        className="h-full w-full object-cover opacity-45 will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"
      />

      {broken && (
        <div className="pointer-events-none absolute inset-0 bg-red-500/10 mix-blend-hue" />
      )}
    </div>
  );
}
