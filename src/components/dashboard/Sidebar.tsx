"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, LayoutDashboard, Users, CalendarDays, Wallet, History, ChevronUp, Briefcase, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";

const navItems = [
  { label: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clientes", href: "/dashboard/clientes", icon: Users },
  { label: "Serviços", href: "/dashboard/services", icon: Briefcase },
  { label: "Reservas", href: "/dashboard/reservas", icon: CalendarDays, badge: 3 },
  { label: "Carteira", href: "/dashboard/carteira", icon: Wallet },
  { label: "Histórico", href: "/dashboard/historico", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useSidebar();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 md:static md:w-56 md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white">
              <Smartphone className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-gray-900">ServiFind</span>
          </div>
          
          <button 
            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileSidebarOpen(false)} // Close sidebar on mobile after navigating
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
              <p className="text-sm font-semibold text-gray-900 truncate">Gilson Chipombo</p>
              <p className="text-xs text-gray-400 truncate">Programador</p>
            </div>
            <ChevronUp className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
