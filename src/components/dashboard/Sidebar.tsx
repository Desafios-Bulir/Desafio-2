"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Smartphone, LayoutDashboard, Users, User, CalendarDays, Wallet, History, LogOut, Briefcase, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuthStore } from "@/store/auth.store";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useSidebar();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const displayName = user?.fullName || "Gilson Chipombo";
  const displayRole = user?.role === "PROVIDER" ? "Prestador" : user?.role === "CLIENT" ? "Cliente" : "Programador";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    user?.role === "PROVIDER"
      ? { label: "Clientes", href: "/dashboard/clientes", icon: Users }
      : { label: "Perfil", href: "/dashboard/perfil", icon: User },
    { label: "Serviços", href: "/dashboard/services", icon: Briefcase },
    { label: "Reservas", href: "/dashboard/reservas", icon: CalendarDays, badge: 3 },
    { label: "Carteira", href: "/dashboard/carteira", icon: Wallet },
    { label: "Histórico", href: "/dashboard/historico", icon: History },
  ];

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
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#052a5e] transition-transform duration-300 md:static md:w-56 md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white">
              <Smartphone className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-white">ServiceFind</span>
          </div>
          
          <button 
            className="md:hidden p-2 -mr-2 text-blue-200 hover:text-white"
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
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-blue-300")} />
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
        <div className="border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          <div className="flex w-full items-center gap-3 rounded-lg px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-white truncate">{displayName}</p>
              <p className="text-xs text-blue-200 truncate">{displayRole}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-200 hover:bg-white/5 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4 text-red-300" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  );
}
