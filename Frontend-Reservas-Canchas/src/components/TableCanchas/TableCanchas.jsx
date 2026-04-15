import { useNavigate } from "react-router-dom";
import BtnAccion from "../Botones/ButtonAccion";

function TableCanchas({ canchas = [], loading, error }) {
  const navigate = useNavigate();

  const headers = [
    "ID",
    "Nombre",
    "Tipo",
    "Precio",
    "Activa",
    "Descripción",
    "Acciones",
  ];

  return (
    <div className="bg-white rounded-card shadow-card mt-10 overflow-hidden overflow-x-auto">
      {loading && <p className="p-6 text-center text-slate-500">Cargando canchas...</p>}
      {error && <p className="p-6 text-center text-red-500">{error}</p>}

      {!loading && !error && canchas.length === 0 && (
        <p className="p-6 text-center text-slate-500">No hay canchas registradas.</p>
      )}

      {!loading && !error && canchas.length > 0 && (
        <table className="w-full">
          <thead className="bg-primaryDeg text-slate-500 uppercase text-xs">
            <tr>
              {headers.map((item, index) => (
                <th className="px-6 py-4 text-center" key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {canchas.map((cancha) => (
              <tr
                className="border-b border-slate-100 hover:bg-slate-50"
                key={cancha.id}
              >
                <td className="px-6 py-4 text-center font-mono">{cancha.id}</td>
                <td className="px-6 py-4 text-center">{cancha.nombre}</td>
                <td className="px-6 py-4 text-center">{cancha.tipo}</td>
                <td className="px-6 py-4 text-center">{cancha.precioHora}</td>
                <td className="px-6 py-4 text-center">
                  {cancha.activa ? "Sí" : "No"}
                </td>
                <td className="px-6 py-4 text-center">{cancha.descripcion}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-1 justify-center">
                    <BtnAccion
                      icono="edit"
                      className="hover:text-primary"
                      accion={() => navigate(`/dashboard/canchas/${cancha.id}/editar`)}
                    />
                    <BtnAccion
                      icono="delete"
                      className="hover:text-primary"
                      accion={() => navigate(`/dashboard/canchas/${cancha.id}/eliminar`)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCanchas;