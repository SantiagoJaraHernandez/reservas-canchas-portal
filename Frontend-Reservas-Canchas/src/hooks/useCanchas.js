import { useEffect, useState } from "react";
import {
  getCanchas,
  createCancha,
  updateCancha,
  deleteCancha,
} from "../services/canchaServices";

function useCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCanchas() {
    try {
      setLoading(true);
      setError("");
      const data = await getCanchas();
      setCanchas(data);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.mensaje ||
        "No fue posible cargar las canchas";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCanchas();
  }, []);

  async function agregarCancha(payload) {
    try {
      const nueva = await createCancha(payload);
      setCanchas((prev) => [...prev, nueva]);
      return { ok: true, data: nueva };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al crear la cancha",
      };
    }
  }

  async function editarCancha(id, payload) {
    try {
      const actualizada = await updateCancha(id, payload);
      setCanchas((prev) =>
        prev.map((item) => (item.id === id ? actualizada : item))
      );
      return { ok: true, data: actualizada };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al actualizar la cancha",
      };
    }
  }

  async function eliminarCancha(id) {
    try {
      await deleteCancha(id);
      setCanchas((prev) => prev.filter((item) => item.id !== id));
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        mensaje:
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "Error al eliminar la cancha",
      };
    }
  }

  return {
    canchas,
    loading,
    error,
    fetchCanchas,
    agregarCancha,
    editarCancha,
    eliminarCancha,
  };
}

export default useCanchas;