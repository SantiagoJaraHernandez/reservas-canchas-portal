import { create } from "zustand";
import { parseJwt } from "@/core/utils/jwt";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token) => {
    console.log("TOKEN RECIBIDO:", token);

    localStorage.setItem("token", token);

    const payload = parseJwt(token);

    console.log("PAYLOAD:", payload);

    const user = {
      id: payload?.userId || "",
      email: payload?.sub || "",
      role: payload?.role || "USER",
    };

    console.log("USER GENERADO:", user);

    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) return;

    try {
      const user = JSON.parse(userData);

      set({
        token,
        user,
        isAuthenticated: true,
      });
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
}));

export default useAuthStore;