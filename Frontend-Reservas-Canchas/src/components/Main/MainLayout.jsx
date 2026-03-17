
function MainLayout({ children }) {
    return (
        <div className="bg-bg-app min-h-screen font-lexend overflow-hidden relative">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet/>
            </main>
        </div>
    )
}
export default MainLayout;