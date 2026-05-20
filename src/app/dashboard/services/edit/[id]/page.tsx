"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuthStore } from "@/store/auth.store";
import { servicesService } from "@/services/services.service";
import { ArrowLeft, Save, FileText, Wrench, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (user && user.role !== "PROVIDER") {
      router.push("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    async function loadService() {
      try {
        setInitialLoading(true);
        const service = await servicesService.getById(serviceId);
        setFormData({
          name: service.name,
          description: service.description,
          price: service.price.toString(),
        });
      } catch (error) {
        console.error("Erro ao carregar serviço:", error);
        toast.error("Erro ao carregar os dados do serviço.");
        router.push("/dashboard/services");
      } finally {
        setInitialLoading(false);
      }
    }

    if (user && user.role === "PROVIDER") {
      loadService();
    }
  }, [user, serviceId, router]);

  if (!user || user.role !== "PROVIDER") {
    return null;
  }

  if (initialLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#052a5e]" />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const priceNum = parseFloat(formData.price.replace(/[^\d.]/g, ""));
      if (isNaN(priceNum) || priceNum < 0) {
        toast.error("Por favor, insira um preço válido.");
        setLoading(false);
        return;
      }

      await servicesService.update(serviceId, {
        name: formData.name,
        description: formData.description,
        price: priceNum,
      });

      toast.success("Serviço atualizado com sucesso!");
      router.push("/dashboard/services");
    } catch (error: any) {
      console.error("Erro ao atualizar serviço:", error);
      const errorMsg = error.response?.data?.message || "Ocorreu um erro ao atualizar o serviço.";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <DashboardHeader 
        title="Editar Serviço" 
        actionButton={
          <Link 
            href="/dashboard/services" 
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-2xl">
          
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-5">
              <h3 className="text-lg font-bold text-gray-900">Editar Detalhes do Serviço</h3>
              <p className="text-sm text-gray-500 mt-1">Atualize as informações do seu serviço.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Nome do Serviço */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nome do Serviço
                </label>
                <div className="relative">
                  <Wrench className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ex: Pintura Residencial, Canalização, Eletricidade..."
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Preço */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="price" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Preço Base (KZ)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="price"
                    type="number"
                    min="0"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <span className="text-[10px] text-gray-400">Insira o preço base do serviço.</span>
              </div>

              {/* Descrição */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Descrição do Serviço
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="description"
                    required
                    rows={5}
                    placeholder="Descreva detalhadamente o que inclui o serviço, os materiais necessários, prazos aproximados..."
                    value={formData.description}
                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                </div>
              </div>

              {/* Ações do Form */}
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
                <Link
                  href="/dashboard/services"
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-[#052a5e] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#031b3e] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      A atualizar...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Atualizar Serviço
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
