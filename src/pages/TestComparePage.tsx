import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { testPrepData } from "../data/content";

const comparisonRows: { label: string; pte: string; ielts: string; duolingo: string }[] = [
  { label: "Format", pte: "Fully computer-delivered", ielts: "Computer or paper, face-to-face speaking", duolingo: "At-home, adaptive, computer-delivered" },
  { label: "Duration", pte: "~2 hours", ielts: "~2 hours 45 minutes", duolingo: "~45 minutes" },
  { label: "Speaking method", pte: "Recorded into a microphone", ielts: "Live with a human examiner", duolingo: "Recorded, reviewed alongside score" },
  { label: "Delivery mode", pte: "Test centre", ielts: "Test centre", duolingo: "From home" },
  { label: "Result timing", pte: "~48 hours", ielts: "3–13 days depending on format", duolingo: "~48 hours" },
  { label: "Score scale", pte: "10–90", ielts: "0–9 bands", duolingo: "10–160" },
];

type Priority = "fast" | "human" | "home" | "recognition";

const priorities: { id: Priority; label: string }[] = [
  { id: "fast", label: "I want results fast" },
  { id: "human", label: "I prefer speaking with a real person" },
  { id: "home", label: "I'd rather test from home" },
  { id: "recognition", label: "I want the broadest institutional recognition" },
];

const recommendation: Record<Priority, keyof typeof testPrepData> = {
  fast: "pte",
  human: "ielts",
  home: "duolingo",
  recognition: "ielts",
};

export default function TestComparePage() {
  const openContact = useContactModal();
  const [choice, setChoice] = useState<Priority | null>(null);
  const result = choice ? testPrepData[recommendation[choice]] : null;

  return (
    <>
      <PageHeader
        eyebrow="Test Preparation"
        title="Which test is right for you?"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Test Preparation", href: "/test-prep" },
          { label: "Compare" },
        ]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-20">
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-widest text-muted">
                <th className="py-4 pr-6 font-normal"> </th>
                <th className="py-4 pr-6 font-normal text-lime">PTE</th>
                <th className="py-4 pr-6 font-normal text-lime">IELTS</th>
                <th className="py-4 font-normal text-lime">Duolingo</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-line">
                  <td className="py-4 pr-6 font-medium text-paper">{row.label}</td>
                  <td className="py-4 pr-6 text-paper/70">{row.pte}</td>
                  <td className="py-4 pr-6 text-paper/70">{row.ielts}</td>
                  <td className="py-4 text-paper/70">{row.duolingo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl text-xs text-muted">
          No single test is universally "better" — the right choice depends on
          your target university's requirements and your own strengths.
        </p>
      </section>

      <section className="container-px mx-auto max-w-3xl pb-28">
        <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
          What matters most to you?
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {priorities.map((p) => (
            <button
              key={p.id}
              onClick={() => setChoice(p.id)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                choice === p.id
                  ? "border-lime bg-lime text-ink"
                  : "border-line text-paper/80 hover:border-paper/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-10 border-t border-line pt-8">
            <span className="text-xs uppercase tracking-widest text-muted">
              Based on your preference
            </span>
            <p className="mt-2 font-display text-3xl font-medium text-paper">
              {result.name} may be worth considering.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              This is general guidance, not a guarantee — your counsellor will
              confirm what your specific target universities actually accept.
            </p>
            <button
              onClick={openContact}
              data-cursor="talk"
              className="group mt-8 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-wide text-paper"
            >
              <span className="underline-sweep">Discuss with a counsellor</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
