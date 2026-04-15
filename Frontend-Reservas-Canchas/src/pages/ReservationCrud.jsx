
import Titulo from "../components/texts/Title";
import SubTitulo from "../components/texts/SubTitle";
import FormularioCrud from "../components/Formularios/FormularioCrud";
import FormularioDelete from "../components/Formularios/FormularioDelete";
import useReservas from "../hooks/useReservas";
import Icon from "../ui/Icon";
import ModalConfirmacion from "../components/modales/ModalConfimation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function ReservationCrud({ titulo, subTitulo, textoBoton, icono, className = "", styleIcon, modo, container }) {

    const { createReserva, updateReserva, deleteReserva } = useReservas();


    const navigate = useNavigate();

    const [open, setOpen] = useState(false);


    const modal = [
        { title: "!Reserva Guardada Exitosamente", subTitle: "La reserva ha sido registrada correctamente en el sistema.", textoBtn: "Volver Al Inicio", icono: "check_circle" },
        { title: "!Reserva Actualizada Exitosamente!", subTitle: "La reserva ha sido actualizada correctamente en el sistema.", textoBtn: "Volver Al Inicio", icono: "edit" },
        { title: "¿Desea Eliminar Esta Reserva?", subTitle: "Esta Acción no se puede deshacer.", textoBtn: "Sí, Eliminar", textoBtn_Two: "No, Cancelar", icono:"warning" }
    ]

    return (
        <div className={`${container} flex flex-col gap-5 bg-primaryDeg rounded-card shadow-card `}>
            <div className={`flex flex-col gap-2 ${className} items-center p-2 `}>
                <div className={`${styleIcon} flex items-center justify-center w-20 h-20 rounded-full`}>
                    <Icon name={icono}
                        className="text-[50px]" />
                </div>
                <Titulo titulo={titulo}
                    className="capitalize font-bold text-4xl text-center" />
                <SubTitulo subTitle={subTitulo}
                    className="text-slate-500 text-center" />
            </div>
            {modo === "crear" && <FormularioCrud textoBoton={textoBoton} onSubmitReserva={createReserva} onExito={() => setOpen(true)} />}
            {modo === "actualizar" && <FormularioCrud textoBoton={textoBoton} onSubmitReserva={updateReserva} onExito={() => setOpen(true)} />}
            {modo === "eliminar" && <FormularioDelete textoBoton={textoBoton} onSubmitReserva={deleteReserva} onExito={() => setOpen(true)} container={"rounded-none rounded-b-[8px]"} />}


            {(modo === "crear" || modo === "cancha") &&
                <ModalConfirmacion
                    title={modal[0].title}
                    subTitle={modal[0].subTitle}
                    textoBtn={modal[0].textoBtn}
                    icono={modal[0].icono}
                    containerIcono={"bg-primary/20"}
                    styleIcono={"bg-primary text-white"}
                    iconoBtn={"arrow_back"}
                    open={open}
                    accion={() =>
                        navigate("/dashboard")}
                    styleBg={"span__gradient"}
                />}
            {(modo === 'actualizar' || modo == "actualizarCancha") &&
                <ModalConfirmacion
                    title={modal[1].title}
                    subTitle={modal[1].subTitle}
                    textoBtn={modal[1].textoBtn}
                    icono={modal[1].icono}
                    containerIcono={"bg-primary/20"}
                    styleIcono={"bg-primary text-white"}
                    iconoBtn={"arrow_back"}
                    open={open}
                    accion={() =>
                        navigate("/dashboard")}
                />
            }

            {(modo === "eliminar" || modo === "eliminarCancha") &&
                <ModalConfirmacion
                    title={modal[2].title}
                    subTitle={modal[2].subTitle}
                    textoBtn={modal[2].textoBtn}
                    icono={modal[2].icono}
                    containerIcono={"bg-red-500/20"}
                    styleIcono={"bg-red-500 text-white"}
                    iconoBtn={"arrow_back"}
                    open={open}
                    accion={() => navigate("/dashboard")}
                    styleBtn={"bg-red-500"}
                    textoBtnTwo={modal[2].textoBtn_Two}
                    styleBg={"span__gradient_red "}
                />
            }
        </div>
    )
}
export default ReservationCrud;