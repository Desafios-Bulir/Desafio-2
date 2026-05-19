import { Navigation } from "@/components/ui/Navigation";

import { CtaSection } from "@/components/landing/cta-section";
import { HeroHero } from "@/components/landing/hero-hero";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-950">
      <Navigation />

      {/* Hero Section - Full Width */}
      <HeroHero />

      {/* Main Content Sections */}
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Benefits Section */}
        <BenefitsSection />

        {/* Central Question */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-slate-100 to-slate-50 py-16 px-6 text-center border border-slate-200">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Pronto para transformar a forma como os seus serviços são encontrados?
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Junte-se à plataforma que conecta clientes e profissionais de forma segura e eficiente.
          </p>
        </div>

        {/* Testimonial Section */}
        <TestimonialSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* CTA Section */}
        <CtaSection />
      </section>
    </main>
  );
}
