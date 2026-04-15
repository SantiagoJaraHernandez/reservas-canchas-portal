import { useState } from "react";

export function useFormReservas(reserva, onSubmitReserva) {
  const [formData, setFormData] = useState({
    id: reserva?.id ?? null,
    idCancha: reserva?.idCancha ?? "",
    fecha: reserva?.fecha ?? "",
    horaInicio: reserva?.horaInicio ?? "",
    horaFin: reserva?.horaFin ?? "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  function validar() {
    const nuevosErrores = {};

    if (!formData.idCancha) nuevosErrores.idCancha = "Debes seleccionar una cancha";
    if (!formData.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!formData.horaInicio) nuevosErrores.horaInicio = "Hora inicio requerida";
    if (!formData.horaFin) nuevosErrores.horaFin = "Hora fin requerida";

    if (
      formData.horaInicio &&
      formData.horaFin &&
      formData.horaFin <= formData.horaInicio
    ) {
      nuevosErrores.horaFin =
        "La hora de fin debe ser posterior a la hora de inicio";
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
      return { ok: false };
    }

    setEnviando(true);

    const payload = {
      ...formData,
      idCancha: Number(formData.idCancha),
    };

    const resultado = await onSubmitReserva(payload);
    setEnviando(false);

    if (!resultado.ok) {
      setErrorApi(resultado.mensaje);
    }

    return resultado;
  }

  return { formData, handleChange, errores, errorApi, enviando, handleSubmit };
}