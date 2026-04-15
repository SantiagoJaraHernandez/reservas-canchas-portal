import { useEffect, useState } from "react";
import {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../services/reservaServices";

function useReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchReservas() {
    try {
      setLoading(true);
      setError("");
      const data = await getReservas();
      setReservas(data);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.mensaje ||
        "No fue posible cargar las reservas";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservas();
  }, []);

  async function agregarReserva(payload) {
    try {
      const nueva = await createReserva(payload);
      setReservas((prev) => [...prev, nueva]);
      return { ok: true, data: nueva };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al crear la reserva",
      };
    }
  }

  async function editarReserva(id, payload) {
    try {
      const actualizada = await updateReserva(id, payload);
      setReservas((prev) =>
        prev.map((item) => (item.id === id ? actualizada : item))
      );
      return { ok: true, data: actualizada };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al actualizar la reserva",
      };
    }
  }

  async function eliminarReserva(id) {
    try {
      await deleteReserva(id);
      setReservas((prev) => prev.filter((item) => item.id !== id));
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al eliminar la reserva",
      };
    }
  }

  return {
    reservas,
    loading,
    error,
    fetchReservas,
    agregarReserva,
    editarReserva,
    eliminarReserva,
  };
}

export default useReservas;