import InputForm from "../inputs/InputForm";
import Icon from "../../ui/Icon";
import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";
import BtnAggReserva from "../Botones/ButtonReservation";

function FormAuth({ title, subTtitle, fields, terms, icono }) {
    return (
        <form action="" className="flex flex-col bg-white max-w-100 w-full px-8 py-4 rounded-2xl shadow-sm shadow-primary/80 gap-10 relative overflow-hidden">
            <div className="clip-top bg-primary h-100 w-full absolute inset-0 "></div>
            <div className="text-center flex flex-col z-10">
                <Icon name={icono} className="font-bold text-white" />
                <Titulo titulo={title} className="text-2xl font-bold" />
                <SubTitulo subTitle={subTtitle} className="text-sm text-slate-600" />
            </div>
            <div className="flex flex-col gap-3">
                {fields.map((input) => (
                    <InputForm
                        id={input.name}
                        texto={input.label}
                        placeholder={input.placeholder}
                        icono={input.icono}
                        type={input.type}
                    />
                ))}
                <div className="flex text-[12px] py-2 gap-2">
                    <input type="checkbox" name="" id="" className="cursor-pointer" />
                    <p className="">{terms} </p>
                </div>
            </div>
            <div className="flex font-bold">
                <BtnAggReserva className="flex flex-1 items-center justify-center"
                    icono={"arrow_forward"}
                    texto={"Registrate"} />
            </div>
        </form>
    )
}
export default FormAuth;
