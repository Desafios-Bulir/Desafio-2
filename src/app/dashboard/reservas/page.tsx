"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuthStore } from "@/store/auth.store";
import { bookingsService, BookingResponse } from "@/services/bookings.service";
import { 
  Plus, 
  MapPin, 
  Banknote, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Calendar,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

export default function ReservasPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";

  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "pending" | "completed" | "canceled">("upcoming");

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const data = isProvider
          ? await bookingsService.getProviderBookings()
          : await bookingsService.getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        toast.error("Erro ao carregar as reservas.");
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      loadBookings();
    }
  }, [user, isProvider]);

  async function handleCancel(id: string) {
    if (!confirm("Tem a certeza que deseja cancelar esta reserva?")) return;
    try {
      await bookingsService.cancelBooking(id);
      toast.success("Reserva cancelada com sucesso!");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "CANCELED" } : b))
      );
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar a reserva.");
    }
  }

  const now = new Date();
  
  const upcomingBookings = bookings.filter(
    (b) => (b.status === "PENDING" || b.status === "COMPLETED") && new Date(b.scheduledAt) >= now
  );
  
  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");
  const canceledBookings = bookings.filter((b) => b.status === "CANCELED");


  let displayList: BookingResponse[] = [];
  if (activeTab === "upcoming") displayList = upcomingBookings;
  else if (activeTab === "pending") displayList = pendingBookings;
  else if (activeTab === "completed") displayList = completedBookings;
  else if (activeTab === "canceled") displayList = canceledBookings;


  const statsConfirmed = completedBookings.length;
  const statsPending = pendingBookings.length;
  const statsCanceled = canceledBookings.length;
  

  const totalValue = bookings
    .filter((b) => b.status === "COMPLETED" || b.status === "PENDING")
    .reduce((sum, b) => sum + (b.service?.price || 0), 0);

  const getFormattedTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  };

  const getFormattedDay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
  };

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
        title="Gerenciar Reservas"
        showSearch
        searchPlaceholder="Buscar por serviço..."
        actionButton={
          !isProvider ? (
            <Link
              href="/dashboard/services"
              className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Nova Reserva
            </Link>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "border-[#1e3a8a] text-[#1e3a8a]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Próximas
            <span className={`flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold ${
              activeTab === "upcoming" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "pending"
                ? "border-[#1e3a8a] text-[#1e3a8a]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pendentes
            <span className={`flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold ${
              activeTab === "pending" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {pendingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "completed"
                ? "border-[#1e3a8a] text-[#1e3a8a]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Concluídas
            <span className={`flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold ${
              activeTab === "completed" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {completedBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("canceled")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "canceled"
                ? "border-[#1e3a8a] text-[#1e3a8a]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Canceladas
            <span className={`flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold ${
              activeTab === "canceled" ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {canceledBookings.length}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
          
          {/* ── Left Column: Booking List ── */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            {displayList.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center text-gray-500 font-medium">
                Nenhuma reserva encontrada nesta categoria.
              </div>
            ) : (
              displayList.map((booking) => {
                const displayName = isProvider
                  ? booking.client?.fullName || "Cliente Geral"
                  : booking.service?.name || "Serviço Geral";
                const displayDetail = isProvider
                  ? booking.service?.name || "Serviço Geral"
                  : "Reserva Agendada";

                const scheduledTime = getFormattedTime(booking.scheduledAt);
                const scheduledDay = getFormattedDay(booking.scheduledAt);

                let statusLabel = "Pendente";
                let statusClass = "bg-amber-50 text-amber-600";
                
                if (booking.status === "COMPLETED") {
                  statusLabel = "Confirmado";
                  statusClass = "bg-blue-50 text-blue-600";
                } else if (booking.status === "CANCELED") {
                  statusLabel = "Cancelado";
                  statusClass = "bg-red-50 text-red-600";
                }

                return (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-gray-200 transition-all">
                    
                    {/* Time */}
                    <div className="flex w-24 flex-col items-center justify-center sm:items-start border-r border-gray-100 pr-4">
                      <span className="text-lg font-bold text-[#1e3a8a]">{scheduledTime}</span>
                      <span className="text-xs text-gray-400 font-bold">{scheduledDay.split(" de ")[0]} {scheduledDay.split(" de ")[1]}</span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col gap-2 pl-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-base font-bold text-[#1e3a8a]">{displayName}</h4>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1 font-medium">
                        <span className="text-gray-700">{displayDetail}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          A combinar
                        </div>
                        <div className="flex items-center gap-1 font-bold text-[#1e3a8a]">
                          <Banknote className="h-3.5 w-3.5 text-gray-400" />
                          KZ {(booking.service?.price || 0).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex w-full sm:w-auto flex-col gap-2 border-t border-gray-100 pt-4 sm:border-none sm:pt-0">
                      {!isProvider && booking.status === "PENDING" && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                        >
                          <XCircle className="h-4 w-4" />
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

    
          <div className="flex flex-col gap-6">
            
            {/* Calendar Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-[#1e3a8a]">Calendário</h3>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-[#1e3a8a]"><ChevronLeft className="h-5 w-5" /></button>
                  <button className="text-gray-400 hover:text-[#1e3a8a]"><ChevronRight className="h-5 w-5" /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400 text-xs">{d}</div>
                ))}
                
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const isToday = day === now.getDate();
                  return (
                    <div key={day} className="flex flex-col items-center justify-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          isToday
                            ? "bg-[#1e3a8a] text-white shadow-md"
                            : "text-[#1e3a8a] hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

           
            <div className="rounded-2xl border border-blue-50 bg-blue-50/50 p-6 shadow-sm">
              <h3 className="mb-5 font-bold text-[#1e3a8a]">Resumo de Atividades</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Reservas Confirmadas</span>
                  <span className="font-bold text-[#1e3a8a]">{statsConfirmed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Aguardando Confirmação</span>
                  <span className="font-bold text-amber-600">{statsPending}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Cancelamentos</span>
                  <span className="font-bold text-red-500">{statsCanceled}</span>
                </div>
                
                <div className="my-2 border-t border-blue-100"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1e3a8a]">
                    {isProvider ? "Ganhos Acumulados" : "Pagamentos Previstos"}
                  </span>
                  <span className="text-lg font-bold text-[#1e3a8a]">
                    KZ {totalValue.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
