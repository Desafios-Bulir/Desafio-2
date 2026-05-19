"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { CheckCircle2, XCircle, Clock, Filter, Download, ArrowUpRight } from "lucide-react";

// ── Types ──
type HistoryStatus = "Concluído" | "Cancelado";

type HistoryRecord = {
  id: string;
  service: string;
  client: string;
  date: string;
  status: HistoryStatus;
  amount: string;
  duration: string;
};

// ── Data ──
const historyData: HistoryRecord[] = [
  {
    id: "1",
    service: "Reforma de Banheiro",
    client: "João Fernandes",
    date: "14 Out 2023",
    status: "Concluído",
    amount: "KZ 450,00",
    duration: "4h",
  },
  {
    id: "2",
    service: "Instalação Elétrica",
    client: "Roberto Carlos",
    date: "12 Out 2023",
    status: "Concluído",
    amount: "KZ 200,00",
    duration: "2h",
  },
  {
    id: "3",
    service: "Troca de Piso (Cozinha)",
    client: "Marta Oliveira",
    date: "10 Out 2023",
    status: "Cancelado",
    amount: "KZ 0,00",
    duration: "-",
  },
  {
    id: "4",
    service: "Orçamento Presencial",
    client: "Ana Costa",
    date: "05 Out 2023",
    status: "Concluído",
    amount: "KZ 50,00",
    duration: "1h",
  },
];

export default function HistoricoPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title="Histórico de Serviços"
        showSearch
        searchPlaceholder="Buscar por serviço ou cliente..."
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={CheckCircle2}
            iconBg="bg-green-50 text-green-500"
            label="Serviços Concluídos"
            value="345"
            badge="Todo o período"
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={XCircle}
            iconBg="bg-red-50 text-red-500"
            label="Cancelamentos"
            value="12"
            badge="Baixo"
            badgeStyle="bg-green-50 text-green-600"
          />
          <StatCard
            icon={Clock}
            iconBg="bg-blue-50 text-blue-500"
            label="Horas Trabalhadas"
            value="560h"
            badge="Aprox."
            badgeStyle="bg-blue-50 text-blue-600"
          />
        </div>

        {/* History Table */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">Todos os Serviços</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                <Filter className="h-4 w-4" />
                Filtrar
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                <Download className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Data</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Serviço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Cliente</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Duração</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Status</th>
                  <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">Valor Recebido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historyData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Data */}
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {record.date}
                    </td>

                    {/* Serviço */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{record.service}</p>
                    </td>

                    {/* Cliente */}
                    <td className="px-6 py-4 text-gray-600">
                      {record.client}
                    </td>

                    {/* Duração */}
                    <td className="px-6 py-4 text-gray-500">
                      {record.duration}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          record.status === "Concluído"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>

                    {/* Valor */}
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold flex items-center justify-end gap-1 ${
                          record.status === "Concluído" ? "text-[#1e3a8a]" : "text-gray-400"
                        }`}
                      >
                        {record.amount}
                        {record.status === "Concluído" && (
                          <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                        )}
                      </span>
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
