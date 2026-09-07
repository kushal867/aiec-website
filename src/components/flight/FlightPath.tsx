import { motion } from "framer-motion";

export default function FlightPath() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="routeGlow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8862f" stopOpacity="0" />
          <stop offset="100%" stopColor="#b8862f" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <motion.path
        d="M -10 82 Q 35 68 55 48 T 112 15"
        fill="none"
        stroke="url(#routeGlow)"
        strokeWidth="0.25"
        strokeDasharray="1 1.6"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          pathLength: { duration: 1.1, delay: 0.2, ease: [0.45, 0, 0.2, 1] },
          opacity: { duration: 1.3, delay: 0.2, times: [0, 0.15, 0.75, 1] },
        }}
      />

      <motion.circle
        r="0.9"
        fill="#b8862f"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{
          offsetDistance: { duration: 1.1, delay: 0.2, ease: [0.45, 0, 0.2, 1] },
          opacity: { duration: 1.3, delay: 0.2, times: [0, 0.1, 0.8, 1] },
        }}
        style={{
          offsetPath: "path('M -10 82 Q 35 68 55 48 T 112 15')",
          filter: "drop-shadow(0 0 3px #b8862f)",
        }}
      />
    </svg>
  );
}
