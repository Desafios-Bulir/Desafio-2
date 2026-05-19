import { ArrowRight, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { featuredServices } from "./landing-data";

export function ServicesSection() {
  return (
    <section id="featured-services" className="space-y-8">
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

      <div className="grid gap-6 md:grid-cols-3">
        {featuredServices.map((service) => (
          <Card
            key={service.title}
            className="group border border-slate-200/60 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-amber-200 overflow-hidden"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="text-sm leading-6">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="pt-2 border-t border-slate-100">
                <p className="text-sm font-semibold text-amber-600">{service.price}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-200"
              >
                Ver detalhes
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
