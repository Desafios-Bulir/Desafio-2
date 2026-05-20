import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/ui/Navigation";
import Footer from "@/components/Footer";
import {
  Smartphone,
  Star,
  Plus,
  Wrench,
  Scissors,
  WashingMachine,
  ArrowRight,
} from "lucide-react";


function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function AvatarGroup() {
  const colors = ["bg-[#052a5e]", "bg-teal-400", "bg-indigo-400"];
  const initials = ["G", "B", "D"];
  return (
    <div className="flex -space-x-2">
      {colors.map((c, i) => (
        <div
          key={i}
          className={`h-8 w-8 rounded-full border-2 border-white ${c} flex items-center justify-center text-xs font-bold text-white`}
        >
          {initials[i]}
        </div>
      ))}
    </div>
  );
}

//Main
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section 
        className="relative overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm lg:bg-transparent lg:bg-gradient-to-r lg:from-white/95 lg:via-white/80 lg:to-white/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 lg:grid-cols-2 lg:pt-16 lg:pb-24">

        
            <div className="flex flex-col gap-6">
    
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Encontre o{" "}
                <span className="text-[#052a5e]">profissional ideal</span>{" "}
                rapidamente
              </h2>

              <p className="max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
                Precisa de um ladrilhador, cabeleireiro ou um outro serviço? Conecte-se com prestadores de serviços de
                confiança perto de você, tudo pelo celular.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  id="cta-baixar"
                  className="inline-flex items-center gap-2 rounded-full bg-[#052a5e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-[#031b3e] transition-all hover:-translate-y-0.5"
                >
                  <Smartphone className="h-4 w-4" />
                  Baixar Aplicativo
                </Link>
                <Link
                  href="#seja-prestador"
                  id="cta-profissional"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Sou Profissional
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <AvatarGroup />
                <div>
                  <StarRating />
                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    +2.000 clientes satisfeitos
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
      
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
              </div>

              <div className="relative z-10 w-full max-w-[500px]">
                <Image
                  src="/phone.png"
                  alt="ServiceFind app — encontre profissionais perto de você"
                  width={700}
                  height={450}
                  className="w-full drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Populares e Avaliações Carousel */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Serviços Populares & Feedbacks
            </h2>
            <p className="mt-3 text-gray-500">
              Deslize para ver os serviços mais requisitados e o que nossos clientes dizem.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Service Cards */}
            <div className="snap-center shrink-0">
              <div className="w-64 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Ladrilhador</h3>
                <p className="mt-2 text-sm text-gray-500 flex-1">Instalação e reparo de pisos com acabamento perfeito.</p>
                <div className="mt-4 flex items-center gap-2">
                  <StarRating count={4} />
                  <span className="text-xs font-medium text-gray-600">4.9 (120)</span>
                </div>
              </div>
            </div>

            <div className="snap-center shrink-0">
              <div className="w-64 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Cabeleireiro</h3>
                <p className="mt-2 text-sm text-gray-500 flex-1">Cortes, penteados e tratamentos no conforto de casa.</p>
                <div className="mt-4 flex items-center gap-2">
                  <StarRating count={5} />
                  <span className="text-xs font-medium text-gray-600">4.8 (85)</span>
                </div>
              </div>
            </div>

            <div className="snap-center shrink-0">
              <div className="w-64 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <WashingMachine className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Lavanderia</h3>
                <p className="mt-2 text-sm text-gray-500 flex-1">Lavagem e passagem de roupas com entrega rápida.</p>
                <div className="mt-4 flex items-center gap-2">
                  <StarRating count={5} />
                  <span className="text-xs font-medium text-gray-600">5.0 (200)</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="snap-center shrink-0">
              <div className="w-80 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <StarRating count={5} />
                  <p className="mt-4 text-sm italic leading-relaxed text-gray-600">
                    "Achei uma lavadeira em 10 minutos. O serviço foi muito bem feito, recomendo totalmente a plataforma!"
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Gilson Chipombo</p>
                    <p className="text-xs text-gray-400">Cliente desde 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="snap-center shrink-0">
              <div className="w-80 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <StarRating count={4} />
                  <p className="mt-4 text-sm italic leading-relaxed text-gray-600">
                    "Nunca foi tão fácil encontrar alguém de confiança para o meu cabelo. O ServiceFind facilitou muito minha vida."
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                    D
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Domingos Gemano</p>
                    <p className="text-xs text-gray-400">Cliente desde 2024</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="snap-center shrink-0 flex items-center justify-center pr-4">
              <Link
                href="/register"
                className="flex flex-col items-center justify-center gap-3 group h-full px-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all group-hover:border-blue-300 group-hover:text-blue-500 group-hover:-translate-y-1">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-500 transition-colors">
                  Ver Todos
                </span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Como Funciona
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Em 3 passos simples você encontra o profissional certo para o que precisa.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Busque o serviço", desc: "Pesquise por categoria ou descreva o que precisa.", color: "bg-[#052a5e] text-white" },
              { step: "02", title: "Escolha o profissional", desc: "Veja avaliações, preços e disponibilidade em tempo real.", color: "bg-[#052a5e] text-white" },
              { step: "03", title: "Contrate com segurança", desc: "Pague pela plataforma e avalie após o serviço.", color: "bg-[#052a5e] text-white" },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow bg-black">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold ${color}`}>
                  {step}
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="seja-prestador" className="bg-[#052a5e] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Junte-se a milhares de profissionais e clientes que já usam o ServiceFind.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Criar Conta Grátis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
