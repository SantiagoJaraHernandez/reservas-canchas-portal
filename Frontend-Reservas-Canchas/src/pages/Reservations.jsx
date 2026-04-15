import { useNavigate } from "react-router-dom";
import StatCard from "../components/statCard/StatCard";
import Titulo from "../components/texts/Title";
import SubTitulo from "../components/texts/SubTitle";
import BtnAggReserva from "../components/Botones/ButtonReservation";
import TablaReservas from "../components/TableReservation/TableReservation";
import useReservas from "../hooks/useReservas";

function Reservations() {
  const navigate = useNavigate();
  const { reservas, loading, error } = useReservas();

  const hoy = new Date().toISOString().split("T")[0];
  const reservasHoy = reservas.filter((item) => item.fecha === hoy).length;
  const pendientes = reservas.filter((item) => item.estado === "PENDIENTE").length;

  const itemsReserva = [
    { icono: "analytics", title: "Total Reservas", valor: String(reservas.length) },
    { icono: "event_available", title: "Para Hoy", valor: String(reservasHoy) },
    { icono: "pending_actions", title: "Pendientes", valor: String(pendientes) },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8 relative sm:flex-wrap">
        <div className="flex flex-col gap-1.5">
          <Titulo
            titulo="Gestión de reservas"
            className="capitalize font-bold text-4xl"
          />
          <SubTitulo
            subTitle="Administra y supervisa todas las reservaciones activas del complejo."
            className="text-slate-500"
          />
        </div>

        <BtnAggReserva
          texto="Nueva Reserva"
          icono="add_circle"
          className="mt-5 rounded-full fixed bottom-25 right-0 sm:rounded-lg sm:w-45 sm:h-12 sm:static text-white font-light sm:text-black sm:font-medium"
          styleText="hidden"
          accion={() => navigate("/dashboard/newReserva")}
        />
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

      <TablaReservas reservas={reservas} loading={loading} error={error} />
    </>
  );
}

export default Reservations;