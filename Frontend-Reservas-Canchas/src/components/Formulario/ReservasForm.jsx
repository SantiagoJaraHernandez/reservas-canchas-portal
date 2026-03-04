import { useState, useEffect } from "react";
import CampoForm from "./CampoForm";
import BotonForm from "./BotonForm";
import Modal from "./Modal";
import { crearReserva, getReservas, actualizarReserva, eliminarReserva } from "../../services/reservaServices";

// Mapa de nombres legibles para los campos
const CAMPO_CONFIG = {
    idUsuario:  { label: "ID de Usuario",  icon: "👤", type: "number", placeholder: "Ej: 101" },
    idCancha:   { label: "ID de Cancha",   icon: "🏟️", type: "number", placeholder: "Ej: 3" },
    fecha:      { label: "Fecha",          icon: "📅", type: "date",   placeholder: "" },
    horaInicio: { label: "Hora de Inicio", icon: "🕐", type: "time",   placeholder: "" },
    horaFin:    { label: "Hora de Fin",    icon: "🕔", type: "time",   placeholder: "" },
};

// Skeleton de fila para estado de carga
function SkeletonRow() {
    return (
        <tr className="border-b border-white/10 animate-pulse">
            {[...Array(7)].map((_, i) => (
                <td key={i} className="py-3 px-4">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                </td>
            ))}
        </tr>
    );
}

// Card para vista mobile de cada reserva
function ReservaCard({ reserva, editandoId, onEditar, onEliminar }) {
    const esEditando = editandoId === reserva.id;
    return (
        <div
            className={`rounded-lg p-4 mb-3 transition-all duration-300 border ${
                esEditando
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
        >
            {esEditando && (
                <span className="inline-block text-xs font-semibold text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded mb-2">
                    ✏️ Editando
                </span>
            )}
            <div className="grid grid-cols-2 gap-y-1 text-sm text-white/90 mb-3">
                <span className="text-white/50">ID</span>         <span>#{reserva.id}</span>
                <span className="text-white/50">Usuario</span>    <span>{reserva.idUsuario}</span>
                <span className="text-white/50">Cancha</span>     <span>{reserva.idCancha}</span>
                <span className="text-white/50">Fecha</span>      <span>{reserva.fecha}</span>
                <span className="text-white/50">Inicio</span>     <span>{reserva.horaInicio}</span>
                <span className="text-white/50">Fin</span>        <span>{reserva.horaFin}</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEditar(reserva)}
                    title="Editar reserva"
                    className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition text-xs font-medium"
                >
                    ✏️ Editar
                </button>
                <button
                    onClick={() => onEliminar(reserva.id)}
                    title="Eliminar reserva"
                    className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition text-xs font-medium"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}

// Empty state con ilustración y CTA
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="text-6xl mb-4 opacity-70">🏟️</div>
            <p className="text-white/70 text-lg font-medium mb-1">No hay reservas aún</p>
            <p className="text-white/40 text-sm">Completa el formulario de arriba para crear tu primera reserva.</p>
        </div>
    );
}

function ReservasForm() {
    const [formData, setFormData] = useState({
        idUsuario: "", idCancha: "", fecha: "", horaInicio: "", horaFin: "",
    });
    const [errores, setErrores] = useState({});
    const [reservas, setReservas] = useState([]);
    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingLista, setLoadingLista] = useState(true);
    const [editandoId, setEditandoId] = useState(null);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [reservaAEliminar, setReservaAEliminar] = useState(null);
    const [nuevaFilaId, setNuevaFilaId] = useState(null);

    useEffect(() => { cargarReservas(); }, []);

    const cargarReservas = async () => {
        setLoadingLista(true);
        try {
            const datos = await getReservas();
            setReservas(datos);
        } catch {
            setModal({ show: true, type: "error", message: "Error al cargar las reservas" });
        } finally {
            setLoadingLista(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpiar error del campo al escribir
        if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const limpiarFormulario = () => {
        setFormData({ idUsuario: "", idCancha: "", fecha: "", horaInicio: "", horaFin: "" });
        setErrores({});
        setEditandoId(null);
    };

    // Validación inline: retorna objeto con errores por campo
    const validar = () => {
        const nuevos = {};
        Object.keys(CAMPO_CONFIG).forEach((campo) => {
            if (!formData[campo]) nuevos[campo] = `El campo "${CAMPO_CONFIG[campo].label}" es requerido`;
        });
        return nuevos;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const erroresValidacion = validar();
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }

        setLoadingForm(true);
        const normalizarHora = (h) => (h.length === 5 ? `${h}:00` : h);
        const reserva = {
            idUsuario: Number(formData.idUsuario),
            idCancha: Number(formData.idCancha),
            fecha: formData.fecha,
            horaInicio: normalizarHora(formData.horaInicio),
            horaFin: normalizarHora(formData.horaFin),
        };

        try {
            if (editandoId) {
                await actualizarReserva(editandoId, reserva);
                setModal({ show: true, type: "success", message: "Reserva actualizada con éxito" });
            } else {
                const reservasExistentes = await getReservas();
                const existe = reservasExistentes.some(
                    (r) => r.idCancha === reserva.idCancha && r.fecha === reserva.fecha &&
                           r.horaInicio === reserva.horaInicio && r.horaFin === reserva.horaFin
                );
                if (existe) {
                    setModal({ show: true, type: "error", message: "Ya existe una reserva con esos datos" });
                    setLoadingForm(false);
                    return;
                }
                const creada = await crearReserva(reserva);
                setNuevaFilaId(creada?.id ?? null);
                setTimeout(() => setNuevaFilaId(null), 2000);
                setModal({ show: true, type: "success", message: "Reserva creada con éxito" });
            }
            limpiarFormulario();
            await cargarReservas();
        } catch {
            setModal({ show: true, type: "error", message: editandoId ? "Error al actualizar" : "Error al crear la reserva" });
        } finally {
            setLoadingForm(false);
        }
    };

    const handleEditar = (reserva) => {
        setFormData({
            idUsuario: reserva.idUsuario,
            idCancha: reserva.idCancha,
            fecha: reserva.fecha,
            horaInicio: reserva.horaInicio.substring(0, 5),
            horaFin: reserva.horaFin.substring(0, 5),
        });
        setErrores({});
        setEditandoId(reserva.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleEliminar = async () => {
        try {
            await eliminarReserva(reservaAEliminar);
            setModal({ show: true, type: "success", message: "Reserva eliminada con éxito" });
            setReservaAEliminar(null);
            await cargarReservas();
        } catch {
            setModal({ show: true, type: "error", message: "Error al eliminar la reserva" });
        }
    };

    return (
        <>
            {/* ── FORMULARIO ── */}
            <form onSubmit={handleSubmit} noValidate className="space-y-6 flex flex-col gap-10 mb-10">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {editandoId ? "📝 Editar Reserva" : "➕ Nueva Reserva"}
                    </h2>
                    {editandoId && (
                        <p className="text-yellow-300 text-sm">
                            Editando reserva <span className="font-semibold">#{editandoId}</span>
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(CAMPO_CONFIG).map(([campo, config]) => (
                        <div key={campo} className="flex flex-col gap-1">
                            <CampoForm
                                label={`${config.icon} ${config.label}`}
                                icono="edit"
                                type={config.type}
                                placeholder={config.placeholder}
                                value={formData[campo]}
                                onChange={(e) => handleChange(campo, e.target.value)}
                                className={errores[campo] ? "border-red-400 focus:ring-red-400" : ""}
                            />
                            {errores[campo] && (
                                <span className="text-red-400 text-xs pl-1 flex items-center gap-1">
                                    ⚠️ {errores[campo]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-6 flex justify-center gap-4">
                    <BotonForm
                        texto={loadingForm ? "⏳ Guardando..." : editandoId ? "✏️ Actualizar" : "💾 Guardar"}
                        type="submit"
                        disabled={loadingForm}
                    />
                    {editandoId && (
                        <button
                            type="button"
                            onClick={limpiarFormulario}
                            className="px-8 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 active:scale-95 transition"
                        >
                            ❌ Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* ── LISTA DE RESERVAS ── */}
            <div className="mt-10 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">
                    📋 Mis Reservas{" "}
                    {!loadingLista && (
                        <span className="text-base font-normal text-white/60">({reservas.length})</span>
                    )}
                </h2>

                {/* Vista MOBILE: cards */}
                <div className="block md:hidden">
                    {loadingLista ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-36 bg-white/10 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    ) : reservas.length === 0 ? (
                        <EmptyState />
                    ) : (
                        reservas.map((r) => (
                            <ReservaCard
                                key={r.id}
                                reserva={r}
                                editandoId={editandoId}
                                onEditar={handleEditar}
                                onEliminar={setReservaAEliminar}
                            />
                        ))
                    )}
                </div>

                {/* Vista DESKTOP: tabla */}
                <div className="hidden md:block overflow-x-auto">
                    {loadingLista ? (
                        <table className="w-full text-white text-sm">
                            <thead className="border-b border-white/30">
                                <tr>
                                    {["ID", "Usuario", "Cancha", "Fecha", "Hora Inicio", "Hora Fin", "Acciones"].map((h) => (
                                        <th key={h} className="text-left py-3 px-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
                            </tbody>
                        </table>
                    ) : reservas.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <table className="w-full text-white text-sm">
                            <thead className="border-b border-white/30">
                                <tr>
                                    {["ID", "👤 Usuario", "🏟️ Cancha", "📅 Fecha", "🕐 Inicio", "🕔 Fin", "Acciones"].map((h) => (
                                        <th key={h} className="text-left py-3 px-4 text-white/70 font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {reservas.map((reserva) => {
                                    const esEditando = editandoId === reserva.id;
                                    const esNueva = nuevaFilaId === reserva.id;
                                    return (
                                        <tr
                                            key={reserva.id}
                                            className={`border-b border-white/10 transition-all duration-500 ${
                                                esEditando
                                                    ? "bg-yellow-400/10 border-l-4 border-l-yellow-400"
                                                    : esNueva
                                                    ? "bg-green-400/10"
                                                    : "hover:bg-white/5"
                                            }`}
                                        >
                                            <td className="py-3 px-4">
                                                #{reserva.id}
                                                {esEditando && (
                                                    <span className="ml-2 text-xs text-yellow-300 bg-yellow-400/20 px-1.5 py-0.5 rounded">
                                                        editando
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">{reserva.idUsuario}</td>
                                            <td className="py-3 px-4">{reserva.idCancha}</td>
                                            <td className="py-3 px-4">{reserva.fecha}</td>
                                            <td className="py-3 px-4">{reserva.horaInicio}</td>
                                            <td className="py-3 px-4">{reserva.horaFin}</td>
                                            <td className="py-3 px-4 space-x-2">
                                                <button
                                                    onClick={() => handleEditar(reserva)}
                                                    title="Editar esta reserva"
                                                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition text-xs font-medium"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    onClick={() => setReservaAEliminar(reserva.id)}
                                                    title="Eliminar esta reserva"
                                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition text-xs font-medium"
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* ── MODAL CONFIRMAR ELIMINACIÓN ── */}
            {reservaAEliminar && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="text-4xl text-center mb-3">⚠️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Confirmar Eliminación</h3>
                        <p className="text-gray-500 mb-6 text-center text-sm">
                            ¿Seguro que deseas eliminar la reserva{" "}
                            <span className="font-semibold text-gray-700">#{reservaAEliminar}</span>?
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setReservaAEliminar(null)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEliminar}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 active:scale-95 transition"
                            >
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ show: false, type: "", message: "" })}
            />
        </>
    );
}

export default ReservasForm;