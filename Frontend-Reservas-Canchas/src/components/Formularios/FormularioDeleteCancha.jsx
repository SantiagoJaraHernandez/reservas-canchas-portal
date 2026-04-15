import { useState } from "react";
import BtnAccion from "../Botones/ButtonAccion";
import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";

function FormularioDeleteCancha({
  titulo,
  subTitulo,
  textoBoton,
  cancha,
  onDeleteCancha,
}) {
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  async function handleDelete(e) {
    e.preventDefault();
    setLoading(true);
    setErrorApi("");

    const result = await onDeleteCancha();

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
        <p><strong>ID:</strong> {cancha?.id}</p>
        <p><strong>Nombre:</strong> {cancha?.nombre}</p>
        <p><strong>Tipo:</strong> {cancha?.tipo}</p>
        <p><strong>Precio:</strong> {cancha?.precioHora}</p>
        <p><strong>Activa:</strong> {cancha?.activa ? "Sí" : "No"}</p>
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

export default FormularioDeleteCancha;