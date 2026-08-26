import { useState } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import BackgroundVideoLayer from "./BackgroundVideoLayer";
import Particles from "./Particles";
import CustomCursor from "./CustomCursor";
import BreakTheWebsite from "./BreakTheWebsite";
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
  const [broken, setBroken] = useState(false);
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
          className={`relative min-h-screen pb-16 sm:pb-0 ${broken ? "is-broken" : ""}`}
        >
          <BackgroundVideoLayer broken={broken} />
          <Particles broken={broken} />
          <div className="grain" />
          <CustomCursor />
          <BreakTheWebsite broken={broken} onToggle={() => setBroken((b) => !b)} />

          <FloatingNav
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            onSearch={() => setSearchOpen(true)}
          />
          <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
          <FlightTransition />

          <div className="relative z-10">
            <Outlet />
          </div>

          <ApplyForm open={contactOpen} onClose={() => setContactOpen(false)} />
          <FloatingCTA onOpenContact={openContact} />
          <MobileStickyBar onOpenContact={openContact} />
        </motion.div>
      </ContactContext.Provider>
    </FlightProvider>
  );
}
