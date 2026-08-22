import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { testPrepData } from "../data/content";

export default function TestPrepIndex() {
  const tests = Object.values(testPrepData);

  return (
    <>
      <PageHeader
        eyebrow="Test Preparation"
        title="Get ready for your test."
        crumbs={[{ label: "Home", href: "/" }, { label: "Test Preparation" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="mb-10">
          <Link
            to="/test-prep/compare"
            data-cursor="view"
            className="group inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-lime"
          >
            <span className="underline-sweep">Which test is right for you?</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="border-t border-line">
          {tests.map((t) => (
            <Link
              key={t.slug}
              to={`/test-prep/${t.slug}`}
              data-cursor="view"
              className="group flex items-center justify-between gap-6 border-b border-line py-8 sm:py-12"
            >
              <div>
                <span className="font-display text-4xl font-medium text-paper transition-transform duration-300 group-hover:translate-x-3 sm:text-6xl">
                  {t.name}
                </span>
                <p className="mt-2 text-sm text-muted">{t.fullName}</p>
              </div>
              <ArrowRight className="h-6 w-6 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-2 group-hover:text-lime" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
