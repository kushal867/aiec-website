import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Headset } from "lucide-react";
import { useMagnetic } from "../lib/useMagnetic";

export default function FloatingCTA({ onOpenContact }: { onOpenContact: () => void }) {
  const [visible, setVisible] = useState(false);
  const counsellor = useMagnetic(0.25);
  const whatsapp = useMagnetic(0.25);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <motion.a
            href="https://wa.me/9771XXXXXXX"
            target="_blank"
            rel="noreferrer"
            data-cursor="talk"
            style={whatsapp.style}
            onMouseMove={whatsapp.onMouseMove}
            onMouseLeave={whatsapp.onMouseLeave}
            whileTap={{ scale: 0.92 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.a>

          <motion.button
            onClick={onOpenContact}
            data-cursor="talk"
            style={counsellor.style}
            onMouseMove={counsellor.onMouseMove}
            onMouseLeave={counsellor.onMouseLeave}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-lime px-5 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-lime/20"
          >
            <Headset className="h-4.5 w-4.5" />
            Talk to a counsellor
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
