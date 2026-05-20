"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuthStore } from "@/store/auth.store";
import { walletService, TransactionResponse } from "@/services/wallet.service";
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  Wallet, 
  TrendingUp, 
  Loader2, 
  Filter
} from "lucide-react";
import { toast } from "sonner";

export default function CarteiraPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";

  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");

  useEffect(() => {
    async function loadWalletData() {
      try {
        setLoading(true);
        const [balData, txData] = await Promise.all([
          walletService.getBalance(),
          walletService.getTransactions(),
        ]);
        setBalance(balData.balance);
        setTransactions(txData);
      } catch (error) {
        console.error("Erro ao carregar dados da carteira:", error);
        toast.error("Erro ao carregar dados da carteira.");
      } finally {
        setLoading(false);
      }
    }
    loadWalletData();
  }, []);

  // Compute monthly calculations (Credits for provider, Debits for client)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTotal = transactions
    .filter((tx) => {
      const txDate = new Date(tx.createdAt);
      const targetType = isProvider ? "credit" : "debit";
      return (
        tx.type === targetType &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Filter transactions based on selection
  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#052a5e]" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <DashboardHeader title="Minha Carteira" />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        
        {/* Top Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Main Balance Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#052a5e] to-blue-900 p-8 text-white shadow-sm lg:col-span-2">
            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  Saldo Disponível
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">
                    KZ {balance.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="relative z-10 mt-12 flex items-center gap-4">
              {isProvider && (
                <button className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-900 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95">
                  Sacar Saldo
                </button>
              )}
              <button 
                onClick={() => setFilter("all")}
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-95"
              >
                Ver Todas Transações
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
                <span className="text-sm font-medium text-gray-500">Transações Pendentes</span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-[#052a5e]">
                {transactions.filter(t => t.bookingId === null).length} pendentes
              </p>
              <p className="mt-1 text-xs text-gray-400">Total acumulado na sua conta.</p>
            </div>

            {/* Ganhos/Gastos do Mês */}
            <div className="flex flex-1 flex-col justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-500">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {isProvider ? "Ganhos do Mês" : "Despesas do Mês"}
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-green-600">
                KZ {monthlyTotal.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-xs text-gray-400">Durante o mês corrente.</p>
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#052a5e]">Histórico de Transações</h3>
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 p-1 border border-gray-100">
              <button 
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Todas
              </button>
              <button 
                onClick={() => setFilter("credit")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "credit" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-green-600"
                }`}
              >
                Entradas
              </button>
              <button 
                onClick={() => setFilter("debit")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "debit" ? "bg-white text-blue-900 shadow-sm" : "text-gray-500 hover:text-blue-900"
                }`}
              >
                Saídas
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
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Nenhuma transação encontrada para este filtro.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => {
                    const isCredit = tx.type === "credit";
                    const isUserSender = user?.email === tx.fromUserEmail;
                    
                    let title = "";
                    let subtitle = "";
                    
                    if (isCredit) {
                      title = "Recebimento de Serviço";
                      subtitle = `De: ${tx.fromUserEmail}`;
                    } else {
                      title = isUserSender ? "Pagamento de Serviço" : "Retirada de Saldo";
                      subtitle = `Para: ${tx.toUserEmail}`;
                    }

                    const txDate = new Date(tx.createdAt).toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                                isCredit ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"
                              }`}
                            >
                              {isCredit ? (
                                <ArrowDownLeft className="h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{title}</p>
                              <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          {txDate}
                        </td>
                        
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                            Concluído
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`font-bold ${
                              isCredit ? "text-green-600" : "text-gray-900"
                            }`}
                          >
                            {isCredit ? "+ " : "- "}
                            KZ {tx.amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
