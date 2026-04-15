import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Main/MainLayout";
import Reservations from "./pages/Reservations";
import ReservationCrud from "./pages/ReservationCrud";
import PageAuth from "./pages/PageAuth";
import ProtectedRoute from "./components/ProtectedRoute";

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

          <Route
            path="reservas/nueva"
            element={<ReservationCrud modo="crear" />}
          />

          <Route
            path="reservas/:id/editar"
            element={<ReservationCrud modo="actualizar" />}
          />

          <Route
            path="reservas/:id/eliminar"
            element={<ReservationCrud modo="eliminar" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;