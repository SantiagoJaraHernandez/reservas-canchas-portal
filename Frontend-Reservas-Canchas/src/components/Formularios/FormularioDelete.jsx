import { useNavigate, useLocation } from "react-router-dom";
import InputForm from "../inputs/InputForm";
import BtnAggReserva from "../Botones/ButtonReservation";
import BtnAccion from "../Botones/ButtonAccion";
import Icon from "../../ui/Icon";
import { inputs } from "../../utils/FormInputsDelete";
import { useFormDelete } from "../../hooks/useFormDelete";

function FormularioDelete({ textoBoton, container, onSubmitReserva, onExito }) {

    const navigate = useNavigate();
    const location = useLocation();
    const reserva = location.state?.reserva ?? null;

    const { enviando, errorApi, handleDelete } = useFormDelete(reserva,onSubmitReserva);

    async function onFormSubmit(e) {
        const resultado = await handleDelete(e);
        if(resultado.ok) {
            onExito();
        }
    }
    return (
        <div className={`${container} bg-white rounded-card shadow-card flex p-5 items-center justify-center overflow-hidden`}>
            <form action="" onSubmit={onFormSubmit} className="flex flex-col w-[80%] gap-8 flex-wrap">
                {errorApi && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                        {errorApi}
                    </div>
                )}
                <div className="flex flex-col flex-1 justify-around gap-5
                    sm:flex-row">
                    {inputs[0].map((input, indice) => (
                        <InputForm
                            key={indice}
                            type={input.type}
                            texto={input.label}
                            placeholder={input.placeholder}
                            icono={input.icono}
                            valor={reserva[input.name] ?? ""}
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
                            valor={reserva[input.name] ?? ""}
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
                        type={"submit"}
                        className="sm:w-45 sm:h-13 w-30 bg-red-500 text-white border-none outline-none rounded-card" />

                </div>
            </form>
        </div>
    )
}
export default FormularioDelete;