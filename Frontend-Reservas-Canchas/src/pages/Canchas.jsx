import { useNavigate } from "react-router-dom";
import StatCard from "../components/statCard/StatCard";
import Titulo from "../components/texts/Title";
import SubTitulo from "../components/texts/SubTitle";
import BtnAggReserva from "../components/Botones/ButtonReservation";
import TableCanchas from "../components/TableCanchas/TableCanchas";
import useCanchas from "../hooks/useCanchas";

function Canchas() {
  const navigate = useNavigate();
  const { canchas, loading, error } = useCanchas();

  const activas = canchas.filter((item) => item.activa).length;
  const inactivas = canchas.filter((item) => !item.activa).length;

  const items = [
    { icono: "stadium", title: "Total Canchas", valor: String(canchas.length) },
    { icono: "check_circle", title: "Activas", valor: String(activas) },
    { icono: "cancel", title: "Inactivas", valor: String(inactivas) },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8 relative sm:flex-wrap">
        <div className="flex flex-col gap-1.5">
          <Titulo
            titulo="Gestión de canchas"
            className="capitalize font-bold text-4xl"
          />
          <SubTitulo
            subTitle="Administra las canchas disponibles del sistema."
            className="text-slate-500"
          />
        </div>

        <BtnAggReserva
          texto="Nueva Cancha"
          icono="add_circle"
          className="mt-5 rounded-full fixed bottom-25 right-0 sm:rounded-lg sm:w-45 sm:h-12 sm:static text-white font-light sm:text-black sm:font-medium"
          styleText="hidden"
          accion={() => navigate("/dashboard/canchas/nueva")}
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <StatCard
            key={index}
            icono={item.icono}
            title={item.title}
            valor={item.valor}
          />
        ))}
      </section>

      <TableCanchas canchas={canchas} loading={loading} error={error} />
    </>
  );
}

export default Canchas;