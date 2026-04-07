import FormAuth from "../components/FormAuth/FormAuth";
import { inputAuth } from "../utils/FormInputAut";
import staidum from "../assets/soccer-stadium-night.jpg";

function PageAuth() {
    return (
        <div className="min-h-screen bg-app flex items-center justify-center py-8 px-2 relative bg-[url('/src/assets/soccer-stadium-night.jpg')] bg-cover bg-center">
             <div className="fixed inset-0 bg-black/70">
            </div> 
            <div className="flex items-center justify-center">
                {/* <FormAuth
                    title={"Crear cuenta"}
                    subTtitle={"Únete a la mayor comunidad de FútbolReserva"}
                    icono={"sports_soccer"}
                    fields={inputAuth[0]}
                    terms={``}
                    className="bg-white/30 backdrop-blur-sm"
                /> */}
                <FormAuth 
                title={"FútbolReserva"}
                subTtitle={"Gestiona tus canchas con SoccerField Manager"}
                fields={inputAuth[1]}
                textButton={"Iniciar Sesión"}
                className="bg-white/30 backdrop-blur-sm "/>
            </div>
        </div>
    )
}
export default PageAuth;