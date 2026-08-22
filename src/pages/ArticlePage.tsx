import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";
import { articles } from "../data/content";

export default function ArticlePage() {
  const { id } = useParams();
  const openContact = useContactModal();
  const article = articles.find((a) => a.id === id);

  if (!article) return <Navigate to="/learning-hub" replace />;

  return (
    <>
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Learning Hub", href: "/learning-hub" },
          { label: article.title },
        ]}
      />

      <section className="container-px mx-auto max-w-3xl pb-28">
        <p className="text-lg leading-relaxed text-paper/85">{article.excerpt}</p>
        <p className="mt-6 leading-relaxed text-paper/70">
          This guide is being expanded with full detail — in the meantime, a
          counsellor can walk you through this topic directly and answer
          questions specific to your profile.
        </p>

        <button
          onClick={openContact}
          data-cursor="talk"
          className="group mt-10 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-paper"
        >
          <span className="underline-sweep">Need personalized guidance?</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>

        <Link to="/learning-hub" className="mt-6 block w-fit text-sm text-muted underline-sweep">
          ← Back to Learning Hub
        </Link>
      </section>

      <Footer />
    </>
  );
}
