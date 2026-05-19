import { Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { featuredServices } from "./landing-data";

export function ServicesSection() {
  return (
    <section id="featured-services" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
            Serviços em destaque
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Trabalhadores do dia a dia, prontos para contratação.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-right">
          Exemplos de categorias que a plataforma pode reunir para facilitar a procura do cliente.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {featuredServices.map((service) => (
          <Card
            key={service.title}
            className="border-slate-200/80 bg-white/90 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription className="text-sm leading-6">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between pb-5 pt-0">
              <p className="text-sm font-medium text-amber-600">{service.price}</p>
              <Users className="h-5 w-5 text-slate-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
