import FormAuth from "../components/FormAuth/FormAuth";
import { inputAuth } from "../utils/FormInputAut";
function PageAuth() {
    return (
        <div className="min-h-screen bg-app flex justify-center items-center py-8 px-2">
            <FormAuth
            title={"Crear cuenta"}
            subTtitle={"Únete a la mayor comunidad de FútbolReserva"}
            icono={"sports_soccer"}
            fields={inputAuth[0]}
            terms={`Acepto los <span className="text-primary font-medium">Términos de Servicio </span>y la <span className="text-primary font-medium">Política de Privacidad </span> de SoccerField Manager.`}
            />
        </div>
    )
}
export default PageAuth;