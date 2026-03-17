
import Titulo from "../components/texts/Title";
import SubTitulo from "../components/texts/SubTitle";
import Formulario from "../components/Formularios/FormularioCrud";
import FormularioDelete from "../components/Formularios/FormularioDelete";
import Icon from "../ui/Icon";


function FormularioReservas({ titulo, subTitulo, textoBoton, icono, className = "", styleIcon, modo, container }) {

    return (
        <div className={`${container} flex flex-col gap-5 bg-primaryDeg rounded-card shadow-card`}>
            <div className={`flex flex-col gap-2 ${className} items-center p-2`}>
                <div className={`${styleIcon} flex items-center justify-center w-20 h-20 rounded-full`}>
                    <Icon name={icono}
                    className="text-[50px]" />
                </div>
                <Titulo titulo={titulo}
                    className="capitalize font-bold text-4xl text-center" />
                <SubTitulo subTitle={subTitulo}
                    className="text-slate-500 text-center" />
            </div>
            {modo === "crear" && <Formulario textoBoton={textoBoton} />}
            {modo === "actualizar" && <Formulario textoBoton={textoBoton} />}
            {modo === "eliminar" && <FormularioDelete textoBoton={textoBoton} container={"rounded-none rounded-b-[8px]"} />}

        </div>
    )
}
export default FormularioReservas;