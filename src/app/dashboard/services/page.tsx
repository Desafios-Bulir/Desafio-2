"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuthStore } from "@/store/auth.store";
import { servicesService, ServiceResponse } from "@/services/services.service";
import { bookingsService } from "@/services/bookings.service";
import { walletService } from "@/services/wallet.service";
import { Briefcase, Plus, Star, Wrench, Clock, Trash2, Loader2, Edit2 } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
  const user = useAuthStore((state) => state.user);
  const isProvider = user?.role === "PROVIDER";

  const [servicesList, setServicesList] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [balance, setBalance] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceResponse | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [servicesData, balData] = await Promise.all([
          isProvider
            ? servicesService.getMyServices()
            : servicesService.getAll(),
          !isProvider ? walletService.getBalance() : Promise.resolve({ balance: 0 }),
        ]);
        setServicesList(servicesData);
        if (!isProvider) {
          setBalance(balData.balance);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar os serviços.");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadData();
    }
  }, [user, isProvider]);

  async function handleDelete(id: string) {
    if (!confirm("Tem a certeza que deseja eliminar este serviço?")) return;
    try {
      await servicesService.delete(id);
      toast.success("Serviço eliminado com sucesso!");
      setServicesList((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao eliminar serviço:", error);
      toast.error("Erro ao eliminar o serviço.");
    }
  }

  async function handleConfirmBooking() {
    if (!selectedService) return;

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    if (scheduledDateTime < new Date()) {
      toast.error("A data e hora do agendamento não pode ser no passado.");
      return;
    }

    try {
      setBookingLoading(true);
      await bookingsService.createBooking({
        serviceId: selectedService.id,
        scheduledAt: scheduledDateTime.toISOString(),
      });
      
      toast.success("Serviço contratado com sucesso!");
      
      if (balance !== null) {
        setBalance((prev) => (prev !== null ? prev - selectedService.price : null));
      }
      
      // Reset modal state
      setSelectedService(null);
      setScheduledDate("");
      setScheduledTime("");
    } catch (error: any) {
      console.error("Erro ao contratar serviço:", error);
      const errorMsg = error.response?.data?.message || "Ocorreu um erro ao contratar o serviço.";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    } finally {
      setBookingLoading(false);
    }
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
        title={isProvider ? "Meus Serviços" : "Serviços Disponíveis"}
        showSearch
        searchPlaceholder="Buscar serviços..."
        actionButton={
          isProvider ? (
            <Link href="/dashboard/services/new" className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 transition-colors">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Link>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Briefcase}
            iconBg="bg-blue-50 text-blue-500"
            label={isProvider ? "Meus Serviços Ativos" : "Serviços Disponíveis"}
            value={servicesList.length.toString()}
            badge={`Total: ${servicesList.length}`}
            badgeStyle="bg-gray-100 text-gray-600"
          />
          <StatCard
            icon={Star}
            iconBg="bg-amber-50 text-amber-500"
            label="Avaliação Média"
            value="5.0"
            badge="Excelente"
            badgeStyle="bg-amber-50 text-amber-600"
          />
          {!isProvider ? (
            <StatCard
              icon={Wrench}
              iconBg="bg-purple-50 text-purple-500"
              label="Meu Saldo"
              value={`KZ ${(balance || 0).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}`}
              badge="Disponível"
              badgeStyle="bg-green-50 text-green-600"
            />
          ) : (
            <StatCard
              icon={Wrench}
              iconBg="bg-green-50 text-green-500"
              label="Mais Solicitado"
              value="N/A"
              badge="Sem reservas"
              badgeStyle="bg-green-50 text-green-600"
            />
          )}
        </div>

        {/* Services List */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <h3 className="text-lg font-bold text-[#1e3a8a]">
              {isProvider ? "Gerenciar Catálogo" : "Catálogo de Serviços"}
            </h3>
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
                {servicesList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Nenhum serviço registado.
                    </td>
                  </tr>
                ) : (
                  servicesList.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                      
                      {/* Serviço */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                            <Wrench className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {service.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="font-medium line-clamp-1 max-w-md">{service.description}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Preço */}
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        KZ {service.price.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                      </td>

                      {/* Duração */}
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-400" />
                          A combinar
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-600">
                          Ativo
                        </span>
                      </td>

                      {/* Ações */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isProvider ? (
                            <>
                              <Link
                                href={`/dashboard/services/edit/${service.id}`}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                title="Editar Serviço"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(service.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                title="Excluir Serviço"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedService(service);
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                setScheduledDate(tomorrow.toISOString().split("T")[0]);
                                setScheduledTime("10:00");
                              }}
                              className="rounded-lg bg-[#052a5e] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#031b3e] transition-colors"
                            >
                              Contratar
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#052a5e]">Contratar Serviço</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="my-4 flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Serviço</p>
                <p className="text-base font-bold text-gray-900">{selectedService.name}</p>
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{selectedService.description}</p>
              </div>

              <div className="flex justify-between border-t border-b border-gray-50 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Preço do Serviço</p>
                  <p className="text-lg font-bold text-[#1e3a8a]">
                    KZ {selectedService.price.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Seu Saldo</p>
                  <p className={`text-lg font-bold ${balance !== null && balance >= selectedService.price ? 'text-green-600' : 'text-red-500'}`}>
                    KZ {balance !== null ? balance.toLocaleString("pt-PT", { minimumFractionDigits: 2 }) : "0,00"}
                  </p>
                </div>
              </div>

              {balance !== null && balance < selectedService.price && (
                <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100 font-medium">
                  Aviso: Saldo insuficiente para contratar este serviço.
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Data do Agendamento</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm text-gray-900 outline-none focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Hora do Agendamento</label>
                  <input
                    type="time"
                    required
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm text-gray-900 outline-none focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                onClick={() => setSelectedService(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                disabled={bookingLoading || (balance !== null && balance < selectedService.price) || !scheduledDate || !scheduledTime}
                onClick={handleConfirmBooking}
                className="flex items-center gap-2 rounded-xl bg-[#052a5e] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#031b3e] disabled:opacity-50"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : (
                  "Confirmar Contratação"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
