import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TrustSection from "@/components/TrustSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <StatsSection />
      <TrustSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
};

export default Index;
