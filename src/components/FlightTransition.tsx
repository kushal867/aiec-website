import { AnimatePresence, motion } from "framer-motion";
import { useFlight } from "../lib/flightContext";
import FlightPath from "./flight/FlightPath";
import RealisticAircraft from "./flight/RealisticAircraft";
import BoardingMessage from "./flight/BoardingMessage";
import AtmosphericEffects from "./flight/AtmosphericEffects";

const AIRCRAFT_KEYFRAMES = {
  left: ["-15%", "20%", "55%", "115%"],
  top: ["82%", "60%", "35%", "12%"],
  rotate: [-6, -18, -24, -20],
  scale: [0.55, 0.95, 1.05, 0.8],
  opacity: [0, 1, 1, 0],
};

const TIMES = [0, 0.25, 0.65, 1];

export default function FlightTransition() {
  const { state } = useFlight();

  return (
    <AnimatePresence>
      {state.active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] overflow-hidden bg-ink"
        >
          <AtmosphericEffects />
          <FlightPath />

          <motion.div
            initial={{
              left: AIRCRAFT_KEYFRAMES.left[0],
              top: AIRCRAFT_KEYFRAMES.top[0],
              rotate: AIRCRAFT_KEYFRAMES.rotate[0],
              scale: AIRCRAFT_KEYFRAMES.scale[0],
              opacity: 0,
            }}
            animate={{
              left: AIRCRAFT_KEYFRAMES.left,
              top: AIRCRAFT_KEYFRAMES.top,
              rotate: AIRCRAFT_KEYFRAMES.rotate,
              scale: AIRCRAFT_KEYFRAMES.scale,
              opacity: AIRCRAFT_KEYFRAMES.opacity,
            }}
            transition={{
              duration: 1.15,
              delay: 0.22,
              times: TIMES,
              ease: [0.45, 0, 0.2, 1],
            }}
            className="absolute w-[34vw] max-w-[260px] min-w-[140px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          >
            <RealisticAircraft className="w-full drop-shadow-[0_0_18px_rgba(184,134,47,0.2)]" />
          </motion.div>

          <div className="relative z-10 flex h-full items-center justify-center">
            <BoardingMessage destination={state.destination} flag={state.flag} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
