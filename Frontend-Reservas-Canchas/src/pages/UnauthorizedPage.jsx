
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-6">
        <span className="material-symbols-outlined text-7xl text-slate-300 block mb-4">
          lock
        </span>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Acceso denegado</h1>
        <p className="text-slate-500 mb-8">
          No tienes permisos para acceder a esta sección.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}