import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, X } from "lucide-react";
import { destinations } from "../data/content";

type FormState = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  level: string;
  testScore: string;
  scholarshipNeeded: boolean;
  visaRefusedBefore: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  level: "",
  testScore: "",
  scholarshipNeeded: false,
  visaRefusedBefore: false,
};

const steps = ["Your Profile", "Study Plans", "Review"];

export default function ApplyForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/90 px-4 py-10 backdrop-blur-sm sm:items-center sm:py-16"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-xl border border-line bg-ink-soft p-6 sm:p-12"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-lime hover:text-lime"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-lime" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                  Thanks, {form.name.split(" ")[0] || "there"}.
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  A counsellor will reach out within 24 hours to schedule your
                  free session.
                </p>
              </div>
            ) : (
              <>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
                  Step {step + 1} / {steps.length}
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium text-paper sm:text-3xl">
                  {steps[step]}
                </h3>

                <div className="mt-6 flex gap-1.5">
                  {steps.map((s, i) => (
                    <div
                      key={s}
                      className={`h-px flex-1 transition-colors ${
                        i <= step ? "bg-lime" : "bg-line"
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-8">
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div
                        key="s0"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <Field label="Full name">
                          <input
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            className="input"
                            placeholder="Sujata Karki"
                          />
                        </Field>
                        <Field label="Email">
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="input"
                            placeholder="you@example.com"
                          />
                        </Field>
                        <Field label="Phone">
                          <input
                            required
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className="input"
                            placeholder="+977 98XXXXXXXX"
                          />
                        </Field>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <Field label="Preferred destination">
                          <select
                            required
                            value={form.destination}
                            onChange={(e) => update("destination", e.target.value)}
                            className="input"
                          >
                            <option value="">Select a country</option>
                            {destinations.map((d) => (
                              <option key={d.code} value={d.name}>
                                {d.flag} {d.name}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Study level">
                          <select
                            required
                            value={form.level}
                            onChange={(e) => update("level", e.target.value)}
                            className="input"
                          >
                            <option value="">Select level</option>
                            <option>Undergraduate</option>
                            <option>Postgraduate</option>
                            <option>Short Course</option>
                            <option>PhD</option>
                          </select>
                        </Field>
                        <Field label="IELTS / PTE score (if any)">
                          <input
                            value={form.testScore}
                            onChange={(e) => update("testScore", e.target.value)}
                            className="input"
                            placeholder="e.g. IELTS 6.5"
                          />
                        </Field>
                        <div className="flex flex-col gap-3 pt-1">
                          <Checkbox
                            checked={form.scholarshipNeeded}
                            onChange={(v) => update("scholarshipNeeded", v)}
                            label="I'd like scholarship guidance"
                          />
                          <Checkbox
                            checked={form.visaRefusedBefore}
                            onChange={(v) => update("visaRefusedBefore", v)}
                            label="I've had a visa refused before"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-1 text-sm"
                      >
                        <SummaryRow label="Name" value={form.name} />
                        <SummaryRow label="Email" value={form.email} />
                        <SummaryRow label="Phone" value={form.phone} />
                        <SummaryRow label="Destination" value={form.destination} />
                        <SummaryRow label="Level" value={form.level} />
                        <SummaryRow label="Test score" value={form.testScore || "—"} />
                        <SummaryRow
                          label="Scholarship guidance"
                          value={form.scholarshipNeeded ? "Yes" : "No"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted disabled:opacity-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>

                    {step < steps.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={next}
                        data-cursor="talk"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-paper"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        data-cursor="talk"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-ink"
                      >
                        Submit
                        <CheckCircle2 className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-paper">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line bg-transparent text-lime focus:ring-lime"
      />
      {label}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-line py-2">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-paper">{value}</span>
    </div>
  );
}
