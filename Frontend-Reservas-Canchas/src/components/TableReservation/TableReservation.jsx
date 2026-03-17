import { useNavigate } from "react-router-dom";
import { reservasData } from "../../data/reservaData";
import StatusBadges from "./StatusBadges";
import BtnAccion from "../Botones/ButtonAccion";
function TablaReservas() {
    const itemsTable = ["ID Reserva", "Usuario", "Cancha", "Fecha", "Horario", "Estado", "Acciones"];

    const navigate = useNavigate();

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

                    {reservasData.map((reserva, indice) => (
                        <tr className="border-b border-slate-100 hover:bg-slate-50 transitions-colors"
                            key={reserva.id}
                        >
                            <td className="px-6 py-4 text-center font-mono">{reserva.id}</td>
                            <td className="px-6 py-4 text-center">{reserva.usuario}</td>
                            <td className="px-6 py-4 text-center">{reserva.cancha}</td>
                            <td className="px-6 py-4 text-center">{reserva.fecha}</td>
                            <td className="px-6 py-4 text-center"><span className="bg-slate-100 rounded-xl p-1">{reserva.hora}</span></td>
                            <td className="px-6 py-4 text-center"><StatusBadges status={reserva.estado} /></td>
                            <td className="text-center">
                                <div className="flex gap-1 justify-center">
                                    <BtnAccion icono={"edit"} className="hover:text-primary"
                                        accion={() => navigate("/actualizarReserva")} />
                                    <BtnAccion icono={"delete"}
                                        className="hover:text-primary"
                                        accion={() => navigate("/eliminarReserva")} />
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