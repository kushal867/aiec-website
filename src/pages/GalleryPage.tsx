import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { galleryItems } from "../data/content";

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the journey."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className={`group relative aspect-square overflow-hidden bg-gradient-to-br ${g.tone}`}
            >
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs leading-snug text-paper">{g.caption}</p>
              </div>
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40" />
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Placeholder gallery — swap in real event and campus photos as they
          come in.
        </p>
      </section>

      <Footer />
    </>
  );
}
