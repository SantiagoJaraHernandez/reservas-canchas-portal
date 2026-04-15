import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Main/MainLayout";
import Reservations from "./pages/Reservations";
import ReservationCrud from "./pages/ReservationCrud";
import Canchas from "./pages/Canchas";
import CanchaCrud from "./pages/CanchaCrud";
import PageAuth from "./pages/PageAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<PageAuth modo="register" />} />
        <Route path="/login" element={<PageAuth modo="login" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Reservations />} />

          <Route path="reservas/nueva" element={<ReservationCrud modo="crear" />} />
          <Route path="reservas/:id/editar" element={<ReservationCrud modo="actualizar" />} />
          <Route path="reservas/:id/eliminar" element={<ReservationCrud modo="eliminar" />} />

          <Route
            path="canchas"
            element={
              <AdminRoute>
                <Canchas />
              </AdminRoute>
            }
          />
          <Route
            path="canchas/nueva"
            element={
              <AdminRoute>
                <CanchaCrud modo="crear" />
              </AdminRoute>
            }
          />
          <Route
            path="canchas/:id/editar"
            element={
              <AdminRoute>
                <CanchaCrud modo="actualizar" />
              </AdminRoute>
            }
          />
          <Route
            path="canchas/:id/eliminar"
            element={
              <AdminRoute>
                <CanchaCrud modo="eliminar" />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;