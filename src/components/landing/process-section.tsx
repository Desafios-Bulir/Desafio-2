import { CheckCircle2, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { processSteps } from "./landing-data";

export function ProcessSection() {
  const benefitIcons = [Users, Wallet, CheckCircle2];

  return (
    <section id="how-it-works" className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
      {/* Steps Card */}
      <Card className="border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl">Como funciona</CardTitle>
          <CardDescription>Fluxo simples para quem oferece e para quem contrata serviços.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          {processSteps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 hover:border-slate-300 transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-slate-700 pt-0.5">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Para clientes</CardTitle>
            </div>
            <CardDescription>Pesquise, compare e contrate com confiança.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm text-slate-600">
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p>Visualize serviços disponíveis em tempo real.</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p>Contrate apenas com saldo suficiente.</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p>Acompanhe o histórico de transações na carteira.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <CardTitle className="text-lg">Para prestadores</CardTitle>
            </div>
            <CardDescription>Publique, edite e acompanhe pedidos no mesmo espaço.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm text-slate-600">
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>Cadastre serviços com título, descrição e preço.</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>Gerencie seus próprios anúncios com segurança.</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>Receba pagamentos e consulte a carteira rapidamente.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
