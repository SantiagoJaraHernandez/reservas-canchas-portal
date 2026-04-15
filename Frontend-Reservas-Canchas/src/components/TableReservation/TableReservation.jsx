import { useNavigate } from "react-router-dom";
import StatusBadges from "./StatusBadges";
import BtnAccion from "../Botones/ButtonAccion";

function formatearFecha(fecha) {
  if (!fecha) return "Sin fecha";

  const [year, month, day] = fecha.split("-");
  const fechaLocal = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(fechaLocal);
}

function formatearHora(hora) {
  return hora?.slice(0, 5) || "--:--";
}

function formatearUsuario(idUsuario, authUser) {
  if (!idUsuario) return "Sin usuario";
  if (authUser?.id && idUsuario === authUser.id) return "Mi reserva";

  if (idUsuario.length > 12) {
    return `${idUsuario.slice(0, 6)}...${idUsuario.slice(-4)}`;
  }

  return idUsuario;
}

function obtenerCancha(idCancha, canchas) {
  return canchas.find((item) => item.id === idCancha);
}

function TablaReservas({
  reservas = [],
  canchas = [],
  loading,
  error,
  authUser,
}) {
  const navigate = useNavigate();
  const isAdmin = authUser?.role === "ADMIN";

  const headers = isAdmin
    ? ["Reserva", "Usuario", "Cancha", "Fecha", "Horario", "Estado", "Acciones"]
    : ["Reserva", "Cancha", "Fecha", "Horario", "Estado", "Acciones"];

  return (
    <div className="bg-white rounded-card shadow-card mt-10 overflow-hidden overflow-x-auto">
      {loading && (
        <p className="p-6 text-center text-slate-500">Cargando reservas...</p>
      )}

      {error && (
        <p className="p-6 text-center text-red-500">{error}</p>
      )}

      {!loading && !error && reservas.length === 0 && (
        <p className="p-6 text-center text-slate-500">
          No hay reservas registradas.
        </p>
      )}

      {!loading && !error && reservas.length > 0 && (
        <table className="w-full">
          <thead className="bg-primaryDeg text-slate-600 uppercase text-xs">
            <tr>
              {headers.map((item, index) => (
                <th className="px-6 py-4 text-center" key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {reservas.map((reserva) => {
              const cancha = obtenerCancha(reserva.idCancha, canchas);

              return (
                <tr
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  key={reserva.id}
                >
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-800">
                      #{reserva.id}
                    </span>
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {formatearUsuario(reserva.idUsuario, authUser)}
                      </span>
                    </td>
                  )}

                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-slate-800">
                        {cancha?.nombre || `Cancha ${reserva.idCancha}`}
                      </span>
                      <span className="text-xs text-slate-500">
                        {cancha?.tipo || `ID ${reserva.idCancha}`}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="text-slate-700">
                      {formatearFecha(reserva.fecha)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-slate-100 rounded-xl px-3 py-1 text-sm text-slate-700">
                      {formatearHora(reserva.horaInicio)} - {formatearHora(reserva.horaFin)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadges status={reserva.estado} />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <BtnAccion
                        icono="edit"
                        className="hover:text-primary"
                        accion={() => navigate(`/dashboard/reservas/${reserva.id}/editar`)}
                      />
                      <BtnAccion
                        icono="delete"
                        className="hover:text-red-500"
                        accion={() => navigate(`/dashboard/reservas/${reserva.id}/eliminar`)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaReservas;