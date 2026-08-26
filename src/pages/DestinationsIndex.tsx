import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import DestinationLink from "../components/DestinationLink";
import { destinations } from "../data/content";

export default function DestinationsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Study Abroad"
        title="Find your destination."
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="border-t border-line">
          {destinations.map((d, i) => (
            <motion.div
              key={d.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            >
              <DestinationLink
                to={`/destinations/${d.code}`}
                destination={d.name}
                flag={d.flag}
                className="group flex items-center justify-between gap-6 border-b border-line py-6 sm:py-8"
              >
                <span className="font-display text-3xl font-medium text-paper transition-transform duration-300 group-hover:translate-x-3 sm:text-5xl">
                  {d.name}
                </span>
                <span className="flex items-center gap-4 text-sm text-muted">
                  {d.universities} universities
                  <span className="text-2xl">{d.flag}</span>
                </span>
              </DestinationLink>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
