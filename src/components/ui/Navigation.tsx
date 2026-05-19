"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#featured-services" },
  { label: "Como funciona", href: "/#how-it-works" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating Navigation Bar */}
      <header className="fixed left-1/2 top-6 z-50 w-[90%] max-w-2xl -translate-x-1/2 transform rounded-full border border-white/20 bg-white/10 px-8 py-3 backdrop-blur-xl sm:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-bold">
              B
            </div>
          </Link>

          {/* Navigation Items - Hidden on mobile */}
          <nav className="hidden items-center gap-1 sm:flex">
            {navigationItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-slate-950"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <Button
            asChild
            size="sm"
            className="bg-amber-400 text-slate-950 hover:bg-amber-500 whitespace-nowrap"
          >
            <Link href="/#featured-services">
              Explorar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under floating nav */}
      <div className="h-4" />
    </>
  );
}
