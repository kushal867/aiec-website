import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { playEngineSound, stopEngineSound } from "./engineSound";

type FlightState = {
  active: boolean;
  destination: string;
  flag: string;
};

type FlightContextValue = {
  state: FlightState;
  flyTo: (path: string, destination: string, flag: string) => void;
};

const FlightContext = createContext<FlightContextValue | null>(null);

const DURATION = 1400;
// Matches the aircraft's entrance delay in FlightTransition.tsx (0.22s)
const ENGINE_START_DELAY = 220;

export function FlightProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, setState] = useState<FlightState>({
    active: false,
    destination: "",
    flag: "",
  });
  const navTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const engineTimeoutRef = useRef<number | null>(null);

  const clearAllTimers = () => {
    if (navTimeoutRef.current) window.clearTimeout(navTimeoutRef.current);
    if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
    if (engineTimeoutRef.current) window.clearTimeout(engineTimeoutRef.current);
  };

  const flyTo = useCallback(
    (path: string, destination: string, flag: string) => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        navigate(path);
        return;
      }

      // Guard against rapid re-clicks: kill any in-flight timers/sound first.
      clearAllTimers();
      stopEngineSound();

      setState({ active: true, destination, flag });

      // Sound starts the instant the aircraft begins moving, and its
      // envelope is sized to finish fading right as navigation occurs.
      engineTimeoutRef.current = window.setTimeout(() => {
        try {
          playEngineSound(DURATION - ENGINE_START_DELAY);
        } catch {
          // Never let audio failures block the visual transition/navigation.
        }
      }, ENGINE_START_DELAY);

      navTimeoutRef.current = window.setTimeout(() => {
        stopEngineSound();
        navigate(path);
        resetTimeoutRef.current = window.setTimeout(() => {
          setState((s) => ({ ...s, active: false }));
        }, 500);
      }, DURATION);
    },
    [navigate]
  );

  useEffect(() => {
    return () => {
      clearAllTimers();
      stopEngineSound();
    };
  }, []);

  return (
    <FlightContext.Provider value={{ state, flyTo }}>
      {children}
    </FlightContext.Provider>
  );
}

export function useFlight() {
  const ctx = useContext(FlightContext);
  if (!ctx) throw new Error("useFlight must be used within FlightProvider");
  return ctx;
}
