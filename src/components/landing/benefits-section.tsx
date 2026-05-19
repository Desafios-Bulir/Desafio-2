'use client';

import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  "Plataforma segura e intuitiva para contratar serviços",
  "Profissionais verificados e com histórico transparente",
  "Pagamento seguro com saldo validado",
];

export function BenefitsSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
          Por que escolher Bulir
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Tudo que você precisa para encontrar ou prestar serviços.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card
            key={benefit}
            className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400">
                <Check className="h-5 w-5 text-slate-950" />
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">{benefit}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
