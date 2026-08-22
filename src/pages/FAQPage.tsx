import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { faqs, faqCategories } from "../data/content";

export default function FAQPage() {
  const [active, setActive] = useState("General");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    if (query.trim()) {
      return faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));
    }
    return active === "General" ? faqs : faqs;
  }, [active, query]);

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="container-px mx-auto max-w-4xl pb-8">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="flex-1 bg-transparent text-paper placeholder:text-muted focus:outline-none"
          />
        </div>

        {!query && (
          <div className="mt-6 flex flex-wrap gap-2">
            {faqCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active === c
                    ? "border-lime bg-lime text-ink"
                    : "border-line text-paper/80 hover:border-paper/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="container-px mx-auto max-w-4xl pb-28">
        <div className="border-t border-line">
          {filtered.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
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
          {filtered.length === 0 && (
            <p className="py-10 text-sm text-muted">No matching questions.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
