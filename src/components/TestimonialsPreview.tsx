import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data/content";

export default function TestimonialsPreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section id="stories" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime"
        >
          Success stories
        </motion.span>

        <div className="relative mt-8 min-h-[220px] sm:min-h-[180px]">
          <Quote className="h-6 w-6 text-lime" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-paper sm:text-5xl">
                "{t.quote}"
              </p>
              <div className="mt-6 text-xs uppercase tracking-widest text-muted">
                <span className="text-paper">{t.name}</span> — {t.dest}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className="group flex items-center py-2"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    i === index ? "w-8 bg-lime" : "w-4 bg-line group-hover:bg-paper/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <Link
            to="/success-stories"
            data-cursor="view"
            className="group flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-paper"
          >
            <span className="underline-sweep">All success stories</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
