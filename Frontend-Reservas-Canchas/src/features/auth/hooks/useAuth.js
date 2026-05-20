import { useState } from "react";
import { authService } from "../services/authServices";
import useAuthStore from "@/app/store/authStore";

export const useAuth = () => {
  const loginStore = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(credentials);

      const token = response?.token;

      if (!token) {
        console.error("Respuesta backend:", response);
        throw new Error("Token no recibido");
      }

      loginStore(token);

      return { ok: true };
    } catch (err) {
      setError(err);
      return { ok: false, message: err };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      await authService.register(payload);

      return { ok: true };
    } catch (err) {
      setError(err);
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
};