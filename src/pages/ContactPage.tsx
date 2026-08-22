import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useContactModal } from "../lib/contactContext";

export default function ContactPage() {
  const openContact = useContactModal();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="container-px mx-auto max-w-[1600px] pb-28">
        <div className="grid grid-cols-1 gap-16 border-t border-line pt-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-paper sm:text-4xl">
              Book a free counselling session
            </h2>
            <p className="mt-4 max-w-md text-paper/70">
              Two minutes to fill in, one call to get a clear plan. Our
              counsellors respond within 24 hours.
            </p>
            <button
              onClick={openContact}
              data-cursor="talk"
              className="group mt-8 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide text-lime"
            >
              <span className="underline-sweep">Start your journey</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-paper/85">
              <MapPin className="h-5 w-5 text-lime" />
              Putalisadak, Kathmandu, Nepal
            </div>
            <div className="flex items-center gap-4 text-paper/85">
              <Phone className="h-5 w-5 text-lime" />
              +977 1-4XXXXXX
            </div>
            <div className="flex items-center gap-4 text-paper/85">
              <Mail className="h-5 w-5 text-lime" />
              hello@globaltimeseducation.com
            </div>
            <a
              href="https://wa.me/9771XXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="underline-sweep inline-block text-paper/85"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
