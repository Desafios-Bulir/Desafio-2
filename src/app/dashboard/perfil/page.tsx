"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuthStore } from "@/store/auth.store";
import { User, Mail, Phone, Shield, Wallet, Save } from "lucide-react";
import { toast } from "sonner";

export default function PerfilPage() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "", 
    phone: "",
  });

  const displayName = user?.fullName || "Utilizador";
  const displayRole = user?.role === "PROVIDER" ? "Prestador de Serviços" : "Cliente";
  const initial = displayName.charAt(0).toUpperCase();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Perfil atualizado com sucesso!");
    }, 1000);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <DashboardHeader title="O Meu Perfil" />

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-4xl">
          
          {/* Card Perfil Principal */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="relative h-32 bg-gradient-to-r from-[#052a5e] to-blue-600">
              <div className="absolute -bottom-10 left-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-blue-500 text-2xl font-bold text-white shadow-md">
                  {initial}
                </div>
              </div>
            </div>
            
            <div className="px-8 pb-6 pt-14">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                  <p className="text-sm font-medium text-gray-500">{displayRole}</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-blue-50/80 px-3 py-1.5 text-xs font-semibold text-[#052a5e]">
                  <Shield className="h-4 w-4" />
                  Conta Verificada
                </div>
              </div>
            </div>
          </div>

    
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
        
            <div className="md:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-base font-bold text-gray-900">Informações Pessoais</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Endereço de Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      disabled
                      value={formData.email || "cliente@email.com"}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-500 outline-none cursor-not-allowed"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">O email não pode ser alterado diretamente.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Contacto Telefónico
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="9XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#052a5e] py-3 text-sm font-bold text-white shadow-md hover:bg-[#031b3e] transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? "A guardar..." : "Guardar Alterações"}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-6">
              
              <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-[#052a5e] to-blue-900 p-6 text-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Wallet className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white/95">
                    Saldo Ativo
                  </span>
                </div>
                <p className="text-xs text-blue-200">Saldo Disponível</p>
                <p className="mt-1 text-2xl font-extrabold">KZ 1.250,00</p>
              </div>

              {/* Card Ajuda */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Precisa de Ajuda?</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Se tem dúvidas sobre o funcionamento da plataforma ou necessita de alterar dados críticos da sua conta, contacte a nossa equipa de suporte.
                </p>
                <a 
                  href="mailto:fernandochipombo@gmail.com" 
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Contactar Suporte
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
