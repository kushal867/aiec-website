import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { runSearch } from "../lib/search";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = runSearch(query);
  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    acc[r.group] = acc[r.group] ? [...acc[r.group], r] : [r];
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/95 px-6 pt-24 backdrop-blur-sm sm:pt-32"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <div className="flex items-center gap-4 border-b border-line pb-4">
              <Search className="h-5 w-5 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent font-display text-xl text-paper placeholder:text-muted focus:outline-none sm:text-2xl"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 max-h-[60vh] space-y-6 overflow-y-auto">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-lime">
                    {group}
                  </span>
                  <div className="mt-2 space-y-1">
                    {items.map((r) => (
                      <Link
                        key={r.label + r.href}
                        to={r.href}
                        onClick={onClose}
                        className="block py-2 text-paper/85 transition-colors hover:text-lime"
                      >
                        <span className="font-medium">{r.label}</span>
                        {r.sub && (
                          <span className="ml-2 text-xs text-muted">{r.sub}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {query && results.length === 0 && (
                <p className="text-sm text-muted">
                  No matches for "{query}" — try a country, test name or topic.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
