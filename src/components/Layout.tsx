import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import BackgroundVideoLayer from "./BackgroundVideoLayer";
import Particles from "./Particles";
import CustomCursor from "./CustomCursor";
import FloatingNav from "./nav/FloatingNav";
import FullscreenMenu from "./nav/FullscreenMenu";
import SearchOverlay from "./SearchOverlay";
import MobileStickyBar from "./MobileStickyBar";
import ApplyForm from "./ApplyForm";
import FloatingCTA from "./FloatingCTA";
import FlightTransition from "./FlightTransition";
import { ContactContext } from "../lib/contactContext";
import { FlightProvider } from "../lib/flightContext";

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setContactOpen(true);
  };

  return (
    <FlightProvider>
      <ContactContext.Provider value={openContact}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-screen pb-16 sm:pb-0"
        >
          <BackgroundVideoLayer />
          <Particles />
          <div className="grain" />
          <CustomCursor />

          <FloatingNav
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            onSearch={() => setSearchOpen(true)}
          />
          <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
          <FlightTransition />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>

          <ApplyForm open={contactOpen} onClose={() => setContactOpen(false)} />
          <FloatingCTA onOpenContact={openContact} />
          <MobileStickyBar onOpenContact={openContact} />
        </motion.div>
      </ContactContext.Provider>
    </FlightProvider>
  );
}
