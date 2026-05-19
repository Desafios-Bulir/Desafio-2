"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Briefcase, Plus, Star, Search, Wrench, Clock, Edit3, Trash2, Power } from "lucide-react";

// ── Types ──
type ServiceStatus = "Ativo" | "Inativo";

type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  status: ServiceStatus;
  bookings: number;
  rating: number;
};

// ── Data ──
const services: Service[] = [
  {
    id: "1",
    name: "Reforma Completa de Banheiro",
    category: "Alvenaria",
    price: "A partir de KZ 2.500,00",
    duration: "10-15 dias",
    status: "Ativo",
    bookings: 24,
    rating: 5.0,
  },
  {
    id: "2",
    name: "Troca de Piso e Porcelanato",
    category: "Acabamento",
    price: "KZ 50,00 / m²",
    duration: "A combinar",
    status: "Ativo",
    bookings: 38,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Orçamento Presencial",
    category: "Consultoria",
    price: "Grátis",
    duration: "1h",
    status: "Ativo",
    bookings: 56,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Pintura Interna (Quarto/Sala)",
    category: "Pintura",
    price: "KZ 400,00 / cômodo",
    duration: "1-2 dias",
    status: "Inativo",
    bookings: 5,
    rating: 4.2,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title="Meus Serviços"
        showSearch
        searchPlaceholder="Buscar serviços..."
        actionButton={
          <button className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 transition-colors">
            <Plus className="h-4 w-4" />
            Novo Serviço
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Briefcase}
            iconBg="bg-blue-50 text-blue-500"
            label="Serviços Ativos"
            value="3"
            badge="Do total de 4"
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50 text-amber-500"
            label="Avaliação Média"
            value="4.8"
            badge="Excelente"
            badgeStyle="bg-amber-50 text-amber-600"
          />
          <StatCard
            icon={Wrench}
            iconBg="bg-green-50 text-green-500"
            label="Mais Solicitado"
            value="Orçamento"
            badge="56 reservas"
            badgeStyle="bg-green-50 text-green-600"
          />
        </div>

        {/* Services List */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">Gerenciar Catálogo</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Serviço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Preço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Duração</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Status</th>
                  <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((service) => (
                  <tr key={service.id} className={`transition-colors ${service.status === 'Inativo' ? 'bg-gray-50/50' : 'hover:bg-gray-50/50'}`}>
                    
                    {/* Serviço */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                          service.status === 'Inativo' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-500'
                        }`}>
                          <Wrench className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`font-semibold ${service.status === 'Inativo' ? 'text-gray-500' : 'text-gray-900'}`}>
                            {service.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs">
                            <span className="text-gray-500 font-medium">{service.category}</span>
                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                              <Star className="h-3 w-3 fill-amber-500" />
                              {service.rating.toFixed(1)} ({service.bookings})
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Preço */}
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {service.price}
                    </td>

                    {/* Duração */}
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {service.duration}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          service.status === "Ativo"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title="Editar Serviço"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                            service.status === 'Ativo' 
                              ? 'text-gray-400 hover:bg-amber-50 hover:text-amber-600'
                              : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                          }`}
                          title={service.status === 'Ativo' ? 'Desativar Serviço' : 'Ativar Serviço'}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          title="Excluir Serviço"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
