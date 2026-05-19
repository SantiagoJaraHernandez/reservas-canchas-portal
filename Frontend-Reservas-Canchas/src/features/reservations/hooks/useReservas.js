import { useEffect, useState, useCallback } from 'react';
import { reservaService } from '@/features/reservations/services/reservaService';
import { toast } from 'sonner';

export function useReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔥 helper REAL para errores
  const getErrorMessage = (err, fallback) => {
    if (typeof err === "string") return err;

    return (
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      fallback
    );
  };

  const fetchReservas = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await reservaService.getAll();
      setReservas(data);

    } catch (err) {
      console.error("❌ ERROR REAL fetch:", err);

      const msg = getErrorMessage(err, 'No se pudieron cargar las reservas');

      setError(msg);
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservas();
  }, [fetchReservas]);

  const agregarReserva = async (payload) => {
    try {
      const nueva = await reservaService.create(payload);

      setReservas((prev) => [...prev, nueva]);

      toast.success('Reserva creada correctamente');
      return { ok: true, data: nueva };

    } catch (err) {
      console.error("❌ ERROR REAL crear:", err);

      const msg = getErrorMessage(err, 'Error al crear la reserva');

      toast.error(msg);

      return { ok: false, message: msg };
    }
  };

  const editarReserva = async (id, payload) => {
    try {
      const actualizada = await reservaService.update(id, payload);

      setReservas((prev) =>
        prev.map((r) => (r.id === id ? actualizada : r))
      );

      toast.success('Reserva actualizada');
      return { ok: true, data: actualizada };

    } catch (err) {
      console.error("❌ ERROR REAL editar:", err);

      const msg = getErrorMessage(err, 'Error al actualizar');

      toast.error(msg);

      return { ok: false, message: msg };
    }
  };

  const eliminarReserva = async (id) => {
    try {
      await reservaService.delete(id);

      setReservas((prev) => prev.filter((r) => r.id !== id));

      toast.success('Reserva eliminada');
      return { ok: true };

    } catch (err) {
      console.error("❌ ERROR REAL eliminar:", err);

      const msg = getErrorMessage(err, 'Error al eliminar');

      toast.error(msg);

      return { ok: false, message: msg };
    }
  };

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