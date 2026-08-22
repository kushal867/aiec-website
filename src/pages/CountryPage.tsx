import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { countryDetails, destinations } from "../data/content";

const applicationSteps = [
  { n: "01", label: "Counselling" },
  { n: "02", label: "Course Selection" },
  { n: "03", label: "University Shortlist" },
  { n: "04", label: "Application" },
  { n: "05", label: "Offer" },
  { n: "06", label: "Visa" },
  { n: "07", label: "Departure" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-8">
      <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-lime">
        {label}
      </h3>
      <div className="mt-4 text-paper/85">{children}</div>
    </div>
  );
}

export default function CountryPage() {
  const { code } = useParams();
  const openContact = useContactModal();
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const detail = code ? countryDetails[code.toUpperCase()] : undefined;
  const basic = destinations.find((d) => d.code === code?.toUpperCase());

  if (!basic) return <Navigate to="/destinations" replace />;

  return (
    <>
      <PageHeader
        eyebrow="Study Abroad"
        title={basic.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: basic.name },
        ]}
      />

      <section className="container-px mx-auto max-w-4xl pb-28">
        {detail ? (
          <>
            <Field label="Why this destination">
              <p className="max-w-2xl leading-relaxed">{detail.why}</p>
            </Field>

            <Field label="Popular study areas">
              <div className="flex flex-wrap gap-2">
                {detail.popularAreas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-line px-4 py-1.5 text-sm text-paper/85"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </Field>

            <Field label="Intakes">
              <p>{detail.intakes}</p>
            </Field>

            <Field label="Tuition">
              <p className="max-w-2xl leading-relaxed text-paper/70">{detail.tuition}</p>
            </Field>

            <Field label="Living cost">
              <p className="max-w-2xl leading-relaxed text-paper/70">{detail.livingCost}</p>
            </Field>

            <Field label="English requirements">
              <p className="max-w-2xl leading-relaxed">{detail.englishRequirements}</p>
            </Field>

            <Field label="Popular universities">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {detail.popularUniversities.map((u) => (
                  <li key={u} className="text-paper/85">{u}</li>
                ))}
              </ul>
            </Field>

            <Field label="Scholarships">
              <p className="max-w-2xl leading-relaxed">{detail.scholarships}</p>
            </Field>

            <Field label="Admission requirements">
              <ul className="space-y-2">
                {detail.admissionRequirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-paper/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                    {r}
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="Application process">
              <div className="flex flex-wrap gap-x-2 gap-y-4">
                {applicationSteps.map((s, i) => (
                  <span key={s.n} className="flex items-center gap-2">
                    <span className="whitespace-nowrap text-sm text-paper/85">
                      <span className="text-lime">{s.n}</span> {s.label}
                    </span>
                    {i < applicationSteps.length - 1 && (
                      <span className="text-muted">→</span>
                    )}
                  </span>
                ))}
              </div>
            </Field>

            <Field label="FAQ">
              <div className="border-t border-line">
                {detail.faqs.map((f, i) => {
                  const isOpen = faqOpen === i;
                  return (
                    <div key={f.q} className="border-b border-line">
                      <button
                        onClick={() => setFaqOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="font-medium text-paper">{f.q}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <p className="pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Field>
          </>
        ) : (
          <Field label="Overview">
            <p className="max-w-2xl leading-relaxed text-paper/70">
              We support applications to {basic.name} across {basic.universities}{" "}
              partner universities. Detailed country guidance is being added for
              this destination — talk to a counsellor for tuition, intake and
              requirement specifics today.
            </p>
          </Field>
        )}

        <button
          onClick={openContact}
          data-cursor="talk"
          className="group mt-12 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">Talk to a counsellor</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>

        <Link
          to="/destinations"
          className="mt-6 block text-sm text-muted underline-sweep w-fit"
        >
          ← Back to all destinations
        </Link>
      </section>

      <Footer />
    </>
  );
}
