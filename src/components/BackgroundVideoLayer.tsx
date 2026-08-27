import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundVideoLayer({
  broken = false,
}: {
  broken?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  // Light at the very top (hero) so the video reads clearly, ramping up
  // as content sections need more contrast further down the page.
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 1],
    [0.12, 0.5, 0.72, 0.86]
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink">
      <motion.video
        style={{
          scale,
          filter: broken
            ? "saturate(2.2) hue-rotate(30deg) contrast(1.3)"
            : "brightness(0.85) contrast(1.05)",
        }}
        className="h-full w-full object-cover will-change-transform"
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
