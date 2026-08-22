import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { universitySeed, destinations } from "../data/content";

const levels = ["All", "Bachelor", "Master", "Diploma"];
const fields = ["All", "Business", "Engineering", "IT"];

export default function UniversityFinder() {
  const openContact = useContactModal();
  const [country, setCountry] = useState("All");
  const [level, setLevel] = useState("All");
  const [field, setField] = useState("All");

  const results = useMemo(
    () =>
      universitySeed.filter(
        (u) =>
          (country === "All" || u.country === country) &&
          (level === "All" || u.level === level) &&
          (field === "All" || u.field === field)
      ),
    [country, level, field]
  );

  return (
    <>
      <PageHeader
        eyebrow="University Finder"
        title="Search partner universities."
        crumbs={[{ label: "Home", href: "/" }, { label: "University Finder" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-8">
        <div className="flex flex-wrap gap-8 border-y border-line py-6">
          <Filter label="Destination" value={country} onChange={setCountry}>
            <option value="All">All</option>
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </Filter>
          <Filter label="Level" value={level} onChange={setLevel}>
            {levels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Filter>
          <Filter label="Field" value={field} onChange={setField}>
            {fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </Filter>
        </div>
        <p className="mt-4 text-xs text-muted">
          Example listings for planning purposes only — confirm current
          tuition, intake and entry requirements with your counsellor before
          applying.
        </p>
      </section>

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="border-t border-line">
          {results.length === 0 && (
            <p className="py-10 text-sm text-muted">
              No matches — try widening your filters.
            </p>
          )}
          {results.map((u) => (
            <div
              key={u.name}
              className="flex flex-col gap-4 border-b border-line py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-2xl font-medium text-paper sm:text-3xl">
                  {u.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {destinations.find((d) => d.code === u.country)?.name} · {u.field} · {u.level}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-paper/70">
                  <span>Intake: {u.intake}</span>
                  <span>English: {u.englishTest}</span>
                  <span>Tuition: {u.tuitionBand}</span>
                </div>
              </div>
              <button
                onClick={openContact}
                data-cursor="talk"
                className="group flex shrink-0 items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-lime"
              >
                <span className="underline-sweep">Discuss this university</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function Filter({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input w-auto pr-8"
      >
        {children}
      </select>
    </label>
  );
}
