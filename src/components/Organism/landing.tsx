import { LandingNavbar } from "@/components/Molecules/landing/landing-navbar";
import { HeroSection } from "@/components/Molecules/landing/hero-section";
import { FeaturesSection } from "@/components/Molecules/landing/features-section";
import { ResumeBuilderSection } from "@/components/Molecules/landing/resume-builder-section";
import { StatsSection } from "@/components/Molecules/landing/stats-section";
import { ResourcesSection } from "@/components/Molecules/landing/resources-section";
import { PricingSection } from "@/components/Molecules/landing/pricing-section";
import { TestimonialsSection } from "@/components/Molecules/landing/testimonials-section";
import { CtaSection } from "@/components/Molecules/landing/cta-section";
import { LandingFooter } from "@/components/Molecules/landing/landing-footer";

/**
 * Organism: full public landing page composed from section molecules.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ResumeBuilderSection />
        <StatsSection />
        <ResourcesSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
