import { useNavigate } from "react-router-dom";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../TablaReservas/BtnAccion";
import BtnAggReserva from "../Botones/BtnAggReserva";
import Icon from "../ui/Icon";

function Formulario({ textoBoton, container }) {
    const inputs = [
        [{ label: "User ID", type: "text", placeholder: "Ej: 2", icono: "person" },
        { label: "Cancha ID", type: "text", placeholder: "Ej: 2", icono: "stadium" }],
        [{ label: "Fehca", type: "date", placeholder: "" },
        { label: "Hora Inicio", type: "time", placeholder: "" },
        { label: "Hora Fin", type: "time", placeholder: "" },]
    ]

    const navigate = useNavigate();
    return (
        <div className={`${container} bg-white rounded-b-card  flex p-5 items-center justify-center overflow-hidden`}>
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
                            className="w-full focus:border-primary"
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
                        className="sm:w-45 sm:h-13 w-30" />

                </div>
            </form>
        </div>
    )
}
export default Formulario;