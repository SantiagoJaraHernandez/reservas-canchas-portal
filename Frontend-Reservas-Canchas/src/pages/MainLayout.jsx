import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="bg-background-dark min-h-screen text-slate-100">
      <div
        className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaGShNX9hLrJaYTBv_2nf35qU5N0jdCnoQvdTrD4DUp9xQgES-TFjei0eThGCogJqoEb4SgGWaDDSdJmY_zQ9Xf7v2Sb1DzRhLJUfPwTtJ4zIi27a0QbgRCponESPNBPLlyPyCDEu8cfHcBLsjvhCci6mmnruxxUvNW2xfyBp3FsM6r5NzZzuyHYYMy9iGU27XYWUTbWjnFcfIe_TZM6BeiCSIr7HE7SyIJiaDIn__53zSTkaNwH6pTMqbj-nqMSZQPX30Fv0DRX0')",
        }}
      >
        <div className="absolute inset-0 bg-background-dark/60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
