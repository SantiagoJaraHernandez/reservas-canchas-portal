import { useNavigate } from "react-router-dom";
import StatCard from "../components/statCard/StatCard";
import Titulo from "../components/Textos/Titulo";
import SubTitulo from "../components/Textos/SubTitulo";
import BtnAggReserva from "../components/Botones/BtnAggReserva";
import TablaReservas from "../components/TablaReservas/TablaReservas";

function Reservations() {
    const itemsReserva = [
        { icono: "analytics", title: "Total Reservas", valor: "2" },
        { icono: "event_available", title: "Para Hoy", valor: "123" },
        { icono: "pending_actions", title: "Pendientes", valor: "44" }
    ]

    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between items-center mb-8 relative sm:flex-wrap">
                <div className="flex flex-col gap-1.5">
                    <Titulo
                        titulo={"gestion de reservas"}
                        className="capitalize font-bold text-4xl" />
                    <SubTitulo
                        subTitle={"Administra y supervisa todas las areservaciones activas del complejo."}
                        className="text-slate-500" />
                </div>

                <BtnAggReserva
                    texto={"Nueva Reserva"}
                    icono={"add_circle"}
                    className="mt-5 rounded-full fixed bottom-25 right-0
                sm:rounded-lg sm:w-45 sm:h-12 sm:static text-white font-light sm:text-black sm:font-medium
                "
                styleText="hidden"
                accion={()=> navigate("/newReserva")} />

            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsReserva.map((item, indice) => (
                    <StatCard
                        key={indice}
                        icono={item.icono}
                        title={item.title}
                        valor={item.valor}
                    />
                ))}
            </section>

            <TablaReservas />
        </>
    )
}
export default Reservations;