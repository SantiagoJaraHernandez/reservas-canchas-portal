import FormAuth from "../components/FormAuth/FormAuth";
import { inputAuth } from "../utils/FormInputAut";
import { useNavigate } from "react-router-dom";
import useFormRegister from "../hooks/useRegister/useFormRegister";
import useFormLogin from "../hooks/useLogin/useFormLogin";
import ModalConfirmacion from "../components/modales/ModalConfimation";
import useLogin from "../hooks/useLogin/useLogin";
import useRegister from "../hooks/useRegister/useRegister";

function PageAuth({ modo }) {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  const { useLoginUser } = useLogin();

  const {
    handleChange,
    handleSubmit,
    sending,
    heyErrors,
    errors,
  } = useFormRegister(registerUser);

  const {
    handleChangeLogin,
    handleSubmitLogin,
    sendingLogin,
    errorsLogin,
    heyErrosLogin,
  } = useFormLogin(useLoginUser);

  async function submitFormRegister(e) {
    e.preventDefault();
    const resultado = await handleSubmit(e);
    if (resultado.ok) {
      navigate("/login");
    }
  }

  async function submitFormLogin(e) {
    e.preventDefault();
    const response = await handleSubmitLogin(e);
    if (response.ok) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-app flex items-center justify-center py-8 px-2 relative bg-[url('/src/assets/soccer-stadium-night.jpg')] bg-cover bg-center">
      <div className="fixed inset-0 bg-black/70"></div>

      <div className="flex items-center justify-center z-10">
        {modo === "register" && (
          <FormAuth
            title="Crear cuenta"
            subTtitle="Únete a la mayor comunidad de FútbolReserva"
            terms="register"
            heyError={heyErrors}
            errors={errors}
            onChange={handleChange}
            icono="sports_soccer"
            onSubmitAuth={submitFormRegister}
            fields={inputAuth[0]}
            textButton="Registrarse"
            actionLink={() => navigate("/login")}
            className="bg-white/30 backdrop-blur-sm"
          />
        )}

        {modo === "login" && (
          <FormAuth
            title="FútbolReserva"
            subTtitle="Gestiona tus canchas con SoccerField Manager"
            fields={inputAuth[1]}
            textButton="Iniciar Sesión"
            className="bg-white/30 backdrop-blur-sm"
            terms="login"
            heyError={heyErrosLogin}
            errors={errorsLogin}
            onChange={handleChangeLogin}
            onSubmitAuth={submitFormLogin}
            actionLink={() => navigate("/register")}
          />
        )}
      </div>

      {heyErrosLogin && (
        <ModalConfirmacion
          icono="warning"
          title="Error de autenticación"
          subTitle={errorsLogin?.mensaje || "Verifica tus credenciales e inténtalo de nuevo"}
          open={heyErrosLogin}
        />
      )}
    </div>
  );
}

export default PageAuth;