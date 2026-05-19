"use client";

import Link from "next/link";
import { Smartphone } from "lucide-react";

export function Navigation() {
  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Smartphone className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">ServiFind</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#como-funciona" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
            Como Funciona
          </Link>
          <Link href="#profissionais" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
            Profissionais
          </Link>
          <Link href="#seja-prestador" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
            Seja um Prestador
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </header>
  );
}
