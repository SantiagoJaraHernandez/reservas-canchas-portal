import { api } from "@/core/api/api";

export const canchaService = {
  getAll: () => api.get("/canchas"),
  getActivas: () => api.get("/canchas/activas"),
  getById: (id) => api.get(`/canchas/${id}`),
};
