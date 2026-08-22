import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw } from "lucide-react";

export default function BreakTheWebsite({
  broken,
  onToggle,
}: {
  broken: boolean;
  onToggle: () => void;
}) {
  const [hint, setHint] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-[90]"
      onMouseEnter={() => setHint(true)}
      onMouseLeave={() => setHint(false)}
    >
      <AnimatePresence>
        {hint && !broken && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -top-8 left-0 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-white/40"
          >
            break the website
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1, rotate: broken ? -8 : 8 }}
        whileTap={{ scale: 0.9 }}
        aria-label={broken ? "Rebuild the website" : "Break the website"}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs transition-colors ${
          broken
            ? "border-red-400 bg-red-500/20 text-red-300"
            : "border-white/15 bg-white/5 text-white/50 hover:text-white/80"
        }`}
      >
        {broken ? <RotateCcw className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
      </motion.button>
    </div>
  );
}
