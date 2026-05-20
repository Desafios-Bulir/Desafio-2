"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { bookingsService } from "@/services/bookings.service";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserPlus, Star, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  lastBooking: string;
}

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

export default function ClientesPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [clientsList, setClientsList] = useState<ClientData[]>([]);

  useEffect(() => {
    if (user && user.role !== "PROVIDER") {
      router.push("/dashboard");
      return;
    }

    async function fetchClients() {
      try {
        setLoading(true);
        const bookings = await bookingsService.getProviderBookings();
        
        // Group bookings by client to compute unique clients
        const clientsMap: Record<string, ClientData> = {};

        bookings.forEach((booking) => {
          const clientObj = booking.client;
          if (!clientObj) return;

          const scheduledDate = new Date(booking.scheduledAt).toLocaleString("pt-PT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          if (!clientsMap[clientObj.id]) {
            clientsMap[clientObj.id] = {
              id: clientObj.id,
              name: clientObj.fullName,
              email: clientObj.email,
              phone: clientObj.phone || "Sem contacto",
              totalBookings: 0,
              lastBooking: scheduledDate, // Since backend query has orderBy desc, first booking is the latest
            };
          }

          clientsMap[clientObj.id].totalBookings += 1;
        });

        setClientsList(Object.values(clientsMap));
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        toast.error("Erro ao carregar os clientes.");
      } finally {
        setLoading(false);
      }
    }

    if (user && user.role === "PROVIDER") {
      fetchClients();
    }
  }, [user, router]);

  if (!user || user.role !== "PROVIDER") {
    return null;
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
            value={clientsList.length.toString()}
            badge="Ativo"
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={UserPlus}
            iconBg="bg-green-50 text-green-500"
            label="Clientes com Reservas"
            value={clientsList.filter(c => c.totalBookings > 0).length.toString()}
            badge="Atualizado"
            badgeStyle="bg-green-50 text-green-600"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50 text-amber-500"
            label="Avaliação Média"
            value="5.0"
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
                {clientsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Nenhum cliente solicitou os seus serviços ainda.
                    </td>
                  </tr>
                ) : (
                  clientsList.map((client) => {
                    const avatar = client.name.charAt(0).toUpperCase();
                    const colorClass = getAvatarColor(client.name);
                    return (
                      <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                        
                        {/* Cliente */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorClass}`}
                            >
                              {avatar}
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
                            {client.phone && (
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5" />
                                {client.phone}
                              </div>
                            )}
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
                            <a
                              href={`mailto:${client.email}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                              title="Enviar Mensagem"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </a>
                          </div>
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
