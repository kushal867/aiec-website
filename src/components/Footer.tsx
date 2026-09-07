import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Globe2 } from "lucide-react";
import { routeNav } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-line pt-20">
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-lime">
                <Globe2 className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold text-paper">
                Global Times Education
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Independent study-abroad consultancy — 463+ partner
              universities across 21 countries.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {routeNav.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.href}
                    className="underline-sweep text-sm text-paper/80"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>University Shortlisting</li>
              <li>Visa Assistance</li>
              <li>Scholarship Guidance</li>
              <li>IELTS / PTE Preparation</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Get in touch
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-paper/80">Putalisadak, Kathmandu, Nepal</li>
              <li className="text-paper/80">+977 1-4XXXXXX</li>
              <li>
                <a
                  href="mailto:hello@globaltimeseducation.com"
                  className="underline-sweep text-paper/80"
                >
                  hello@globaltimeseducation.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Global Times Education</span>
          <span>Est. 2026</span>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            data-cursor="view"
            className="flex items-center gap-2 text-paper/70 transition-colors hover:text-lime"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
