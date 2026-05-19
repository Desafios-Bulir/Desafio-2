"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ArrowDownLeft, ArrowUpRight, Clock, Download, Filter, TrendingUp, Wallet } from "lucide-react";

// ── Types ──
type TransactionStatus = "Concluído" | "Pendente";
type TransactionType = "Pagamento de Serviço" | "Saque para Conta Bancária" | "Pagamento em Processamento";

type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  status: TransactionStatus;
  amount: string;
  isPositive: boolean;
};

// ── Data ──
const recentTransactions: Transaction[] = [
  {
    id: "1",
    type: "Pagamento de Serviço",
    description: "Cliente: João Fernandes",
    date: "Hoje, 15:42",
    status: "Concluído",
    amount: "KZ 450,00",
    isPositive: true,
  },
  {
    id: "2",
    type: "Saque para Conta Bancária",
    description: "Banco Itaú •••• 4321",
    date: "Ontem, 09:15",
    status: "Concluído",
    amount: "KZ 1.200,00",
    isPositive: false,
  },
  {
    id: "3",
    type: "Pagamento em Processamento",
    description: "Cliente: Ana Costa",
    date: "12 de Out, 14:20",
    status: "Pendente",
    amount: "KZ 850,00",
    isPositive: true,
  },
  {
    id: "4",
    type: "Pagamento de Serviço",
    description: "Cliente: Marcos Paulo",
    date: "10 de Out, 11:00",
    status: "Concluído",
    amount: "KZ 320,00",
    isPositive: true,
  },
];

export default function CarteiraPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader title="Minha Carteira" />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        
        {/* Top Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Main Balance Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1e3a8a] p-8 text-white shadow-sm lg:col-span-2">
            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium tracking-wider text-blue-200 uppercase">
                  Saldo Disponível
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">KZ 4.250</span>
                  <span className="text-2xl font-semibold text-blue-200">,00</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="relative z-10 mt-12 flex items-center gap-4">
              <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-blue-900 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95">
                Sacar
              </button>
              <button className="rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-95">
                Ver extrato
              </button>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="flex flex-col gap-6">
            {/* A Receber */}
            <div className="flex flex-1 flex-col justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-500">A Receber</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900 text-[#1e3a8a]">KZ 850,00</p>
              <p className="mt-1 text-xs text-gray-400">Liberação prevista para os próximos 7 dias.</p>
            </div>

            {/* Ganhos do Mês */}
            <div className="flex flex-1 flex-col justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-500">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-500">Ganhos do Mês</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900 text-[#1e3a8a]">KZ 5.100,00</p>
              <p className="mt-1 text-xs font-medium text-green-600">+15% em relação ao mês passado</p>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">Transações Recentes</h3>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Descrição</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Data</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Status</th>
                  <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                            tx.status === "Pendente"
                              ? "bg-amber-50 text-amber-500"
                              : tx.isPositive
                              ? "bg-green-50 text-green-500"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {tx.status === "Pendente" ? (
                            <Clock className="h-4 w-4" />
                          ) : tx.isPositive ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1e3a8a]">{tx.type}</p>
                          <p className="text-xs text-gray-400">{tx.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          tx.status === "Concluído"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold ${
                          tx.status === "Pendente"
                            ? "text-orange-500"
                            : tx.isPositive
                            ? "text-green-600"
                            : "text-[#1e3a8a]"
                        }`}
                      >
                        {tx.isPositive ? "+ " : "- "}
                        {tx.amount}
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
