"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuthStore } from "@/store/auth.store";
import { bookingsService, BookingResponse } from "@/services/bookings.service";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowUpRight, 
  Loader2 
} from "lucide-react";
import { toast } from "sonner";

export default function HistoricoPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";

  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "COMPLETED" | "CANCELED" | "PENDING">("all");

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const data = isProvider
          ? await bookingsService.getProviderBookings()
          : await bookingsService.getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        toast.error("Erro ao carregar o histórico de serviços.");
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [isProvider]);

 
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  const canceledCount = bookings.filter((b) => b.status === "CANCELED").length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
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
      <DashboardHeader
        title="Histórico de Serviços"
        showSearch
        searchPlaceholder="Buscar por serviço..."
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={CheckCircle2}
            iconBg="bg-green-50 text-green-500"
            label="Serviços Concluídos"
            value={completedCount.toString()}
            badge="Finalizados"
            badgeStyle="bg-green-50 text-green-600"
          />
          <StatCard
            icon={XCircle}
            iconBg="bg-red-50 text-red-500"
            label="Cancelamentos"
            value={canceledCount.toString()}
            badge="Cancelados"
            badgeStyle="bg-red-50 text-red-600"
          />
          <StatCard
            icon={Clock}
            iconBg="bg-blue-50 text-blue-500"
            label="Reservas Pendentes"
            value={pendingCount.toString()}
            badge="Em aberto"
            badgeStyle="bg-blue-50 text-blue-600"
          />
        </div>

        
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#052a5e]">Todos os Serviços</h3>
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 p-1 border border-gray-100">
              <button 
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter("COMPLETED")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "COMPLETED" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-green-600"
                }`}
              >
                Concluídos
              </button>
              <button 
                onClick={() => setFilter("PENDING")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "PENDING" ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-amber-600"
                }`}
              >
                Pendentes
              </button>
              <button 
                onClick={() => setFilter("CANCELED")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "CANCELED" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-red-600"
                }`}
              >
                Cancelados
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Data</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Serviço</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">
                    {isProvider ? "Cliente" : "Destino"}
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Status</th>
                  <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">
                    {isProvider ? "Valor Recebido" : "Valor Pago"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Nenhuma reserva encontrada para este filtro.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => {
                    const scheduledDate = new Date(booking.scheduledAt).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    });

                    let statusLabel = "Pendente";
                    let statusClass = "bg-amber-50 text-amber-600";
                    if (booking.status === "COMPLETED") {
                      statusLabel = "Concluído";
                      statusClass = "bg-green-50 text-green-600";
                    } else if (booking.status === "CANCELED") {
                      statusLabel = "Cancelado";
                      statusClass = "bg-red-50 text-red-600";
                    }

                    const otherParty = isProvider
                      ? booking.client?.fullName || "Cliente Geral"
                      : "Serviço Contratado";

                    return (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        
                        
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          {scheduledDate}
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">
                            {booking.service?.name || "Serviço Geral"}
                          </p>
                        </td>

                       
                        <td className="px-6 py-4 text-gray-600 font-medium">
                          {otherParty}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>

                        {/* Valor */}
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          <span className="flex items-center justify-end gap-1">
                            KZ {(booking.service?.price || 0).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                            {booking.status === "COMPLETED" && (
                              <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                            )}
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
