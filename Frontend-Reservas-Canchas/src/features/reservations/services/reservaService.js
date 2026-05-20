import axiosClient from '@/core/api/axiosClient';

export const reservaService = {
  getAll: async () => {
    const { data } = await axiosClient.get('/reservas');
    return data;
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`/reservas/${id}`);
    return data;
  },
  create: async (payload) => {
    try {
      console.log("📦 Payload enviado:", payload); // 👀 aquí ves el usuario y demás campos
      const { data } = await axiosClient.post('/reservas', payload);
      return data;
    } catch (err) {
      // 👇 Captura el mensaje real del backend
      console.error("❌ Error al crear reserva:", err.response?.data || err.message);
      throw err.response?.data?.message || "Error desconocido al crear reserva";
    }
  },
  update: async (id, payload) => {
    try {
      console.log("📦 Payload update:", payload);
      const { data } = await axiosClient.put(`/reservas/${id}`, payload);
      return data;
    } catch (err) {
      console.error("❌ Error al actualizar reserva:", err.response?.data || err.message);
      throw err.response?.data?.message || "Error desconocido al actualizar";
    }
  },
  delete: async (id) => {
    try {
      await axiosClient.delete(`/reservas/${id}`);
    } catch (err) {
      console.error("❌ Error al eliminar reserva:", err.response?.data || err.message);
      throw err.response?.data?.message || "Error desconocido al eliminar";
    }
  },
};
