"use client";

import { useEffect, useState } from "react";
import { Plus, Calendar, MoreHorizontal, Users, Wallet, Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuthStore } from "@/store/auth.store";
import { bookingsService, BookingResponse } from "@/services/bookings.service";
import { walletService } from "@/services/wallet.service";
import { toast } from "sonner";

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-teal-100 text-teal-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
  ];
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

const getFormattedDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (d.toDateString() === today.toDateString()) {
    return `Hoje, ${d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`;
  } else if (d.toDateString() === tomorrow.toDateString()) {
    return `Amanhã, ${d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`;
  } else {
    return d.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Maria";

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [bookings, setBookings] = useState<BookingResponse[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [balData, bookingsData] = await Promise.all([
          walletService.getBalance(),
          isProvider
            ? bookingsService.getProviderBookings()
            : bookingsService.getMyBookings(),
        ]);
        setBalance(balData.balance);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        toast.error("Erro ao carregar os dados do painel.");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadDashboardData();
    }
  }, [user, isProvider]);

  // Compute stats
  const todayStr = new Date().toDateString();
  const todayBookingsCount = bookings.filter(
    (b) => new Date(b.scheduledAt).toDateString() === todayStr
  ).length;

  const uniqueClientsCount = new Set(
    bookings.map((b) => b.clientId).filter(Boolean)
  ).size;

  // Limit 5 
  const upcomingBookings = bookings.slice(0, 5);

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
        title="Dashboard"
        showSearch
        searchPlaceholder="Buscar reservas..."
      />

     
      <div className="flex-1 overflow-y-auto px-6 py-6">

        {/* Greeting Row */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Bom dia, {firstName}!</h2>
            <p className="mt-1 text-sm text-gray-500">
              Aqui está o resumo dos seus serviços para hoje.
            </p>
          </div>
          {isProvider && (
            <button
              id="btn-nova-reserva"
              className="flex items-center gap-2 rounded-lg bg-[#052a5e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#031b3e] transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Nova Reserva Manual
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className={`mb-6 grid grid-cols-1 gap-4 ${isProvider ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <StatCard
            icon={Calendar}
            iconBg="bg-blue-50 text-blue-500"
            label="Reservas Hoje"
            value={todayBookingsCount.toString()}
            badge="Hoje"
            badgeStyle="bg-blue-50 text-blue-600"
          />
          {isProvider && (
            <StatCard
              icon={Users}
              iconBg="bg-teal-50 text-teal-500"
              label="Total de Clientes"
              value={uniqueClientsCount.toString()}
              badge="Ativos"
              badgeStyle="bg-green-50 text-green-600"
            />
          )}
          <StatCard
            icon={Wallet}
            iconBg="bg-purple-50 text-purple-500"
            label="Saldo Disponível"
            value={`KZ ${balance.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}`}
            badge={isProvider ? "Sacar" : "Carteira"}
            badgeStyle="bg-blue-50 text-blue-600 cursor-pointer"
          />
        </div>

       
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="text-base font-bold text-gray-900">
              {isProvider ? "Próximas Reservas" : "Minhas Reservas Recentes"}
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              Total: {bookings.length}
            </span>
          </div>

          <ul className="divide-y divide-gray-50">
            {upcomingBookings.length === 0 ? (
              <li className="px-5 py-8 text-center text-gray-500 font-medium">
                Nenhuma reserva registada até ao momento.
              </li>
            ) : (
              upcomingBookings.map((booking) => {
                const displayName = isProvider
                  ? booking.client?.fullName || "Cliente Geral"
                  : booking.service?.name || "Serviço Geral";
                const displayDetail = isProvider
                  ? booking.service?.name || "Serviço Geral"
                  : "Reserva agendada";
                
                const avatar = displayName.charAt(0).toUpperCase();
                const colorClass = getAvatarColor(displayName);

                let statusLabel = "Pendente";
                let statusStyle = "bg-amber-100 text-amber-700";

                if (booking.status === "COMPLETED") {
                  statusLabel = "Confirmado";
                  statusStyle = "bg-blue-100 text-blue-700";
                } else if (booking.status === "CANCELED") {
                  statusLabel = "Cancelado";
                  statusStyle = "bg-red-100 text-red-600";
                }

                return (
                  <li
                    key={booking.id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorClass}`}
                    >
                      {avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                      <p className="text-xs text-gray-400 font-medium">{displayDetail}</p>
                    </div>
                    
                    <div className="hidden items-center gap-1.5 sm:flex text-sm text-gray-500 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {getFormattedDate(booking.scheduledAt)}
                    </div>
                    
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}>
                      {statusLabel}
                    </span>
                    
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
