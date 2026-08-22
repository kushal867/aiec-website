const departures = [
  { flag: "🇺🇸", country: "USA" },
  { flag: "🇦🇺", country: "AUSTRALIA" },
  { flag: "🇯🇵", country: "JAPAN" },
  { flag: "🇬🇧", country: "UNITED KINGDOM" },
  { flag: "🇨🇦", country: "CANADA" },
  { flag: "🇰🇷", country: "SOUTH KOREA" },
];

export default function DepartureTicker() {
  const loop = [...departures, ...departures];

  return (
    <div className="group relative overflow-hidden bg-ink py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee gap-10 [animation-duration:25s] transition-[animation-duration] duration-300 group-hover:[animation-duration:50s]">
        {loop.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-white/70"
          >
            <span>{d.flag}</span>
            <span className="text-white">{d.country}</span>
            <span className="text-lime">↗</span>
          </div>
        ))}
      </div>
    </div>
  );
}
