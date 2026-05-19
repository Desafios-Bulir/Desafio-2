"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, Eye, EyeOff } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import Footer from "@/components/Footer";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";


export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"CLIENT" | "PROVIDER">("CLIENT");
  const [formData, setFormData] = useState({
    name: "",
    nif: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        ...(role === "PROVIDER" && { nif: formData.nif }),
      };

      const response =
        role === "CLIENT"
          ? await authService.registerClient(payload)
          : await authService.registerProvider(payload);

      // Salvar token e usuário no store
      setAuth(response.access_token, {
        id: response.user.id,
        fullName: response.user.fullName,
        role: response.user.role,
      });

      toast.success(`Bem-vindo, ${response.user.fullName}!`);
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar conta";
      toast.error(errorMessage);
      console.error("Erro ao registrar:", error);
    } finally {
      setLoading(false);
    }
  }

  return (<>
      <Navigation/>
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
    
        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900 text-center mt-10">
          Crie sua conta
        </h1>
        <p className="mt-1 pt-2 text-sm text-black font-medium">
          Encontre ou ofereça serviços de forma rápida e segura.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {/* Tipo de Conta */}
          <div className="flex rounded-xl bg-gray-200 p-1">
            <button
              type="button"
              onClick={() => setRole("CLIENT")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${role === "CLIENT" ? "bg-[#052a5e] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Quero contratar
            </button>
            <button
              type="button"
              onClick={() => setRole("PROVIDER")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${role === "PROVIDER" ? "bg-[#052a5e] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Sou prestador
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nome Completo */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-gray-800">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Ex: Gilson Chipombo"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Telemóvel */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-800">
                Telemóvel
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="9XX XXX XXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* NIF */}
            {role === "PROVIDER" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nif" className="text-sm font-semibold text-gray-800">
                  NIF
                </label>
                <input
                  id="nif"
                  name="nif"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="123456789"
                  value={formData.nif}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="gilson@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400">Mínimo de 6 caracteres.</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="btn-criar-conta"
              disabled={loading}
              className="mt-1 w-full rounded-lg bg-[#052a5e] py-3 text-sm font-bold text-white hover:bg-[#031b3e] transition-colors active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-black">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 hover:text-blue-600 transition-colors"
            >
              Faça login
            </Link>
          </p>

        </div>
      </div>
    </div>
     <Footer/>
    </>
  );
}
