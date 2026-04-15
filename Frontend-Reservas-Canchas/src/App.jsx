import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Main/MainLayout";
import Reservations from "./pages/Reservations";
import FormularioReservas from "./pages/ReservationCrud";
import PageAuth from "./pages/PageAuth";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Reservations />} />
          <Route path="newReserva" element={
            <FormularioReservas titulo={"Nueva Reservación"}
              subTitulo={"Completa todos los campos para agregar la nueva reserva."}
              textoBoton={"guardar nueva reserva"}
              icono={"stadium"}
              styleIcon={"bg-primary/30 text-primary"}
              modo="crear" />
          } />
          <Route path="actualizarReserva" element={
            <FormularioReservas
              titulo={"Actualizar Reserva"}
              subTitulo={"Actializa reser ID 1"}
              textoBoton={"Actualizar"}
              icono={"update"}
              styleIcon={"bg-primary/30 text-primary"}
              modo="actualizar"
            />} />

          <Route path="eliminarReserva" element={
            <FormularioReservas
              titulo={"¿Estas Seguro?"}
              subTitulo={"¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer."}
              textoBoton={"Eliminar Reserva"}
              modo="eliminar"
              styleIcon="w-20 h-20 bg-red-200 rounded-full text-red-500"
              icono={"warning"}
              container={"bg-red-100 rounded-card"}
              className="items-center py-2"
            />}
          />
        </Route>
        <Route path="/register" element={
          <PageAuth modo={"register"} />
        } />
        <Route path="/login" element={
          <PageAuth modo={"login"} />
        } />
      </Routes>
    </Router>
  )
}

export default App
