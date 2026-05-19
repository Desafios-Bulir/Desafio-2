import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/ui/Navigation";
import {
  Smartphone,
  Star,
  Plus,
  Wrench,
  Scissors,
  WashingMachine,
  ArrowRight,
} from "lucide-react";

function ServiceCard({ label,
  bgColor,
  Icon,
  imgSrc,
}: {
  label: string;
  bgColor: string;
  Icon: React.ElementType;
  imgSrc: string;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-2 cursor-pointer">
      <div
        className={`relative h-20 w-20 overflow-hidden rounded-2xl ${bgColor} flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-1`}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={label}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <Icon className="h-8 w-8 text-white" />
        )}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

// --- Star Rating ---
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

// --- Avatar Group ---
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

// --- Main Page ---
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-sky-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-65px)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">

        
            <div className="flex flex-col gap-6">

    
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Encontre o{" "}
                <span className="text-[#052a5e]">profissional ideal</span>{" "}
                num piscar de olhos
              </h2>

              <p className="max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
                Precisa de um ladrilhador, cabeleireiro ou um outro serviço? Conecte-se com prestadores de serviços de
                confiança perto de você, tudo pelo celular.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  id="cta-baixar"
                  className="inline-flex items-center gap-2 rounded-full bg-[#052a5e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all hover:-translate-y-0.5"
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
                    +10.000 clientes satisfeitos
                  </p>
                </div>
              </div>


              <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm max-w-sm">
                <StarRating />
                <p className="text-sm leading-relaxed text-gray-600">
                  "Achei uma lavadeira em 10 minutos. O serviço foi muito bem feito!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                    C
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Gilson Chipombo</p>
                    <p className="text-xs text-gray-400">Cliente desde 2023</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Serviços Populares
                </p>
                <div className="flex items-end gap-4 flex-wrap">
                  <ServiceCard
                    label="Ladrilhador"
                    bgColor="bg-gray-100"
                    Icon={Wrench}
                    imgSrc="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=160&h=160&fit=crop"
                  />
                  <ServiceCard
                    label="Cabeleireiro"
                    bgColor="bg-gray-100"
                    Icon={Scissors}
                    imgSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=160&h=160&fit=crop"
                  />
                  <ServiceCard
                    label="Lavanderia"
                    bgColor="bg-gray-100"
                    Icon={WashingMachine}
                    imgSrc="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=160&h=160&fit=crop"
                  />
                  <Link
                    href="/services"
                    className="flex flex-col items-center gap-2 group"
                    id="ver-todos"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 transition-all group-hover:border-blue-300 group-hover:text-blue-500">
                      <Plus className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
                      Ver Todos
                    </span>
                  </Link>
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
                  alt="ServiFind app — encontre profissionais perto de você"
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
              { step: "01", title: "Busque o serviço", desc: "Pesquise por categoria ou descreva o que precisa.", color: "bg-blue-50 text-blue-600" },
              { step: "02", title: "Escolha o profissional", desc: "Veja avaliações, preços e disponibilidade em tempo real.", color: "bg-amber-50 text-amber-600" },
              { step: "03", title: "Contrate com segurança", desc: "Pague pela plataforma e avalie após o serviço.", color: "bg-green-50 text-green-600" },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold ${color}`}>
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
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
            Junte-se a milhares de profissionais e clientes que já usam o ServiFind.
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
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white">
              <Smartphone className="h-4 w-4" />
            </div>
            <span className="font-bold text-gray-900">ServiFind</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ServiFind. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
