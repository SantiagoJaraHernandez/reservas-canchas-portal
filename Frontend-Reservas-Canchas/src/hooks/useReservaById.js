import { useEffect, useState } from "react";
import { getReservaById } from "../services/reservaServices";

function useReservaById(id) {
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReserva() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");
        const data = await getReservaById(id);
        setReserva(data);
      } catch (err) {
        const mensaje =
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "No fue posible cargar la reserva";
        setError(mensaje);
      } finally {
        setLoading(false);
      }
    }

    fetchReserva();
  }, [id]);

  return { reserva, loading, error };
}

export default useReservaById;