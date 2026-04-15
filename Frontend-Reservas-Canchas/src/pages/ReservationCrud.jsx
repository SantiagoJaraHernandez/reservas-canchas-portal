import { useNavigate, useParams } from "react-router-dom";
import useReservas from "../hooks/useReservas";
import useReservaById from "../hooks/useReservaById";
import FormularioCrud from "../components/Formularios/FormularioCrud";
import FormularioDelete from "../components/Formularios/FormularioDelete";

function ReservationCrud({ modo }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { agregarReserva, editarReserva, eliminarReserva } = useReservas();
  const { reserva, loading, error } = useReservaById(id);

  async function onCrear(payload) {
    const result = await agregarReserva(payload);
    if (result.ok) navigate("/dashboard");
    return result;
  }

  async function onEditar(payload) {
    const result = await editarReserva(Number(id), payload);
    if (result.ok) navigate("/dashboard");
    return result;
  }

  async function onEliminar() {
    const result = await eliminarReserva(Number(id));
    if (result.ok) navigate("/dashboard");
    return result;
  }

  if (modo === "crear") {
    return (
      <FormularioCrud
        titulo="Nueva Reservación"
        subTitulo="Completa todos los campos para agregar la nueva reserva."
        textoBoton="Guardar nueva reserva"
        onSubmitReserva={onCrear}
      />
    );
  }

  if (loading) {
    return <p className="text-center py-8 text-slate-500">Cargando reserva...</p>;
  }

  if (error || !reserva) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || "No se encontró la reserva"}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          Volver
        </button>
      </div>
    );
  }

  if (modo === "actualizar") {
    return (
      <FormularioCrud
        titulo="Actualizar Reserva"
        subTitulo="Actualiza los datos de la reserva seleccionada."
        textoBoton="Actualizar reserva"
        reserva={reserva}
        onSubmitReserva={onEditar}
      />
    );
  }

  return (
    <FormularioDelete
      titulo="¿Estás seguro?"
      subTitulo="Esta acción no se puede deshacer."
      textoBoton="Eliminar Reserva"
      reserva={reserva}
      onDeleteReserva={onEliminar}
    />
  );
}

export default ReservationCrud;