'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TestimonialSection() {
  return (
    <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
      {/* Image */}
      <div className="flex items-center justify-center">
        <div
          className="h-96 w-80 rounded-2xl bg-cover bg-center shadow-xl"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80")',
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
            Depoimento
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Criada para reservares tudo num só lugar.
          </h2>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Com Bulir, contratar serviços profissionais nunca foi tão fácil. Desde clientes até prestadores,
          todos encontram exatamente o que procuram numa plataforma segura, transparente e intuitiva.
        </p>

        <div className="flex gap-3 pt-2">
          <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-500">
            <Link href="#featured-services">
              Explorar serviços
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#how-it-works">Como funciona</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
