import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { successJourneys } from "../data/content";

export default function SuccessStories() {
  const openContact = useContactModal();

  return (
    <>
      <PageHeader
        eyebrow="Success Stories"
        title="Students who made it abroad."
        crumbs={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="border-t border-line">
          {successJourneys.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="border-b border-line py-10 sm:py-14"
            >
              <p className="max-w-3xl font-display text-2xl font-medium leading-snug text-paper sm:text-4xl">
                "{s.quote}"
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-widest text-muted">
                <span className="text-paper">{s.name}</span>
                <span>→</span>
                <span>{s.test}</span>
                <span>→</span>
                <span>Score {s.score}</span>
                <span>→</span>
                <span>{s.university}</span>
                <span>→</span>
                <span className="text-lime">{s.country}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={openContact}
          data-cursor="talk"
          className="group mt-12 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">Start your own story</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </section>

      <Footer />
    </>
  );
}
