import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, X, Search } from "lucide-react";

export default function FloatingNav({
  open,
  onToggle,
  onSearch,
}: {
  open: boolean;
  onToggle: () => void;
  onSearch: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
      <Link
        to="/"
        className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper"
      >
        Global Times
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={onSearch}
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-lime hover:text-lime"
        >
          <Search className="h-4 w-4" />
        </button>

        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-paper"
        >
          {open ? "Close" : "Menu"}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-paper/30"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
