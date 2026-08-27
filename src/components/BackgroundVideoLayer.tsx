import { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

export default function BackgroundVideoLayer({
  broken = false,
}: {
  broken?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  // Light at the very top (hero) so the video reads clearly, ramping up
  // as content sections need more contrast further down the page.
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 1],
    [0.12, 0.5, 0.72, 0.86]
  );

  // Subtle cursor-driven parallax — a few pixels of drift, nothing more.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 40, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    function onMove(e: MouseEvent) {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      cursorX.set(relX * -14);
      cursorY.set(relY * -14);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink">
      {/* idle drift: a slow, continuous pan independent of scroll/cursor */}
      <motion.div
        className="absolute inset-[-3%]"
        animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.video
          style={{
            scale: scrollScale,
            x: springX,
            y: springY,
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
      </motion.div>

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
