import api from "../config/api";
import { useState, useEffect } from "react";

function useReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        getReservas();
    }, []);

    async function getReservas() {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.get("/reservas");
            setReservas(data);
        } catch (error) {
            setError("No se puedieron cargar las reservas");
        }finally {
            setLoading(false);
        }
    }

    async function createReserva(newReservation) {
        try {

            const {id, ...dataToSend} = newReservation; 
            const { data } = await api.post("/reservas", dataToSend);
            setReservas((prev) => [...prev, data]);
            return { ok: true }
        } catch (error) {
            console.error(error);
            return { ok: false, mensaje: "Error al crear la Reserva" };
        }
    }

    async function updateReserva(dataUpdate) {
        try {
            const { data } = await api.put(`/reservas/${dataUpdate.id}`, dataUpdate);
            setReservas((prev) =>
                prev.map((reserva) => (reserva.id === dataUpdate.id ? data : reserva)));
            return { ok: true }
        } catch (error) {
            console.error(error);
            return { ok: false, mensaje: "Error Al Actualizar La Reserva" };
        }
    }

    async function deleteReserva(id) {
        try {
            await api.delete(`/reservas/${id}`);
            setReservas((prev) =>
                prev.filter((reserva) => reserva.id !== id));
            return { ok: true };
        } catch (error) {
            return { ok: false, mensaje: "Error al eliminar la reserva" };
        }
    }

    return { reservas, loading, error, createReserva, updateReserva, deleteReserva };
}
export default useReservas;