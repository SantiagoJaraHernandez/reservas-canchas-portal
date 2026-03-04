function Navbar() {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <a href="#" className=" text-md font-medium text-white hover:text-[#13ec5b] transition-colors">
                Canchas
            </a>
            <a href="#" className="text-black text-md font-medium hover:text-[#13ec5b] transition-colors">
                Mis Reservas
            </a>
        </nav>
    );
}

export default Navbar;
