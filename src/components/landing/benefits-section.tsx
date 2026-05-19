'use client';

import { Shield, Users, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Segurança garantida",
    description: "Plataforma segura e intuitiva para contratar serviços",
    icon: Shield,
  },
  {
    title: "Profissionais verificados",
    description: "Profissionais verificados e com histórico transparente",
    icon: Users,
  },
  {
    title: "Pagamento seguro",
    description: "Pagamento seguro com saldo validado",
    icon: Zap,
  },
];

export function BenefitsSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
          Por que escolher Bulir
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Tudo que você precisa para encontrar ou prestar serviços.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card
              key={benefit.title}
              className="border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-950">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
