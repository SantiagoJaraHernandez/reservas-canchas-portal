import { useNavigate } from "react-router-dom";
import StatusBadges from "./StatusBadges";
import BtnAccion from "../Botones/ButtonAccion";
import useReservas from "../../hooks/useReservas";


function TablaReservas() {
    const itemsTable = ["ID Reserva", "Usuario", "Cancha", "Fecha", "Horario", "Estado", "Acciones"];

    const navigate = useNavigate();
    const { reservas, loading, error, } = useReservas();
    console.log(reservas)


    return (
        <div className="bg-white  rounded-card shadow-card mt-10 overflow-hidden overflow-x-scroll">
            <table className="w-full">
                <thead className="bg-primaryDeg text-slate-500 uppercase text-xs">
                    <tr>
                        {itemsTable.map((item, indice) => (
                            <th className="px-6 py-4 text-center"
                                key={indice}
                            >{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {reservas.map((reserva) => (
                        <tr className="border-b border-slate-100 hover:bg-slate-50 transitions-colors"
                            key={reserva.id}
                        >
                            <td className="px-6 py-4 text-center font-mono">{reserva.id}</td>
                            <td className="px-6 py-4 text-center">{reserva.idUsuario}</td>
                            <td className="px-6 py-4 text-center">{reserva.idCancha}</td>
                            <td className="px-6 py-4 text-center">{reserva.fecha}</td>
                            <td className="px-6 py-4 text-center"><span className="bg-slate-100 rounded-xl p-1">{reserva.horaInicio}</span></td>
                            <td className="px-6 py-4 text-center"><StatusBadges status={reserva.estado} /></td>
                            <td className="text-center">
                                <div className="flex gap-1 justify-center">
                                    <BtnAccion icono={"edit"} className="hover:text-primary"
                                        accion={() => navigate("/dashboard/actualizarReserva", { state: { reserva } })} />
                                    <BtnAccion icono={"delete"}
                                        className="hover:text-primary"
                                        accion={() => navigate("/dashboard/eliminarReserva", { state: { reserva } })} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default TablaReservas;