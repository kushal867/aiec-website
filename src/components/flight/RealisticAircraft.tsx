export default function RealisticAircraft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fuselage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f1ea" />
          <stop offset="45%" stopColor="#d8d4c8" />
          <stop offset="100%" stopColor="#a8a598" />
        </linearGradient>
        <linearGradient id="wing" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#9fae7a" />
          <stop offset="100%" stopColor="#b8862f" />
        </linearGradient>
        <filter id="planeShadow" x="-40%" y="-40%" width="180%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#07090d" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#planeShadow)">
        {/* far wing (perspective layer) */}
        <path
          d="M118 33 L58 6 L78 6 L132 30 Z"
          fill="url(#wing)"
          opacity="0.55"
        />

        {/* tail stabilizers */}
        <path d="M27 24 L11 3 L34 21 Z" fill="url(#fuselage)" stroke="#5c5c54" strokeWidth="0.6" />
        <path d="M22 40 L6 54 L31 39 Z" fill="url(#fuselage)" stroke="#5c5c54" strokeWidth="0.6" />

        {/* fuselage */}
        <path
          d="M20 23
             C 9 23 4 27 4 31
             C 4 35 9 39 20 39
             L 148 39
             C 168 38 184 34 214 31
             C 184 28 168 24 148 23
             Z"
          fill="url(#fuselage)"
          stroke="#5c5c54"
          strokeWidth="0.7"
        />

        {/* fuselage highlight line */}
        <path
          d="M22 28 L206 30.5"
          stroke="#f4f1ea"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* window strip */}
        <g fill="#3a3d33" opacity="0.55">
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x={44 + i * 9.5} y="26.5" width="4.2" height="2.2" rx="1" />
          ))}
        </g>

        {/* cockpit */}
        <path
          d="M188 27 C 198 27.5 206 29 213 31 C 206 33 198 34.5 188 35 Z"
          fill="#2a2d24"
          opacity="0.75"
        />

        {/* engine */}
        <ellipse cx="98" cy="46" rx="11" ry="5.2" fill="url(#fuselage)" stroke="#5c5c54" strokeWidth="0.6" />
        <ellipse cx="93" cy="46" rx="3.4" ry="4.6" fill="#2a2d24" />

        {/* near wing (main, in front) */}
        <path
          d="M124 34 L46 62 L72 62 L138 33 Z"
          fill="url(#wing)"
          stroke="#7c8a5a"
          strokeWidth="0.6"
        />
        <path d="M78 60 L60 68 L74 60 Z" fill="url(#wing)" opacity="0.9" />
      </g>
    </svg>
  );
}
