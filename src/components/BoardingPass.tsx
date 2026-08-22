import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const INTAKE_CLOSE = new Date("2026-11-30T23:59:59");

function getRemaining() {
  const diff = INTAKE_CLOSE.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <motion.span
        key={value}
        initial={{ y: -6, opacity: 0.4 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="font-display text-5xl font-medium tabular-nums text-paper sm:text-7xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
    </div>
  );
}

export default function BoardingPass({ onOpen }: { onOpen: () => void }) {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative border-y border-line py-20 sm:py-28">
      <div className="container-px mx-auto flex max-w-[1600px] flex-col justify-between gap-12 lg:flex-row lg:items-end">
        <div>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
            Fall 2026 Intake — Open
          </span>
          <h3 className="mt-4 font-display text-4xl font-medium text-paper sm:text-6xl">
            Closes in
          </h3>
          <div className="mt-8 flex gap-8 sm:gap-12">
            <TimeBlock value={time.days} label="Days" />
            <TimeBlock value={time.hours} label="Hrs" />
            <TimeBlock value={time.minutes} label="Min" />
            <TimeBlock value={time.seconds} label="Sec" />
          </div>
        </div>

        <motion.button
          onClick={onOpen}
          data-cursor="talk"
          whileTap={{ scale: 0.96 }}
          className="group flex w-fit items-center gap-3 font-display text-sm font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">Confirm my seat</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.button>
      </div>
    </section>
  );
}
