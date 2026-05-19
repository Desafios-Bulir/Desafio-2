import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-950/20 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Próximo passo
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A porta de entrada para contratar serviços confiáveis no dia a dia.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Na próxima etapa vamos conectar login, papéis de utilizador e os fluxos de serviços,
            reservas e carteira diretamente a esta experiência inicial.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild size="lg" className="bg-slate-950 text-white hover:bg-slate-800">
            <Link href="#featured-services">
              Ver serviços
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="#how-it-works">Como funciona</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
