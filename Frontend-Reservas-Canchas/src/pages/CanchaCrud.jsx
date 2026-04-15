import { useNavigate, useParams } from "react-router-dom";
import useCanchas from "../hooks/useCanchas";
import useCanchaById from "../hooks/useCanchaById";
import FormularioCancha from "../components/Formularios/FormularioCancha";
import FormularioDeleteCancha from "../components/Formularios/FormularioDeleteCancha";

function CanchaCrud({ modo }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { agregarCancha, editarCancha, eliminarCancha } = useCanchas();
  const { cancha, loading, error } = useCanchaById(id);

  async function onCrear(payload) {
    const result = await agregarCancha(payload);
    if (result.ok) navigate("/dashboard/canchas");
    return result;
  }

  async function onEditar(payload) {
    const result = await editarCancha(Number(id), payload);
    if (result.ok) navigate("/dashboard/canchas");
    return result;
  }

  async function onEliminar() {
    const result = await eliminarCancha(Number(id));
    if (result.ok) navigate("/dashboard/canchas");
    return result;
  }

  if (modo === "crear") {
    return (
      <FormularioCancha
        titulo="Nueva Cancha"
        subTitulo="Completa los campos para registrar una nueva cancha."
        textoBoton="Guardar cancha"
        onSubmitCancha={onCrear}
      />
    );
  }

  if (loading) {
    return <p className="text-center py-8 text-slate-500">Cargando cancha...</p>;
  }

  if (error || !cancha) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || "No se encontró la cancha"}</p>
        <button
          onClick={() => navigate("/dashboard/canchas")}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          Volver
        </button>
      </div>
    );
  }

  if (modo === "actualizar") {
    return (
      <FormularioCancha
        titulo="Actualizar Cancha"
        subTitulo="Actualiza los datos de la cancha seleccionada."
        textoBoton="Actualizar cancha"
        cancha={cancha}
        onSubmitCancha={onEditar}
      />
    );
  }

  return (
    <FormularioDeleteCancha
      titulo="¿Eliminar cancha?"
      subTitulo="Esta acción no se puede deshacer."
      textoBoton="Eliminar cancha"
      cancha={cancha}
      onDeleteCancha={onEliminar}
    />
  );
}

export default CanchaCrud;