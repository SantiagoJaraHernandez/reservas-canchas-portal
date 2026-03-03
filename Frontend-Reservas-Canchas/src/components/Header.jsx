import Navbar from "./Navbar";
import UserAvatar from "./UserAvatar";

function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-8 py-4 glass-panel mx-6 mt-4 rounded-xl">
      {/* Logo + título */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg flex items-center justify-center text-background-dark">
          <span className="material-symbols-outlined font-bold">sports_soccer</span>
        </div>
        <h2 className="text-slate-100 text-xl font-bold tracking-tight">PitchBooker</h2>
      </div>

      <Navbar/>
      <UserAvatar/>
      <div className="flex items-center gap-8">
        <Navbar />
        <UserAvatar />
      </div>
    </header>
  );
}

export default Header;
