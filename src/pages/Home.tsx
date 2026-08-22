import { useContactModal } from "../lib/contactContext";
import DepartureTicker from "../components/DepartureTicker";
import Hero from "../components/Hero";
import QuickAccessBar from "../components/QuickAccessBar";
import MarqueeLogos from "../components/MarqueeLogos";
import Stats from "../components/Stats";
import Services from "../components/Services";
import DestinationsPreview from "../components/DestinationsPreview";
import Process from "../components/Process";
import WhyUs from "../components/WhyUs";
import TestimonialsPreview from "../components/TestimonialsPreview";
import FAQPreview from "../components/FAQPreview";
import BoardingPass from "../components/BoardingPass";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home({ broken = false }: { broken?: boolean }) {
  const openContact = useContactModal();

  return (
    <>
      <DepartureTicker />
      <Hero broken={broken} onOpenContact={openContact} />
      <QuickAccessBar />
      <MarqueeLogos />
      <Stats />
      <Services />
      <DestinationsPreview />
      <Process />
      <WhyUs />
      <TestimonialsPreview />
      <FAQPreview />
      <BoardingPass onOpen={openContact} />
      <FinalCTA onOpen={openContact} />
      <Footer />
    </>
  );
}
