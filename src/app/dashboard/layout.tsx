"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, LayoutDashboard, Users, CalendarDays, Wallet, History, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clientes", href: "/dashboard/clientes", icon: Users },
  { label: "Reservas", href: "/dashboard/reservas", icon: CalendarDays, badge: 3 },
  { label: "Saldo", href: "/dashboard/saldo", icon: Wallet },
  { label: "Histórico", href: "/dashboard/historico", icon: History },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-100 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Smartphone className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-gray-900">ServiFind</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-blue-500" : "text-gray-400")} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="border-t border-gray-100 px-4 py-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">
              M
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Maria Silva</p>
              <p className="text-xs text-gray-400 truncate">Ladrilhadora</p>
            </div>
            <ChevronUp className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
