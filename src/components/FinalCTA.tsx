import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMagnetic } from "../lib/useMagnetic";

export default function FinalCTA({ onOpen }: { onOpen: () => void }) {
  const magnet = useMagnetic(0.2);

  return (
    <section id="contact" className="relative flex min-h-[90vh] flex-col justify-center py-24">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[16vw] font-medium uppercase leading-[0.9] tracking-tight text-paper sm:text-[10vw]"
        >
          Ready
          <br />
          to move
          <br />
          forward?
        </motion.h2>

        <motion.button
          data-cursor="talk"
          onClick={onOpen}
          style={magnet.style}
          onMouseMove={magnet.onMouseMove}
          onMouseLeave={magnet.onMouseLeave}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group mt-14 flex items-center gap-4 font-display text-xl font-semibold uppercase tracking-wide text-lime sm:text-2xl"
        >
          <span className="underline-sweep">Book a free session</span>
          <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
        </motion.button>
      </div>
    </section>
  );
}
