import { useNavigate } from "react-router-dom";
import LinkNav from "./LinkNav";
import Icon from "../ui/Icon";
import UserAvatar from "./UserAvatar";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const itemNav = [
        { name: "Dashboard", enlance:"" , accion:() => navigate("/")},
        { name: "Reservas", enlance: "", accion: "" },
        { name: "Canchas", enlance: "" , accion: ""},
        { name: "Usuarios", enlance: "", accion: "" }];

    const [open, setOpen] = useState(false);
    const [serach, setSerach] = useState(false)

    return (
        <header className="w-full bg-white shadow-card h-15 ">
            <div className="h-full max-w-7xl m-auto flex justify-between items-center px-4">

                <div className={`flex items-center  transition-all duration-300 md:flex-1 sm:flex-1  ${serach ? "w-0 overflow-hidden " : ""}`}>
                    <Icon
                        name={"sports_soccer"}
                        className="text-primary cursor-pointer" />
                    <p className={`font-bold uppercase `}>Soccerfield <span className="text-primary">manager</span></p>
                </div>

                <nav className={`bg-primaryDeg flex flex-col justify-evenly items-center absolute right-3 top-15 w-50 h-62.5 shadow-card rounded-card transition-all duration-300
                md:flex-row md:justify-evenly md:opacity-100 md:static md:w-auto md:bg-white md:shadow-none md:rounded-none md:flex-2 md:h-full
                     ${open ? " opacity-100 translate-0 z-50":"-translate-y-5 opacity-0 md:translate-none"}`}>
                    {itemNav.map((item, indice) => (
                        <LinkNav
                            key={indice}
                            texto={item.name}
                            enlace={item.enlance}
                            accion={item.accion}
                        />
                    ))}
                </nav>


                <div className="flex justify-end gap-2 relative overflow-hidden flex-2 sm:flex-1 ">
                    <div className={`bg-primaryDeg rounded-lg px-2 flex items-center  overflow-hidden transition-all duration-400
                     md:flex-1 sm:flex-1 sm:w-auto
                        ${serach ? "flex-1" : "w-10 "}`}>
                        <Icon
                            accion={() => setSerach(!serach)}
                            name={"search"}
                            className={`text-primary cursor-pointer`} />
                        <input type="search" placeholder="Buscar Reserva..." className={`placeholder:text-slate-400 rounded-radius-card outline-0 px-2 py-1`} />
                    </div>

                    <UserAvatar accion={() => setOpen(!open)}/>
                </div>

                
            </div>
        </header>
    )
}
export default Navbar;