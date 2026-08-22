import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { testPrepData } from "../data/content";

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

export default function TestPage() {
  const { slug } = useParams();
  const openContact = useContactModal();
  const data = slug ? testPrepData[slug] : undefined;

  if (!data) return <Navigate to="/test-prep" replace />;

  return (
    <>
      <PageHeader
        eyebrow="Test Preparation"
        title={data.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Test Preparation", href: "/test-prep" },
          { label: data.name },
        ]}
      />

      <section className="container-px mx-auto max-w-4xl pb-28">
        <Field label={`What is ${data.name}?`}>
          <p className="max-w-2xl leading-relaxed">{data.what}</p>
        </Field>

        <Field label="Who is it for?">
          <p className="max-w-2xl leading-relaxed">{data.who}</p>
        </Field>

        <Field label="Test structure">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data.structure.map((s) => (
              <div key={s.label}>
                <h4 className="font-display text-lg font-semibold text-paper">
                  {s.label}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </Field>

        <Field label="Scoring">
          <p className="max-w-2xl leading-relaxed">{data.scoring}</p>
        </Field>

        <Field label="Preparation">
          <ul className="space-y-2">
            {data.preparation.map((p) => (
              <li key={p} className="flex items-start gap-3 text-paper/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                {p}
              </li>
            ))}
          </ul>
        </Field>

        <Field label="Class options">
          <div className="flex flex-wrap gap-2">
            {data.classOptions.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-paper/85"
              >
                {c}
              </span>
            ))}
          </div>
        </Field>

        <Field label="Mock test">
          <button
            onClick={openContact}
            data-cursor="play"
            className="group flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-lime"
          >
            <span className="underline-sweep">Try a mock test</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </Field>

        <Field label={`${data.name} resources`}>
          <Link
            to="/learning-hub"
            data-cursor="view"
            className="underline-sweep text-paper/85"
          >
            Browse {data.name} guides in the Learning Hub →
          </Link>
        </Field>

        <Field label="FAQ">
          <div className="space-y-4">
            {data.faqs.map((f) => (
              <div key={f.q}>
                <h4 className="font-medium text-paper">{f.q}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Field>

        <button
          onClick={openContact}
          data-cursor="talk"
          className="group mt-12 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">Start {data.name} preparation</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </section>

      <Footer />
    </>
  );
}
