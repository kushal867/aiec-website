import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { destinations } from "../data/content";

export default function DestinationsPreview() {
  return (
    <section id="destinations" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
            Find your destination
          </span>
          <Link
            to="/destinations"
            data-cursor="view"
            className="group flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-paper"
          >
            <span className="underline-sweep">All destinations</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-10 border-t border-line">
          {destinations.slice(0, 5).map((d, i) => (
            <motion.div
              key={d.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/destinations/${d.code}`}
                data-cursor="view"
                className="group flex items-center justify-between gap-6 border-b border-line py-6 sm:py-8"
              >
                <span className="font-display text-3xl font-medium text-paper transition-transform duration-300 group-hover:translate-x-3 sm:text-5xl">
                  {d.name}
                </span>
                <span className="flex items-center gap-4 text-sm text-muted">
                  {d.universities} universities
                  <span className="text-2xl">{d.flag}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
