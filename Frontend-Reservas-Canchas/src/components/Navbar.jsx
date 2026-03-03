function Navbar() {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-slate-300 text-sm font-medium hover:text-primary transition-colors">
                Canchas
            </a>
            <a href="#" className="text-slate-300 text-sm font-medium hover:text-[#13ec5b] transition-colors">
                Mis Reservas
            </a>
        </nav>
    );
}

export default Navbar;
