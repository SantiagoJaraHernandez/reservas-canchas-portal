import { useState } from "react";
import CampoForm from "./CampoForm";
import BotonForm from "./BotonForm";
import Modal from "./Modal";
import { crearReserva } from "../../services/reservaServices";

function ReservasForm() {
    const [formData, setFormData] = useState({
        idUsuario: "",
        idCancha: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
    });

    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.idUsuario || !formData.idCancha || !formData.fecha || !formData.horaInicio || !formData.horaFin) {
            setModal({ show: true, type: "warning", message: "Por favor completa todos los campos" });
            return;
        }

        const normalizarHora = (hora) => (hora.length === 5 ? `${hora}:00` : hora);

        const reserva = {
            idUsuario: Number(formData.idUsuario),
            idCancha: Number(formData.idCancha),
            fecha: formData.fecha,
            horaInicio: normalizarHora(formData.horaInicio),
            horaFin: normalizarHora(formData.horaFin),
        };

        try {
            await crearReserva(reserva);
            setModal({ show: true, type: "success", message: "Reserva creada con éxito" });
            setFormData({ idUsuario: "", idCancha: "", fecha: "", horaInicio: "", horaFin: "" });
        } catch (error) {
            const mensaje = error.response?.status === 409
                ? "La reserva ya existe"
                : "Error al crear la reserva";
            setModal({ show: true, type: "error", message: mensaje });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["idUsuario", "idCancha", "fecha", "horaInicio", "horaFin"].map((campo) => (
                        <CampoForm
                            key={campo}
                            label={campo}
                            icono="edit"
                            type={campo === "fecha" ? "date" : campo.includes("hora") ? "time" : "number"}
                            placeholder={`Ingresa ${campo}`}
                            value={formData[campo]}
                            onChange={(e) => handleChange(campo, e.target.value)}
                        />
                    ))}
                </div>
                <div className="pt-6 flex justify-center">
                    <BotonForm tipo="submit" icono="task_alt">
                        Confirmar Reserva
                    </BotonForm>
                </div>
            </form>

            <Modal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ show: false, type: "", message: "" })}
            />
        </>
    );
}

export default ReservasForm;
