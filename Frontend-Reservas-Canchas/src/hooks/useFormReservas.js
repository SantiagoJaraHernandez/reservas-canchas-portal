import { useState } from "react";

export function useFormReservas(reserva, onSubmitReserva) {


    const [formData, setFormData] = useState({
        id: reserva?.id ?? null,
        idUsuario: reserva?.idUsuario ?? "",
        idCancha: reserva?.idCancha ?? "",
        fecha: reserva?.fecha ?? "",
        horaInicio: reserva?.horaInicio ?? "",
        horaFin: reserva?.horaFin ?? ""
    });

    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [errorApi, setErrorApi] = useState("");

    function validar() {
        const nuevosErrores = {};
        if (!formData.idUsuario) nuevosErrores.idUsuario = "El Usuario Es Requerido";
        if (!formData.idCancha) nuevosErrores.idCancha = "La cancha es requerida";
        if (!formData.fecha) nuevosErrores.fecha = "La Fecha Es Obligatoria";
        if (!formData.horaInicio) nuevosErrores.horaInicio = "Hora Inicio requerida";
        if (!formData.horaFin) nuevosErrores.horaFin = "Hora Fin es Requerida";
        if (formData.horaFin <= formData.horaInicio) {
            nuevosErrores.horaFin = "La hora de fin debe ser despues de la hora inicio";
        }
        return nuevosErrores;
    }

    function handleChange(campo, valor) {
        setFormData((prev) => ({ ...prev, [campo]: valor }));
        setErrores((prev) => ({ ...prev, [campo]: "" }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorApi("");

        const erroresEncontrados = validar();
        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            return { ok: false }
        }

        setEnviando(true);
        const resultado = await onSubmitReserva(formData);
        setEnviando(false);

        if (!resultado.ok) {
            setErrorApi(resultado.mensaje);
        }
        return resultado;

    }

    return { formData, handleChange, errores, errorApi, enviando, handleSubmit }
}