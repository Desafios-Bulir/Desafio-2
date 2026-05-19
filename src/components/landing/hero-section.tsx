import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { HeroCarousel } from "./hero-carousel";
import { stats } from "./landing-data";

export function HeroSection() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
          <Sparkles className="h-4 w-4" />
          Plataforma para contratar serviços confiáveis
        </div>

        <div className="space-y-5">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
            Encontre profissionais para limpeza, babysitting, obras e muito mais.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Uma experiência simples para clientes e prestadores: publique serviços, contrate com segurança e
            acompanhe o histórico financeiro da plataforma.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-600 shadow-xl shadow-amber-500/20">
            <Link href="#featured-services">
              Começar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#how-it-works">Entender o fluxo</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-slate-200/80 bg-white/85 shadow-sm backdrop-blur">
              <CardContent className="p-5">
                <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-36 w-36 rounded-full bg-slate-900/10 blur-3xl" />

        <HeroCarousel />

        <Card className="mt-5 border-slate-200/80 bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
          <CardHeader className="space-y-3 border-b border-white/10 bg-white/5 px-6 py-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-200">
              <BadgeCheck className="h-3.5 w-3.5" />
              Fluxo de contratação seguro
            </div>
            <CardTitle className="text-2xl text-white">Tudo o que a plataforma precisa, já numa só tela.</CardTitle>
            <CardDescription className="text-slate-300">
              Clientes contratam com saldo validado. Prestadores acompanham serviços, receitas e histórico.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 px-6 py-6">
            {[
              { label: "Cliente", value: "Saldo inicial: 4000 KZ" },
              { label: "Prestador", value: "Serviços publicados e geridos no painel" },
              { label: "Transações", value: "Saldo debitado e creditado de forma atômica" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-1 text-base font-medium text-white">{item.value}</p>
              </div>
            ))}

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-4 text-amber-100">
              <Wallet className="h-5 w-5" />
              <p className="text-sm leading-6">
                Histórico financeiro com saldo, entradas e saídas visíveis para cada utilizador autenticado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
