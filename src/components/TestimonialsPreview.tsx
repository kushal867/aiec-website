import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data/content";

export default function TestimonialsPreview() {
  const t = testimonials[0];

  return (
    <section id="stories" className="relative py-28 sm:py-40">
      <div className="container-px mx-auto max-w-[1600px]">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
          Success stories
        </span>

        <Quote className="mt-8 h-6 w-6 text-lime" />
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-paper sm:text-5xl">
          "{t.quote}"
        </p>
        <div className="mt-6 text-xs uppercase tracking-widest text-muted">
          <span className="text-paper">{t.name}</span> — {t.dest}
        </div>

        <Link
          to="/success-stories"
          data-cursor="view"
          className="group mt-10 flex w-fit items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">All success stories</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  );
}
