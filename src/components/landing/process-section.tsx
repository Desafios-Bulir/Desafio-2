import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { processSteps } from "./landing-data";

export function ProcessSection() {
  return (
    <section id="how-it-works" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
      <Card className="border-slate-200/80 bg-white/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Como funciona</CardTitle>
          <CardDescription>Fluxo simples para quem oferece e para quem contrata serviços.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          {processSteps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm">
          <CardHeader>
            <CardTitle>Para clientes</CardTitle>
            <CardDescription>Pesquise, compare e contrate com confiança.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm text-slate-600">
            <p>• Visualize serviços disponíveis em tempo real.</p>
            <p>• Contrate apenas com saldo suficiente.</p>
            <p>• Acompanhe o histórico de transações na carteira.</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm">
          <CardHeader>
            <CardTitle>Para prestadores</CardTitle>
            <CardDescription>Publique, edite e acompanhe pedidos no mesmo espaço.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm text-slate-600">
            <p>• Cadastre serviços com título, descrição e preço.</p>
            <p>• Gerencie seus próprios anúncios com segurança.</p>
            <p>• Receba pagamentos e consulte a carteira rapidamente.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
