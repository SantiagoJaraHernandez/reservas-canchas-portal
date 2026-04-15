import { useNavigate } from "react-router-dom";
import LinkNav from "./LinkNav";
import Icon from "../../ui/Icon";
import UserAvatar from "./UserAvatar";
import { useState } from "react";
import authServices from "../../services/authServices";
import { getAuthUser } from "../../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = authServices();
  const authUser = getAuthUser();

  const itemNavBase = [
    { name: "Dashboard", accion: () => navigate("/dashboard") },
    { name: "Reservas", accion: () => navigate("/dashboard") },
  ];

  const itemNavAdmin = [
    { name: "Canchas", accion: () => navigate("/dashboard/canchas") },
  ];

  const itemNav =
    authUser?.role === "ADMIN"
      ? [...itemNavBase, ...itemNavAdmin]
      : itemNavBase;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="w-full bg-white shadow-card h-15">
      <div className="h-full max-w-7xl m-auto flex justify-between items-center px-4">
        <div
          className={`flex items-center transition-all duration-300 md:flex-1 sm:flex-1 ${
            search ? "w-0 overflow-hidden" : ""
          }`}
        >
          <Icon
            name="sports_soccer"
            className="text-primary cursor-pointer"
            accion={() => navigate("/dashboard")}
          />
          <p className="font-bold uppercase">
            Soccerfield <span className="text-primary">manager</span>
          </p>
        </div>

        <nav
          className={`bg-primaryDeg flex flex-col justify-evenly items-center absolute right-3 top-15 w-52 min-h-48 shadow-card rounded-card transition-all duration-300
          md:flex-row md:justify-evenly md:opacity-100 md:static md:w-auto md:bg-white md:shadow-none md:rounded-none md:flex-2 md:h-full
          ${open ? "opacity-100 translate-0 z-50" : "-translate-y-5 opacity-0 md:translate-none"}`}
        >
          {itemNav.map((item, indice) => (
            <LinkNav
              key={indice}
              texto={item.name}
              enlace="#"
              accion={(e) => {
                e.preventDefault();
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

        <div className="flex justify-end gap-3 relative overflow-hidden flex-2 sm:flex-1 items-center">
          {authUser?.role && (
            <span className="hidden md:inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
              {authUser.role}
            </span>
          )}

          {authUser?.email && (
            <span className="hidden lg:inline-block text-sm text-slate-500 max-w-48 truncate">
              {authUser.email}
            </span>
          )}

          <div
            className={`bg-primaryDeg rounded-lg px-2 flex items-center overflow-hidden transition-all duration-400 md:flex-1 sm:flex-1 sm:w-auto ${
              search ? "flex-1" : "w-10"
            }`}
          >
            <Icon
              accion={() => setSearch(!search)}
              name="search"
              className="text-primary cursor-pointer"
            />
            <input
              type="search"
              placeholder="Buscar..."
              className="placeholder:text-slate-400 rounded-radius-card outline-0 px-2 py-1"
            />
          </div>

          <UserAvatar accion={() => setOpen(!open)} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;