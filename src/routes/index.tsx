import { createFileRoute } from "@tanstack/react-router";
import Background from "@/components/site/Background";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Demos from "@/components/site/Demos";
import VoiceWidget from "@/components/site/VoiceWidget";
import Calculator from "@/components/site/Calculator";
import WhyChoose from "@/components/site/WhyChoose";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import Metrics from "@/components/site/Metrics";
import FAQ from "@/components/site/FAQ";
import CTASection from "@/components/site/CTASection";
import Footer from "@/components/site/Footer";
import StickyMobileCTA from "@/components/site/StickyMobileCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Demos />
        <VoiceWidget />
        <Calculator />
        <WhyChoose />
        <Metrics />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

