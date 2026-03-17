import { useNavigate } from "react-router-dom";
import InputForm from "../inputs/InputForm";
import BtnAggReserva from "../Botones/BtnAggReserva";
import BtnAccion from "../TablaReservas/BtnAccion";
import Icon from "../ui/Icon";

function FormularioDelete({ textoBoton, container }) {
    const inputs = [
        [{ label: "User ID", type: "text", icono: "person", valor: "Juan Pérez" },
        { label: "Cancha ID", type: "text", icono: "stadium", valor: "Cancha Central - Grass Sintético" }],
        [{ label: "Fehca", type: "text", valor: "15 de Octubre, 2023 - 20:00" },
        { label: "Hora Inicio", type: "text", valor: "20:00 PM" },
        { label: "Hora Fin", type: "text", valor: "22:00 PM" },]
    ]

    const navigate = useNavigate();
    return (
        <div className={`${container} bg-white rounded-card shadow-card flex p-5 items-center justify-center overflow-hidden`}>
            <form action="" className="flex flex-col w-[80%] gap-8 flex-wrap">
                <div className="flex flex-col flex-1 justify-around gap-5
                    sm:flex-row">
                    {inputs[0].map((input, indice) => (
                        <InputForm
                            key={indice}
                            type={input.type}
                            texto={input.label}
                            placeholder={input.placeholder}
                            icono={input.icono}
                            valor={input.valor}
                            className="w-full focus:border-primary"
                            readOnly
                        />
                    ))}
                </div>

                <hr className="text-slate-300 w-full m-auto" />
                <h2 className="capitalize flex items-center gap-2 text-xl font-bold">
                    <Icon name={"schedule"}
                        className="text-primary" />
                    Detalles del horario</h2>
                <div className="flex flex-col flex-1 justify-around gap-5
                    sm:flex-row">
                    {inputs[1].map((input, indice) => (
                        <InputForm
                            key={indice}
                            type={input.type}
                            texto={input.label}
                            placeholder={input.placeholder}
                            className="w-full focus:border-primary"
                            valor={input.valor}
                            readOnly
                        />
                    ))}
                </div>
                <hr className="text-slate-300 w-full m-auto" />
                <div className="flex justify-center gap-5 flex-1
                    sm:justify-end ">
                    <BtnAccion
                        texto={"Cancelar"}
                        accion={() => navigate("/")}
                        className="sm:w-45 sm:h-13 hover:bg-slate-200 rounded-card flex items-center justify-center px-1" />
                    <BtnAggReserva
                        texto={textoBoton}
                        className="sm:w-45 sm:h-13 w-30 bg-red-500 text-white border-none outline-none" />

                </div>
            </form>
        </div>
    )
}
export default FormularioDelete;