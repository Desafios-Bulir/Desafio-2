"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserPlus, Star, Mail, Phone, MessageSquare, MoreHorizontal } from "lucide-react";


type Client = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  totalBookings: number;
  lastBooking: string;
};

const clients: Client[] = [
  {
    id: "1",
    name: "João Fernandes",
    avatar: "J",
    email: "joao.fernandes@email.com",
    phone: "(244) 923 379 993",
    totalBookings: 5,
    lastBooking: "Hoje, 14:00"
  },
  {
    id: "2",
    name: "Ana Costa",
    avatar: "A",
    email: "ana.costa@email.com",
    phone: "(244) 941 354 268",
    totalBookings: 2,
    lastBooking: "Amanhã, 09:00",
  },
  {
    id: "3",
    name: "Carlos Souza",
    avatar: "C",
    email: "carlos.souza@email.com",
    phone: "(244) 944 658 412",
    totalBookings: 12,
    lastBooking: "12 de Outubro"
  },
  {
    id: "4",
    name: "Marta Oliveira",
    avatar: "M",
    email: "marta.oliveira@email.com",
    phone: "(244) 949 196 058",
    totalBookings: 1,
    lastBooking: "10 de Outubro",
   
  },
];

const avatarColors: Record<string, string> = {
  J: "bg-indigo-100 text-indigo-700",
  A: "bg-rose-100 text-rose-700",
  C: "bg-amber-100 text-amber-700",
  M: "bg-teal-100 text-teal-700",
};

export default function ClientesPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title="Meus Clientes"
        showSearch
        searchPlaceholder="Buscar por nome ou email..."
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Users}
            iconBg="bg-blue-50 text-blue-500"
            label="Total de Clientes"
            value="142"
            badge="Estável"
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={UserPlus}
            iconBg="bg-green-50 text-green-500"
            label="Novos este mês"
            value="12"
            badge="+15%"
            badgeStyle="bg-green-50 text-green-600"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50 text-amber-500"
            label="Avaliação Média"
            value="4.9"
            badge="Excelente"
            badgeStyle="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Clients Table */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">Lista de Clientes</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Cliente</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Contato</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Reservas</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-400 text-xs">Última Reserva</th>
                  <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-gray-400 text-xs">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Cliente */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            avatarColors[client.avatar] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {client.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{client.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contato */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {client.phone}
                        </div>
                      </div>
                    </td>

                    {/* Reservas */}
                    <td className="px-6 py-4">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        {client.totalBookings}
                      </span>
                    </td>

                    {/* Última Reserva */}
                    <td className="px-6 py-4 text-gray-500">
                      {client.lastBooking}
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                          title="Enviar Mensagem"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title="Mais Opções"
                        >
                          <MoreHorizontal className="h-4 w-4" />
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
