import { useNavigate, useLocation } from "react-router-dom";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../Botones/ButtonAccion";
import BtnAggReserva from "../Botones/ButtonReservation";
import Icon from "../../ui/Icon";
import { inputs } from "../../utils/FormInputs";
import { useFormReservas } from "../../hooks/useFormReservas";


function FormularioCrud({ textoBoton, container, onSubmitReserva, accion, onExito }) {

    const navigate = useNavigate();
    const location = useLocation();
    const reserva = location.state?.reserva ?? null;

    const { formData, handleChange, handleSubmit, enviando, errores, errorApi } = useFormReservas(reserva, onSubmitReserva);

    async function onFormSubmit(e) {
        const resultado = await handleSubmit(e);
        if (resultado.ok) {
            onExito();
        }
    }


    return (
        <div className={`${container} bg-white rounded-b-card  flex p-5 items-center justify-center overflow-hidden`}>
            <form action="" onSubmit={onFormSubmit} className="flex flex-col w-[80%] gap-8 flex-wrap">
                <div className="flex flex-col flex-1 justify-around gap-5
                    sm:flex-row">
                    {inputs[0].map((input, indice) => (
                        <div key={indice} className="flex flex-col gap-1 w-full">
                            <InputForm
                                type={input.type}
                                texto={input.label}
                                placeholder={input.placeholder}
                                icono={input.icono}
                                className="w-full focus:border-primary"
                                valor={formData[input.name] ?? ""}
                                onChange={(e) => handleChange(input.name, e.target.value)}
                            />
                            {errores[input.name] && (
                                <span className="text-red-500 text-xs">{errores[input.name]}</span>
                            )}
                        </div>
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
                        <div key={indice} className="flex flex-col gap-1 w-full">
                            <InputForm
                                type={input.type}
                                texto={input.label}
                                placeholder={input.placeholder}
                                icono={input.icono}
                                className="w-full focus:border-primary"
                                valor={formData[input.name] ?? ""}
                                onChange={(e) => handleChange(input.name, e.target.value)}
                            />

                            {errores[input.name] && (
                                <span className="text-red-500 text-xs">{errores[input.name]}</span>
                            )}
                        </div>
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
                        type={"submit"}
                        className="sm:w-45 sm:h-13 w-30 rounded-card" 
                        accion={accion}
                        />

                </div>
            </form>
        </div>
    )
}
export default FormularioCrud;