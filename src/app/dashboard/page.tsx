"use client";

import { Plus, Calendar, MoreHorizontal, Users, Wallet } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuthStore } from "@/store/auth.store";

// ── Types ──
type BookingStatus = "Confirmado" | "Pendente" | "Cancelado";

type Booking = {
  id: number;
  name: string;
  service: string;
  avatar: string;
  datetime: string;
  status: BookingStatus;
};

// ── Data ──
const upcomingBookings: Booking[] = [
  { id: 1, name: "João Fernandes", service: "Reforma de Banheiro", avatar: "J", datetime: "Hoje, 14:00", status: "Confirmado" },
  { id: 2, name: "Ana Costa", service: "Troca de Piso", avatar: "A", datetime: "Amanhã, 09:00", status: "Pendente" },
  { id: 3, name: "Carlos Souza", service: "Orçamento", avatar: "C", datetime: "Qua, 15:30", status: "Confirmado" },
];

const avatarColors: Record<string, string> = {
  J: "bg-indigo-100 text-indigo-700",
  A: "bg-rose-100 text-rose-700",
  C: "bg-amber-100 text-amber-700",
};

const statusStyles: Record<BookingStatus, string> = {
  Confirmado: "bg-blue-100 text-blue-700",
  Pendente: "bg-amber-100 text-amber-700",
  Cancelado: "bg-red-100 text-red-600",
};

// ── Page ──
export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Maria";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title="Dashboard"
        showSearch
        searchPlaceholder="Buscar reservas..."
      />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">

        {/* Greeting Row */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Bom dia, {firstName}!</h2>
            <p className="mt-1 text-sm text-gray-500">
              Aqui está o resumo dos seus serviços para hoje.
            </p>
          </div>
          <button
            id="btn-nova-reserva"
            className="flex items-center gap-2 rounded-lg bg-[#052a5e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#031b3e] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Nova Reserva Manual
          </button>
        </div>

        {/* Stats Grid */}
        <div className={`mb-6 grid grid-cols-1 gap-4 ${user?.role === 'PROVIDER' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <StatCard
            icon={Calendar}
            iconBg="bg-blue-50 text-blue-500"
            label="Reservas Hoje"
            value="4"
            badge="Hoje"
            badgeStyle="bg-blue-50 text-blue-600"
          />
          {user?.role === "PROVIDER" && (
            <StatCard
              icon={Users}
              iconBg="bg-teal-50 text-teal-500"
              label="Total de Clientes"
              value="142"
              badge="+12% este mês"
              badgeStyle="bg-green-50 text-green-600"
            />
          )}
          <StatCard
            icon={Wallet}
            iconBg="bg-purple-50 text-purple-500"
            label="Saldo Disponível"
            value="KZ 1.250,00"
            badge="Sacar"
            badgeStyle="bg-blue-50 text-blue-600 cursor-pointer"
          />
        </div>

        {/* Upcoming Bookings */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="text-base font-bold text-gray-900">Próximas Reservas</h3>
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
              Ver todas
            </button>
          </div>

          <ul className="divide-y divide-gray-50">
            {upcomingBookings.map((booking) => (
              <li
                key={booking.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarColors[booking.avatar] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {booking.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{booking.name}</p>
                  <p className="text-xs text-gray-400">{booking.service}</p>
                </div>
                <div className="hidden items-center gap-1.5 sm:flex text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  {booking.datetime}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}>
                  {booking.status}
                </span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
