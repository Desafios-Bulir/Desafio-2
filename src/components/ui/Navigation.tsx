"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, Menu, X } from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-100 bg-black sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Smartphone className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white">ServiFind</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#como-funciona" className="text-sm font-medium text-white hover:text-white transition-colors">
            Como Funciona
          </Link>
          <Link href="#profissionais" className="text-sm font-medium text-white hover:text-white transition-colors">
            Profissionais
          </Link>
          <Link href="#seja-prestador" className="text-sm font-medium text-white hover:text-white transition-colors">
            Seja um Prestador
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-black-500 hover:text-blue-600 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#052a5e] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Cadastre-se
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black px-4 py-6 space-y-4">
          <nav className="flex flex-col gap-4">
            <Link 
              href="#como-funciona" 
              className="text-base font-medium text-white hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              href="#profissionais" 
              className="text-base font-medium text-white hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profissionais
            </Link>
            <Link 
              href="#seja-prestador" 
              className="text-base font-medium text-white hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Seja um Prestador
            </Link>
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
            <Link
              href="/login"
              className="text-center text-base font-semibold text-white hover:text-blue-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="text-center rounded-full bg-[#052a5e] px-5 py-3 text-base font-semibold text-white hover:bg-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
