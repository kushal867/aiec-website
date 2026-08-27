import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import WhyUs from "../components/WhyUs";
import Footer from "../components/Footer";
import { trustSignals, team } from "../data/content";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A consultancy built around one person: you."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <WhyUs />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
          Trust
        </span>
        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
          {trustSignals.map((t) => (
            <div key={t} className="flex items-center gap-3 text-paper/85">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {t}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-lime">
            Counsellors
          </span>
          <div className="mt-6 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line font-display text-sm font-semibold text-paper">
                  {t.initials}
                </div>
                <div className="mt-3 text-sm font-semibold text-paper">{t.name}</div>
                <div className="mt-0.5 text-xs text-muted">{t.role}</div>
                <div className="mt-2 text-xs leading-relaxed text-paper/60">{t.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
