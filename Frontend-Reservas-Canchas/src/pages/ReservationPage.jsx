import ReservasForm from "../components/Formulario/ReservasForm";

export default function ReservationPage() {
    return (
        <div className="w-full max-w-xl glass-panel rounded-3xl flex flex-col shadow-2xl container__formulario gap-5">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Reserva tu Cancha</h1>
                <p className="text-slate-500">
                    Completa los detalles para asegurar tu lugar en el campo.
                </p>
            </div>
            <ReservasForm />

        </div>
    );
}
