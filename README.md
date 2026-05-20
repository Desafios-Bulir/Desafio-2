# Bulir Desafio 2 - Plataforma de Reserva de Serviços

Uma plataforma web moderna para contratação de serviços do dia a dia (limpeza, cabelereiro, obras, etc.), conectando clientes com prestadores de serviços de forma segura e eficiente.


## Screenshots

### Landing page ServiceFind

![Dashboard Screenshot](./screenshot/image.png)

---

## 🔐 Autenticação

### Usuarios de Teste para fazer login imediato

```typescript
//  Login 1 - Prestador de Serviços
  email: "bulir@gmail.com",
  password: "123456"

```
```typescript
//  Login 2 - Cliente
  email: "gilson@gmail.com",
  password: "123456"

```
---

## Instalação

### Pré-requisitos
- Node.js 18+
- npm 

### Passo 1: Clonar o Repositório

```bash
git clone git@github.com:Desafios-Bulir/Desafio-2.git
cd Desafio-2
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000

# Opcional: outras configurações
NEXT_PUBLIC_APP_NAME=Bulir Services
```

### Passo 4: Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## Visão Geral

**Bulir Services** é um marketplace digital que funciona como intermediário entre:
- **Clientes (CLIENT)**: Procuram e contratam serviços
- **Prestadores (PROVIDER)**: Oferecem e gerenciam seus serviços

A plataforma oferece gerenciamento completo de reservas, carteira digital, histórico de transações e perfil de usuário.

### Roles de Usuário

| Role | Funcionalidades |
|------|-----------------|
| **CLIENT** | Buscar serviços, fazer reservas, gerenciar carteira, ver histórico |
| **PROVIDER** | Criar/editar serviços, receber reservas, gerenciar clientes, carteira |

---

## Features

### Autenticação & Autorização
- Registro diferenciado para Client e Provider
- Autenticação com email/password
- Tokens JWT com persistência (localStorage + cookies)
- Middleware de proteção de rotas

### Dashboard
- Home com estatísticas (saldo, reservas recentes)
- Gerenciamento de reservas
- Visualização de clientes (Provider)
- Carteira digital com saldo em tempo real
- Histórico de transações completo
- Gerenciamento de perfil
- CRUD de serviços (Provider)

### Carteira & Transações
- Saldo em tempo real
- Histórico de transações (enviadas/recebidas)
- Transações com tipo (debit/credit)
- Integração com sistema de reservas

### Sistema de Reservas
- Criação de reservas com agendamento
- Gerenciamento de status de reservas
- Cancelamento de reservas
- Histórico de reservas do cliente e provider

### Interface
- Design responsivo (mobile-first)
- Sidebar dinâmica para mobile
- Dark mode com next-themes
- Componentes shadcn/ui
- Notificações com Sonner

---

## 🛠 Tech Stack

### Frontend
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **Next.js** | 16.2.6 | Framework React com SSR/SSG |
| **React** | 19.2.4 | Biblioteca UI |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **Zustand** | 5.0.13 | State management (auth) |
| **React Context API** | - | State management (UI) |

### Formulários & Validação
| Pacote | Versão | Uso |
|--------|--------|-----|
| **React Hook Form** | 7.76.0 | Gerenciamento de formulários |
| **Zod** | 4.4.3 | Validação de schemas |
| **@hookform/resolvers** | 5.2.2 | Integração Zod + RHF |

### HTTP & API
| Pacote | Versão | Uso |
|--------|--------|-----|
| **Axios** | 1.16.1 | HTTP client |
| **Bearer Token** | - | Autenticação com JWT |

### UI & Componentes
| Pacote | Uso |
|--------|-----|
| **shadcn/ui** | Componentes acessíveis |
| **Radix UI** | Primitivos UI |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **next-themes** | Theme switching |

### Utilitários
| Pacote | Uso |
|--------|-----|
| **clsx** | Conditional className merging |
| **tailwind-merge** | Tailwind class conflict resolution |

---


### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                      LANDING PAGE                           │
└─────────────────────────────────────────────────────────────┘
                     ↓ ↓
        ┌────────────┴──────────────┐
        ↓                           ↓
    ┌────────────┐         ┌────────────────┐
    │   LOGIN    │         │   REGISTER     │
    └──────┬─────┘         └────────┬───────┘
           │                        │
           │ authService.login      │ authService.register{Client,Provider}
           │                        │
           ↓                        ↓
    ┌─────────────────────────────────┐
    │   API Backend /auth/login       │
    └────────────┬────────────────────┘
                 │
                 ↓
    ┌──────────────────────────────┐
    │  Token + User Data (JWT)     │
    │  • localStorage              │         │
    │  • Zustand auth.store        │
    └────────────┬─────────────────┘
                 │
                 ↓
    ┌──────────────────────────────┐
    │      DASHBOARD               │
    │  ├─ Home (stats)             │
    │  ├─ Reservas                 │
    │  ├─ Carteira                 │
    │  ├─ Histórico                │
    │  ├─ Clientes (PROVIDER)      │
    │  ├─ Services (PROVIDER)      │
    │  └─ Perfil                   │
    └────────────┬─────────────────┘
                 │
                 │ API Interceptor
                 │ Bearer Token
                 ↓
    ┌──────────────────────────────┐
    │   API Backend (Protected)    │
    │   • /api/v1/services         │
    │   • /api/v1/bookings         │
    │   • /api/v1/wallet           │
    │   • /api/v1/users            │
    └──────────────────────────────┘
```

---

## Como Usar

### Fluxo de Registro

#### Cliente
1. Acesse `/register`
2. Selecione "Sou Cliente"
3. Preencha: Nome, Email, Senha, Telefone
4. Clique em "Registrar"

#### Prestador de Serviços
1. Acesse `/register`
2. Selecione "Sou Prestador"
3. Preencha: Nome, Email, NIF, Senha, Telefone
4. Clique em "Registrar"

### Fluxo de Login

1. Acesse `/login`
2. Insira Email e Senha
3. Clique em "Entrar"
4. Você será redirecionado para `/dashboard`

### Funcionalidades por Role

#### Cliente
- **Dashboard**: Ver saldo, reservas recentes, métricas
- **Reservas**: Buscar e contratar serviços, cancelar reservas
- **Carteira**: Visualizar saldo disponível
- **Histórico**: Ver todas as transações
- **Perfil**: Editar dados pessoais

#### Prestador
- **Dashboard**: Ver ganhos, clientes recentes, métricas
- **Reservas**: Gerenciar solicitações de serviço
- **Clientes**: Ver lista de clientes que contrataram
- **Carteira**: Visualizar ganhos
- **Histórico**: Ver transações recebidas
- **Serviços**: Criar, editar e deletar serviços oferecidos
- **Perfil**: Editar dados profissionais

---

### Camadas da Aplicação

#### 1. **Camada de Apresentação** (`src/app/`, `src/components/`)
- Rotas (pages)
- Layouts
- Componentes reutilizáveis
- Formulários com validação

#### 2. **Camada de Lógica** (`src/services/`)
- `auth.service.ts`: Autenticação
- `bookings.service.ts`: Gerenciamento de reservas
- `services.service.ts`: CRUD de serviços
- `wallet.service.ts`: Transações e saldo

#### 3. **Camada de Estado** (`src/store/`, `src/contexts/`)
- `auth.store.ts`: Estado global de autenticação (Zustand)
- `SidebarContext.tsx`: Estado local de UI (Context API)

#### 4. **Camada de HTTP** (`src/services/api.ts`)
- Configuração de Axios
- Interceptor de Bearer Token
- Baseado em Temas

---

## 🔐 Autenticação & Autorização

### Fluxo de Autenticação

```typescript
// 1. Login
const { access_token, user } = await authService.login({
  email: "user@example.com",
  password: "senha123"
});

// 2. Armazenar token
localStorage.setItem("token", access_token);
document.cookie = `token=${access_token}; max-age=${7 * 24 * 60 * 60}`;

// 3. Zustand store
useAuthStore.setState({ token: access_token, user });

```

### Proteção de Rotas

Implementado via `middleware.ts`:
- Redireciona usuários não autenticados para `/login`
- Redireciona usuários autenticados em `/login` para `/dashboard`

### Persistência

- Token salvo em `localStorage` (para recarregar página)

```

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


## 📊 Versão

- **Versão Atual**: 0.1.0
- **Última Atualização**: Maio 2026
- **Status**: Em Desenvolvimento

---
## Author
- Gilson Chipombo


