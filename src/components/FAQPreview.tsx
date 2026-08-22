import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const preview = faqs.slice(0, 3);

  return (
    <section id="faq" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
            Common questions
          </span>
          <Link
            to="/faq"
            data-cursor="view"
            className="group flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-paper"
          >
            <span className="underline-sweep">Full FAQ</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-10 border-t border-line">
          {preview.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor="view"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
                >
                  <span className="font-display text-xl font-medium text-paper sm:text-2xl">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-paper"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="max-w-2xl pb-8 text-sm leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
