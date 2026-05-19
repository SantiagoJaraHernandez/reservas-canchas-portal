
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LinkNav from './LinkNav';
import UserAvatar from './UserAvatar';
import Icon from '@/ui/Icon';
import useAuthStore from '@/app/store/authStore';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const itemNavBase = [
    { name: 'Dashboard', accion: () => navigate('/dashboard') },
    { name: 'Reservas', accion: () => navigate('/dashboard') },
  ];



  const itemNav =
    user?.role === 'ADMIN' ? [...itemNavBase, ...itemNavAdmin] : itemNavBase;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="w-full bg-white shadow-card h-15">
      <div className="h-full max-w-7xl m-auto flex justify-between items-center px-4">
        <div className="flex items-center flex-1">
          <Icon
            name="sports_soccer"
            className="text-primary cursor-pointer"
            accion={() => navigate('/dashboard')}
          />
          <p className="font-bold uppercase ml-2">
            Soccerfield <span className="text-primary">manager</span>
          </p>
        </div>

        <nav
          className={`bg-primaryDeg flex flex-col justify-evenly items-center absolute right-3 top-15 w-52 min-h-48 shadow-card rounded-card transition-all duration-300
            md:flex-row md:justify-evenly md:opacity-100 md:static md:w-auto md:bg-white md:shadow-none md:rounded-none md:flex-2 md:h-full
            ${open ? 'opacity-100 z-50' : '-translate-y-5 opacity-0 md:translate-none'}`}
        >
          {itemNav.map((item) => (
            <LinkNav
              key={item.name}
              texto={item.name}
              enlace="#"
              accion={(e) => {
                e.preventDefault();
                setOpen(false);
                item.accion();
              }}
            />
          ))}
          <LinkNav
            texto="Cerrar sesión"
            enlace="#"
            accion={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          />
        </nav>

        <div className="flex justify-end gap-3 relative flex-2 sm:flex-1 items-center">
          {user?.role && (
            <span className="hidden md:inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
              {user.role}
            </span>
          )}
          {user?.email && (
            <span className="hidden lg:inline-block text-sm text-slate-500 max-w-48 truncate">
              {user.email}
            </span>
          )}
          <UserAvatar accion={() => setOpen(!open)} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;