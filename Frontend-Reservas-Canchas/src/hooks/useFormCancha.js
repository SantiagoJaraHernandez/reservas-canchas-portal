import { useState } from "react";

export function useFormCancha(cancha, onSubmitCancha) {
  const [formData, setFormData] = useState({
    id: cancha?.id ?? null,
    nombre: cancha?.nombre ?? "",
    tipo: cancha?.tipo ?? "",
    precioHora: cancha?.precioHora ?? "",
    activa:
      cancha?.activa === true
        ? "true"
        : cancha?.activa === false
        ? "false"
        : "true",
    descripcion: cancha?.descripcion ?? "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  function validar() {
    const nuevosErrores = {};

    if (!formData.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.tipo) nuevosErrores.tipo = "El tipo es obligatorio";
    if (!formData.precioHora) nuevosErrores.precioHora = "El precio es obligatorio";

    if (
      formData.precioHora &&
      Number(formData.precioHora) <= 0
    ) {
      nuevosErrores.precioHora = "El precio debe ser mayor a 0";
    }

    if (!["true", "false"].includes(String(formData.activa).toLowerCase())) {
      nuevosErrores.activa = 'El valor debe ser "true" o "false"';
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
      precioHora: Number(formData.precioHora),
      activa: String(formData.activa).toLowerCase() === "true",
    };

    const resultado = await onSubmitCancha(payload);

    setEnviando(false);

    if (!resultado.ok) {
      setErrorApi(resultado.mensaje);
    }

    return resultado;
  }

  return { formData, handleChange, errores, errorApi, enviando, handleSubmit };
}