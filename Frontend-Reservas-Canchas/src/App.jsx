import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import AuthGuard from "@/core/guards/AuthGuard";
import RoleGuard from "@/core/guards/RoleGuard";

import MainLayout from "@/components/Main/MainLayout";
import PageAuth from "@/pages/PageAuth";
import Reservations from "@/pages/Reservations";
import ReservationCrud from "@/pages/ReservationCrud";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton duration={4000} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<PageAuth modo="login" />} />
        <Route path="/register" element={<PageAuth modo="register" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 🔐 PROTEGIDO */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<MainLayout />}>
            
            {/* TODOS LOS USUARIOS */}
            <Route index element={<Reservations />} />

            {/* USER + ADMIN */}
            <Route element={<RoleGuard allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="reservas/nueva" element={<ReservationCrud modo="crear" />} />
              <Route path="reservas/:id/editar" element={<ReservationCrud modo="actualizar" />} />
              <Route path="reservas/:id/eliminar" element={<ReservationCrud modo="eliminar" />} />
            </Route>

          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;