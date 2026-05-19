import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

interface DashboardHeaderProps {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  actionButton?: React.ReactNode;
}

export function DashboardHeader({
  title,
  showSearch = false,
  searchPlaceholder = "Buscar...",
  actionButton,
}: DashboardHeaderProps) {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-56 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell className="h-4 w-4" />
        </button>
        {actionButton}
      </div>
    </header>
  );
}
