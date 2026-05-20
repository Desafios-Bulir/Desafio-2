import { create } from "zustand";

interface User {
  id: string;
  fullName: string;
  role: "CLIENT" | "PROVIDER";
  email: string;
  phone?: string;
}


interface AuthStore {
  token: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    if (typeof window !== "undefined") {
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
    }

    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      document.cookie = "token=; path=/; max-age=0";
    }

    set({
      token: null,
      user: null,
    });
  },
}));