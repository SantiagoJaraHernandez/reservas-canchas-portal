
import Titulo from "../components/Textos/Titulo";
import SubTitulo from "../components/Textos/SubTitulo";
import Formulario from "../components/formulario/Formulario";
import FormularioDelete from "../components/formulario/FormularioDelete";
import Icon from "../components/ui/Icon";


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