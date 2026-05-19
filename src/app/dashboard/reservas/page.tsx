"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Plus, MapPin, Banknote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ── Components ──
function Tab({ label, badge, isActive }: { label: string; badge?: number; isActive?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "border-[#1e3a8a] text-[#1e3a8a]"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
      {badge !== undefined && (
        <span
          className={`flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold ${
            isActive ? "bg-[#1e3a8a] text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function ReservasPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader
        title="Gerenciar Reservas"
        showSearch
        actionButton={
          <button className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 transition-colors">
            <Plus className="h-4 w-4" />
            Nova Reserva
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
        
        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-200">
          <Tab label="Próximas" badge={3} isActive />
          <Tab label="Pendentes" badge={1} />
          <Tab label="Concluídas" />
          <Tab label="Canceladas" />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
          
          {/* ── Left Column: Booking List ── */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            
            {/* HOJE */}
            <section>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                Hoje, 15 de Outubro
              </h3>
              <div className="flex flex-col gap-4">
                
                {/* Card 1 */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  {/* Time */}
                  <div className="flex w-16 flex-col items-center justify-center sm:items-start">
                    <span className="text-xl font-bold text-[#1e3a8a]">14:00</span>
                    <span className="text-sm text-gray-400">16:00</span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-2 border-l-2 border-blue-100 pl-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-bold text-[#1e3a8a]">Reforma de Banheiro</h4>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                        Confirmado
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                          J
                        </div>
                        <span className="font-medium text-gray-700">João Fernandes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        Rua das Flores, 123
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[#1e3a8a]">
                        <Banknote className="h-4 w-4 text-gray-400" />
                        KZ 450,00
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full sm:w-auto flex-col gap-2 border-t border-gray-100 pt-4 sm:border-none sm:pt-0">
                    <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#1e3a8a] transition-colors hover:bg-gray-50">
                      Ver Detalhes
                    </button>
                    <button className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1e3a8a] transition-colors hover:bg-blue-100">
                      Iniciar
                    </button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  {/* Time */}
                  <div className="flex w-16 flex-col items-center justify-center sm:items-start">
                    <span className="text-xl font-bold text-[#1e3a8a]">16:30</span>
                    <span className="text-sm text-gray-400">18:00</span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-2 border-l-2 border-blue-100 pl-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-bold text-[#1e3a8a]">Orçamento Presencial</h4>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                        Confirmado
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                          M
                        </div>
                        <span className="font-medium text-gray-700">Marta Oliveira</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        Av. Central, 45
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[#1e3a8a]">
                        <Banknote className="h-4 w-4 text-gray-400" />
                        Grátis
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full sm:w-auto flex-col justify-center border-t border-gray-100 pt-4 sm:border-none sm:pt-0">
                    <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#1e3a8a] transition-colors hover:bg-gray-50">
                      Ver Detalhes
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* AMANHÃ */}
            <section>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                Amanhã, 16 de Outubro
              </h3>
              <div className="flex flex-col gap-4">
                
                {/* Card 3 */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  {/* Time */}
                  <div className="flex w-16 flex-col items-center justify-center sm:items-start">
                    <span className="text-xl font-bold text-[#1e3a8a]">09:00</span>
                    <span className="text-sm text-gray-400">12:00</span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-2 border-l-2 border-orange-100 pl-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-bold text-[#1e3a8a]">Troca de Piso (Sala)</h4>
                      <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                        Aguardando Confirmação
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
                          A
                        </div>
                        <span className="font-medium text-gray-700">Ana Costa</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        Rua das Acácias, 88
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[#1e3a8a]">
                        <Banknote className="h-4 w-4 text-gray-400" />
                        KZ 850,00
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full sm:w-auto flex-col gap-2 border-t border-gray-100 pt-4 sm:border-none sm:pt-0">
                    <button className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900">
                      Confirmar
                    </button>
                    <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50">
                      Recusar
                    </button>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* ── Right Column: Calendar & Summary ── */}
          <div className="flex flex-col gap-6">
            
            {/* Calendar */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-[#1e3a8a]">Outubro 2023</h3>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-[#1e3a8a]"><ChevronLeft className="h-5 w-5" /></button>
                  <button className="text-gray-400 hover:text-[#1e3a8a]"><ChevronRight className="h-5 w-5" /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
                {/* Days of week */}
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                  <div key={i} className="font-semibold text-gray-400 text-xs">{d}</div>
                ))}
                
                {/* Mock dates */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const isToday = day === 15;
                  const hasPending = day === 16;
                  const hasConfirmed = day === 21;
                  
                  return (
                    <div key={day} className="flex flex-col items-center justify-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                          isToday
                            ? "bg-[#1e3a8a] font-bold text-white shadow-md"
                            : "text-[#1e3a8a] font-medium hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {day}
                      </span>
                      {hasPending && <span className="mt-0.5 h-1 w-1 rounded-full bg-orange-400"></span>}
                      {hasConfirmed && <span className="mt-0.5 h-1 w-1 rounded-full bg-blue-500"></span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumo da Semana */}
            <div className="rounded-2xl border border-blue-50 bg-blue-50/50 p-6 shadow-sm">
              <h3 className="mb-5 font-bold text-[#1e3a8a]">Resumo da Semana</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Reservas Confirmadas</span>
                  <span className="font-bold text-[#1e3a8a]">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Aguardando Confirmação</span>
                  <span className="font-bold text-orange-500">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Cancelamentos</span>
                  <span className="font-bold text-red-500">0</span>
                </div>
                
                <div className="my-2 border-t border-blue-100"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1e3a8a]">Ganhos Previstos</span>
                  <span className="text-lg font-bold text-[#1e3a8a]">KZ 2.450,00</span>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
