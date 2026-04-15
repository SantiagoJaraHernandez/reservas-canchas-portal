import { useState } from "react";
import BtnAccion from "../Botones/ButtonAccion";
import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";

function FormularioDelete({ titulo, subTitulo, textoBoton, reserva, onDeleteReserva }) {
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  async function handleDelete(e) {
    e.preventDefault();
    setLoading(true);
    setErrorApi("");

    const result = await onDeleteReserva();

    if (!result.ok) {
      setErrorApi(result.mensaje);
    }

    setLoading(false);
  }

  return (
    <section className="bg-white rounded-card shadow-card p-6 max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <Titulo titulo={titulo} className="font-bold text-3xl" />
        <SubTitulo subTitle={subTitulo} className="text-slate-500" />
      </div>

      <div className="space-y-3 mb-6 text-slate-700">
        <p><strong>ID:</strong> {reserva?.id}</p>
        <p><strong>Cancha:</strong> {reserva?.idCancha}</p>
        <p><strong>Fecha:</strong> {reserva?.fecha}</p>
        <p><strong>Hora Inicio:</strong> {reserva?.horaInicio}</p>
        <p><strong>Hora Fin:</strong> {reserva?.horaFin}</p>
      </div>

      {errorApi && <p className="text-red-500 text-sm mb-4">{errorApi}</p>}

      <form onSubmit={handleDelete} className="flex justify-end">
        <BtnAccion
          type="submit"
          texto={loading ? "Eliminando..." : textoBoton}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        />
      </form>
    </section>
  );
}

export default FormularioDelete;