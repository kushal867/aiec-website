import { partnerLogos } from "../data/content";

export default function MarqueeLogos() {
  const loop = [...partnerLogos, ...partnerLogos];

  return (
    <div className="border-y border-line py-6">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-14">
          {loop.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-medium uppercase tracking-wide text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
