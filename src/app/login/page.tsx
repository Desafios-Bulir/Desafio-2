"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import Footer from "@/components/Footer";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const response = await authService.login(formData);

      setAuth(response.access_token, {
        id: response.user.id,
        fullName: response.user.fullName,
        role: response.user.role,
        email: response.user.email,
        phone: response.user.phone,
      });

      toast.success(`Bem-vindo de volta, ${response.user.fullName}!`);
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao iniciar sessão";
      toast.error(errorMessage);
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <div className="flex min-h-[calc(100vh-65px)] items-start justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          
          {/* Heading */}
          <div className="text-center mt-17">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Bem-vindo de volta
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              Entre para gerir os seus serviços e reservas.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
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
                  disabled={loading}
                  placeholder="gilson@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                    Senha
                  </label>
                  <Link 
                    href="#" 
                    className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#052a5e] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="btn-entrar"
                disabled={loading}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-[#052a5e] py-3 text-sm font-bold text-white shadow-md hover:bg-[#031b3e] transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Iniciando sessão...
                  </>
                ) : (
                  "Entrar no ServiFind"
                )}
              </button>
            </form>

            {/* Register link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Cadastre-se agora
              </Link>
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
