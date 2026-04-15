import { useEffect, useState } from "react";
import { getCanchaById } from "../services/canchaServices";

function useCanchaById(id) {
  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCancha() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");
        const data = await getCanchaById(id);
        setCancha(data);
      } catch (err) {
        const mensaje =
          err.response?.data?.message ||
          err.response?.data?.mensaje ||
          "No fue posible cargar la cancha";
        setError(mensaje);
      } finally {
        setLoading(false);
      }
    }

    fetchCancha();
  }, [id]);

  return { cancha, loading, error };
}

export default useCanchaById;