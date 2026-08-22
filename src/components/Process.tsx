import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { process } from "../data/content";

function Word({
  progress,
  index,
  total,
  title,
  desc,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  title: string;
  desc: string;
  step: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    [start, start + 0.05, mid, end - 0.05, end],
    [0.15, 1, 1, 1, 0.15]
  );
  const scale = useTransform(progress, [start, mid, end], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-lime">
        {step}
      </span>
      <h3 className="mt-4 font-display text-[16vw] font-medium uppercase leading-none tracking-tight text-paper sm:text-[9vw]">
        {title}
      </h3>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="process" ref={ref} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <span className="container-px mx-auto w-full max-w-[1600px] font-display text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          How it works
        </span>
        <div className="relative mt-6 h-[50vh] w-full">
          {process.map((p, i) => (
            <Word
              key={p.step}
              progress={scrollYProgress}
              index={i}
              total={process.length}
              step={`0${i + 1}`}
              title={p.title}
              desc={p.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
