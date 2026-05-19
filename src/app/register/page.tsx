'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Briefcase } from 'lucide-react';

// Validation schemas
const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

const providerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  profession: z.string().min(3, 'Profissão obrigatória'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

type ClientFormData = z.infer<typeof clientSchema>;
type ProviderFormData = z.infer<typeof providerSchema>;

export default function RegisterPage() {
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const providerForm = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
  });

  const onClientSubmit = async (data: ClientFormData) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com API backend
      console.log('Cliente registrado:', data);
      // await api.post('/auth/register/client', data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onProviderSubmit = async (data: ProviderFormData) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com API backend
      console.log('Profissional registrado:', data);
      // await api.post('/auth/register/provider', data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 transition">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Role Selection */}
        {userType === null ? (
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Crie sua conta
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Escolha o tipo de conta que melhor se adequa a você
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Client Card */}
              <button
                onClick={() => setUserType('client')}
                className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">Sou Cliente</h3>
                  <p className="mt-2 text-slate-600">
                    Procuro por profissionais para contratar serviços
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    Continuar
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </div>
                </div>
              </button>

              {/* Provider Card */}
              <button
                onClick={() => setUserType('provider')}
                className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 text-left hover:border-orange-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">Sou Profissional</h3>
                  <p className="mt-2 text-slate-600">
                    Quero oferecer meus serviços e ganhar dinheiro
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
                    Continuar
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </div>
                </div>
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-slate-600">
              Já tem conta?{' '}
              <Link href="/login" className="font-semibold text-slate-950 hover:text-blue-600">
                Faça login
              </Link>
            </p>
          </div>
        ) : null}

        {/* Client Form */}
        {userType === 'client' && (
          <div className="mx-auto max-w-2xl">
            <button
              onClick={() => setUserType(null)}
              className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
              <h2 className="mb-8 text-3xl font-bold text-slate-950">Registre-se como Cliente</h2>

              <form onSubmit={clientForm.handleSubmit(onClientSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Nome Completo
                  </label>
                  <input
                    {...clientForm.register('name')}
                    type="text"
                    placeholder="João Silva"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {clientForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{clientForm.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Email
                  </label>
                  <input
                    {...clientForm.register('email')}
                    type="email"
                    placeholder="joao@exemplo.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {clientForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{clientForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Telefone
                  </label>
                  <input
                    {...clientForm.register('phone')}
                    type="tel"
                    placeholder="+244 92 412 3456"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {clientForm.formState.errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{clientForm.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Senha
                  </label>
                  <input
                    {...clientForm.register('password')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {clientForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">{clientForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    {...clientForm.register('confirmPassword')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {clientForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{clientForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Registrando...' : 'Criar Conta'}
                </button>
              </form>

              <p className="mt-6 text-center text-slate-600">
                Já tem conta?{' '}
                <Link href="/login" className="font-semibold text-slate-950 hover:text-blue-600">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Provider Form */}
        {userType === 'provider' && (
          <div className="mx-auto max-w-2xl">
            <button
              onClick={() => setUserType(null)}
              className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
              <h2 className="mb-8 text-3xl font-bold text-slate-950">Registre-se como Profissional</h2>

              <form onSubmit={providerForm.handleSubmit(onProviderSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Nome Completo
                  </label>
                  <input
                    {...providerForm.register('name')}
                    type="text"
                    placeholder="João Silva"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Email
                  </label>
                  <input
                    {...providerForm.register('email')}
                    type="email"
                    placeholder="joao@exemplo.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Telefone
                  </label>
                  <input
                    {...providerForm.register('phone')}
                    type="tel"
                    placeholder="+244 92 412 3456"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Profissão / Tipo de Serviço
                  </label>
                  <input
                    {...providerForm.register('profession')}
                    type="text"
                    placeholder="Ex: Encanador, Pintor, Designer"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.profession && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.profession.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Senha
                  </label>
                  <input
                    {...providerForm.register('password')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    {...providerForm.register('confirmPassword')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {providerForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{providerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition"
                >
                  {isLoading ? 'Registrando...' : 'Criar Conta'}
                </button>
              </form>

              <p className="mt-6 text-center text-slate-600">
                Já tem conta?{' '}
                <Link href="/login" className="font-semibold text-slate-950 hover:text-blue-600">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
