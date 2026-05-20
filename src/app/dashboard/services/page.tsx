"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuthStore } from "@/store/auth.store";
import { servicesService, ServiceResponse } from "@/services/services.service";
import { Briefcase, Plus, Star, Wrench, Clock, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";

  const [servicesList, setServicesList] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = isProvider
          ? await servicesService.getMyServices()
          : await servicesService.getAll();
        setServicesList(data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        toast.error("Erro ao carregar os serviços.");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchServices();
    }
  }, [user, isProvider]);

  async function handleDelete(id: string) {
    if (!confirm("Tem a certeza que deseja eliminar este serviço?")) return;
    try {
      await servicesService.delete(id);
      toast.success("Serviço eliminado com sucesso!");
      setServicesList((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao eliminar serviço:", error);
      toast.error("Erro ao eliminar o serviço.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#052a5e]" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title={isProvider ? "Meus Serviços" : "Serviços Disponíveis"}
        showSearch
        searchPlaceholder="Buscar serviços..."
        actionButton={
          isProvider ? (
            <Link href="/dashboard/services/new" className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 transition-colors">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Link>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Briefcase}
            iconBg="bg-blue-50 text-blue-500"
            label={isProvider ? "Meus Serviços Ativos" : "Serviços Disponíveis"}
            value={servicesList.length.toString()}
            badge={`Total: ${servicesList.length}`}
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50 text-amber-500"
            label="Avaliação Média"
            value="5.0"
            badge="Excelente"
            badgeStyle="bg-amber-50 text-amber-600"
          />
          <StatCard
            icon={Wrench}
            iconBg="bg-green-50 text-green-500"
            label="Mais Solicitado"
            value="N/A"
            badge="Sem reservas"
            badgeStyle="bg-green-50 text-green-600"
          />
        </div>

        {/* Services List */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">
              {isProvider ? "Gerenciar Catálogo" : "Catálogo de Serviços"}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Serviço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Preço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Duração</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Status</th>
                  {isProvider && <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">Ações</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {servicesList.length === 0 ? (
                  <tr>
                    <td colSpan={isProvider ? 5 : 4} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Nenhum serviço registado.
                    </td>
                  </tr>
                ) : (
                  servicesList.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                      
                      {/* Serviço */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                            <Wrench className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {service.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="font-medium line-clamp-1 max-w-md">{service.description}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Preço */}
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        KZ {service.price.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                      </td>

                      {/* Duração */}
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-400" />
                          A combinar
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-600">
                          Ativo
                        </span>
                      </td>

                      {/* Ações */}
                      {isProvider && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                              title="Excluir Serviço"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
