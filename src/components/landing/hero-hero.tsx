'use client';

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroHero() {
  return (
    <section className="relative -mx-4 -my-6 h-[600px] w-screen overflow-hidden sm:-mx-6 lg:-mx-8 lg:h-[700px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Plataforma para contratar serviços confiáveis
        </div>

        {/* Logo/Heading */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400/90 text-xl font-bold text-slate-950">
            B
          </div>
          <span className="text-3xl font-bold">Bulir</span>
        </div>

        {/* Main Heading */}
        <h1 className="mx-auto mb-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Encontre profissionais para limpeza, babysitting, obras e muito mais.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl">
          Uma experiência simples para clientes e prestadores: publique serviços, contrate com segurança
          e acompanhe o histórico financeiro.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-500">
            <Link href="#featured-services">
              Começar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="#how-it-works">Entender o fluxo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
