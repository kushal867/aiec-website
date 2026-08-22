import { nav } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-line pt-20">
      <div className="container-px mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-semibold text-paper">
              Global Times Education
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Independent study-abroad consultancy — 480+ partner
              universities across 22 countries.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="underline-sweep text-sm text-paper/80"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>University Shortlisting</li>
              <li>Visa Assistance</li>
              <li>Scholarship Guidance</li>
              <li>IELTS / PTE Preparation</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Get in touch
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>Putalisadak, Kathmandu, Nepal</li>
              <li>+977 1-4XXXXXX</li>
              <li>hello@globaltimeseducation.com</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Global Times Education</span>
          <span>Est. 2026</span>
        </div>
      </div>
    </footer>
  );
}
