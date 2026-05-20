import { useNavigate } from "react-router-dom";
import StatusBadges from "./StatusBadges";
import BtnAccion from "../Botones/ButtonAccion";
import useAuthStore from "@/app/store/authStore";
import SkeletonTable from "@/components/ui/SkeletonTable";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";

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
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

  const headers = isAdmin
    ? ["Reserva", "Usuario", "Cancha", "Fecha", "Horario", "Estado", "Acciones"]
    : ["Reserva", "Cancha", "Fecha", "Horario", "Estado", "Acciones"];

  if (loading) return <SkeletonTable />;

  if (error) return <ErrorState message={error} />;

  if (!reservas.length) {
    return <EmptyState message="No hay reservas registradas" />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm mt-10 overflow-hidden border border-slate-200">
      <table className="w-full">
        <thead className="bg-primaryDeg  text-slate-500 text-xs uppercase tracking-wider">
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
                key={reserva.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition duration-200"
              >
                <td className="px-6 py-4 text-center font-semibold">
                  #{reserva.id}
                </td>

                {isAdmin && (
                  <td className="px-6 py-4 text-center">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                      {formatearUsuario(reserva.idUsuario, user)}
                    </span>
                  </td>
                )}

                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">
                      {cancha?.nombre || `Cancha ${reserva.idCancha}`}
                    </span>
                    <span className="text-xs text-slate-500">
                      {cancha?.tipo || `ID ${reserva.idCancha}`}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  {formatearFecha(reserva.fecha)}
                </td>

                <td className="px-6 py-4 text-center">
                  {formatearHora(reserva.horaInicio)} - {formatearHora(reserva.horaFin)}
                </td>

                <td className="px-6 py-4 text-center">
                  <StatusBadges status={reserva.estado} />
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    {(user?.role === "ADMIN" || user?.id === reserva.idUsuario) && (
                      <>
                        <BtnAccion
                        className="hover:scale-105 active:scale-95 transition-transform duration-150 hover:bg-primaryDeg rounded-full h-12 w-12 flex items-center justify-center p-2"
                          icono="edit"
                          accion={() =>
                            navigate(`/dashboard/reservas/${reserva.id}/editar`)
                          }
                        />
                        <BtnAccion
                         className="hover:scale-105 active:scale-95 transition-transform duration-150 hover:bg-primaryDeg rounded-full h-12 w-12 flex items-center justify-center p-2"
                          icono="delete"
                          accion={() =>
                            navigate(`/dashboard/reservas/${reserva.id}/eliminar`)
                          }
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaReservas;