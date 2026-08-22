import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { routeNav } from "../../data/content";

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink py-24"
        >
          <nav className="container-px mx-auto w-full max-w-5xl">
            {routeNav.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={l.href}
                  data-cursor="view"
                  onClick={onClose}
                  className="group flex items-baseline gap-6 border-b border-line py-4 sm:py-6"
                >
                  <span className="font-display text-sm font-semibold text-lime">
                    {l.n}
                  </span>
                  <span className="font-display text-3xl font-medium text-paper transition-transform duration-300 ease-out group-hover:translate-x-4 sm:text-5xl lg:text-6xl">
                    {l.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="container-px mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-muted"
          >
            <span>Global Education & Career Consultancy</span>
            <span>Est. 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
