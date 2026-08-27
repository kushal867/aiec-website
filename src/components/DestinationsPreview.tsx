import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DestinationLink from "./DestinationLink";
import { destinations } from "../data/content";

const list = destinations.slice(0, 5);

export default function DestinationsPreview() {
  const [active, setActive] = useState(0);

  return (
    <section id="destinations" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
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
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-16">
          {/* faint connecting line behind the index column */}
          <div className="pointer-events-none absolute bottom-2 left-1 top-2 hidden w-px bg-line sm:block" />

          <div className="border-t border-line">
            {list.map((d, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActive(i)}
                  className="border-b border-line"
                >
                  <DestinationLink
                    to={`/destinations/${d.code}`}
                    destination={d.name}
                    flag={d.flag}
                    className="flex items-center gap-4 py-5 sm:gap-8 sm:py-7"
                    dataCursor="view"
                  >
                    <span
                      className={`hidden w-6 shrink-0 font-mono text-xs transition-colors duration-300 sm:block ${
                        isActive ? "text-lime" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.span
                      animate={{ x: isActive ? 10 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-display font-medium tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-paper text-[2.1rem] sm:text-5xl"
                          : "text-paper/45 text-[1.9rem] sm:text-4xl"
                      }`}
                    >
                      {d.name}
                    </motion.span>

                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                      transition={{ duration: 0.3 }}
                      className="hidden text-lime sm:block"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>

                    <span className="ml-auto flex items-center gap-3 sm:gap-4">
                      <span
                        className={`whitespace-nowrap text-xs transition-colors duration-300 sm:text-sm ${
                          isActive ? "text-paper/70" : "text-muted"
                        }`}
                      >
                        {d.universities} universities
                      </span>
                      <motion.span
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl sm:text-2xl"
                      >
                        {d.flag}
                      </motion.span>
                    </span>
                  </DestinationLink>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
