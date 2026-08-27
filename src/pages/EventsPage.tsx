import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { events } from "../data/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventsPage() {
  const openContact = useContactModal();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Upcoming sessions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="border-t border-line">
          {events.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="flex flex-col gap-4 border-b border-line py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-lime">
                  {e.type}
                </span>
                <h3 className="mt-2 font-display text-2xl font-medium text-paper sm:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {e.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-paper/70">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-lime" />
                    {formatDate(e.date)} · {e.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-lime" />
                    {e.mode}
                  </span>
                </div>
              </div>

              <button
                onClick={openContact}
                data-cursor="talk"
                className="group flex shrink-0 items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-lime"
              >
                <span className="underline-sweep">Reserve a spot</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted">
          Dates and formats are subject to change — reserving a spot lets a
          counsellor confirm details with you directly.
        </p>
      </section>

      <Footer />
    </>
  );
}
