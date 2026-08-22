import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { articles, learningHubCategories } from "../data/content";

export default function LearningHub() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [active]
  );

  return (
    <>
      <PageHeader
        eyebrow="Learning Hub"
        title="Guides, tips & practice."
        crumbs={[{ label: "Home", href: "/" }, { label: "Learning Hub" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-8">
        <div className="flex flex-wrap gap-2 border-y border-line py-6">
          {["All", ...learningHubCategories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === c
                  ? "border-lime bg-lime text-ink"
                  : "border-line text-paper/80 hover:border-paper/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="border-t border-line">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to={`/learning-hub/${a.id}`}
              data-cursor="view"
              className="group flex flex-col gap-2 border-b border-line py-8"
            >
              <span className="text-xs uppercase tracking-widest text-lime">
                {a.category}
              </span>
              <span className="flex items-center justify-between gap-6">
                <span className="font-display text-2xl font-medium text-paper transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                  {a.title}
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-lime" />
              </span>
              <span className="max-w-2xl text-sm text-muted">{a.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
