import { partnerLogos } from "../data/content";

export default function MarqueeLogos() {
  const loop = [...partnerLogos, ...partnerLogos];

  return (
    <div className="relative z-10 border-b border-line bg-ink/75 py-6 backdrop-blur-md">
      <p className="container-px mx-auto mb-3 max-w-[1600px] font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-lime">
        Trusted pathways to
      </p>
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
              className="whitespace-nowrap font-display text-lg font-medium uppercase tracking-wide text-paper/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
