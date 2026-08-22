import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0.25,
  });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <motion.span ref={ref}>
      {prefix}0{suffix}
    </motion.span>
  );
}
