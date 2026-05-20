import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormAuth from '../components/FormAuth/FormAuth';
import { inputAuth } from '../utils/FormInputAut';
import { useAuth } from '@/features/auth/hooks/useAuth';

function PageAuth({ modo }) {
  const navigate = useNavigate();

  const { login, register, loading, error } = useAuth();

  
  const {
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    setValue: setRegisterValue,
  } = useForm({
    defaultValues: { nombre: '', email: '', password: '' },
  });

  
  const {
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    setValue: setLoginValue,
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  async function onRegister(data) {
    try {
      await register(data);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  }

  async function onLogin(data) {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }

  // HANDLERS
  function handleRegisterChange(campo, valor) {
    setRegisterValue(campo, valor, { shouldValidate: true });
  }

  function handleLoginChange(campo, valor) {
    setLoginValue(campo, valor, { shouldValidate: true });
  }

  const hasRegisterErrors = Object.keys(registerErrors).length > 0;
  const hasLoginErrors = Object.keys(loginErrors).length > 0;

  return (
    <div className="min-h-screen bg-app flex items-center justify-center py-8 px-2 relative bg-[url('/src/assets/soccer-stadium-night.jpg')] bg-cover bg-center">
      <div className="fixed inset-0 bg-black/70" />

      <div className="flex items-center justify-center z-10">
        {modo === 'register' && (
          <FormAuth
            title="Crear cuenta"
            subTtitle="Únete a la mayor comunidad de FútbolReserva"
            terms="register"
            heyError={hasRegisterErrors}
            errors={registerErrors}
            onChange={handleRegisterChange}
            icono="sports_soccer"
            onSubmitAuth={handleRegisterSubmit(onRegister)}
            fields={inputAuth[0]}
            textButton={loading ? 'Registrando...' : 'Registrarse'}
            actionLink={() => navigate('/login')}
            className="bg-white/30 backdrop-blur-sm"
          />
        )}

        {modo === 'login' && (
          <FormAuth
            title="FútbolReserva"
            subTtitle="Gestiona tus canchas con SoccerField Manager"
            fields={inputAuth[1]}
            textButton={loading ? 'Ingresando...' : 'Iniciar Sesión'}
            className="bg-white/30 backdrop-blur-sm"
            terms="login"
            heyError={hasLoginErrors}
            errors={loginErrors}
            onChange={handleLoginChange}
            onSubmitAuth={handleLoginSubmit(onLogin)}
            actionLink={() => navigate('/register')}
          />
        )}
      </div>
    </div>
  );
}

export default PageAuth;