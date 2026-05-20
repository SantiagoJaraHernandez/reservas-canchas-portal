import { inputs } from "../../utils/FormInputs";
import { useFormReservas } from "../../hooks/useFormReservas";
import { useNavigate } from "react-router-dom";

function FormularioCrud({ titulo, subTitulo, textoBoton, reserva = null, onSubmitReserva }) {
  const { formData, handleChange, errores, errorApi, enviando, handleSubmit, horariosOcupados } =
    useFormReservas(reserva, onSubmitReserva);

  const navigate = useNavigate();
  const isEditing = !!reserva;

  return (
    <div className="crud-page">
      <div className="crud-card">
        {/* Header */}
        <div className="crud-header">
          <div className="crud-header-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 26 }}>
              {isEditing ? 'edit_calendar' : 'add_circle'}
            </span>
          </div>
          <div>
            <h2 className="crud-header-title">{titulo}</h2>
            <p className="crud-header-sub">{subTitulo}</p>
          </div>
        </div>

        {/* Body */}
        <div className="crud-body">
          <form onSubmit={handleSubmit}>
            {/* Cancha */}
            <div className="section-title">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>stadium</span>
              Selección de cancha
            </div>

            <div className="form-group">
              <label className="form-label">Cancha</label>
              <select
                disabled={enviando}
                value={formData.idCancha}
                onChange={(e) => handleChange("idCancha", e.target.value)}
                className="form-input-plain"
                style={{ cursor: 'pointer' }}
              >
                <option value="">Selecciona una cancha</option>
                <option value={1}>Cancha 1 — Fútbol 5</option>
                <option value={2}>Cancha 2 — Fútbol 7</option>
                <option value={3}>Cancha 3 — Fútbol 11</option>
              </select>
              {errores.idCancha && <p className="field-error">{errores.idCancha}</p>}
            </div>

            <hr className="section-divider" />

            {/* Horarios */}
            <div className="section-title">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
              Detalles de horario
            </div>

            {inputs.map((grupo, i) => (
              <div key={i} className="form-row">
                {grupo
                  .filter((f) => f.name !== "idCancha")
                  .map((field) => (
                    <div className="form-group" key={field.name}>
                      <label className="form-label" htmlFor={field.name}>{field.label}</label>
                      <div className="input-wrapper">
                        {field.icono && (
                          <span className="material-symbols-outlined input-icon" style={{ fontSize: 18 }}>
                            {field.icono}
                          </span>
                        )}
                        <input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          disabled={enviando}
                          value={formData[field.name]}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`form-input ${errores[field.name] ? 'error' : ''} ${!field.icono ? 'form-input-plain' : ''}`}
                          style={!field.icono ? { paddingLeft: '0.9rem' } : {}}
                        />
                      </div>
                      {errores[field.name] && <p className="field-error">{errores[field.name]}</p>}
                    </div>
                  ))}
              </div>
            ))}

            {/* Horarios ocupados */}
            {horariosOcupados.length > 0 && (
              <div className="schedule-warning">
                <strong>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: -2 }}>
                    warning
                  </span>{' '}
                  Horarios ocupados en esta cancha
                </strong>
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {horariosOcupados.map((r) => (
                    <li key={r.id} style={{ fontSize: 13, marginTop: 3 }}>
                      {r.horaInicio.slice(0, 5)} – {r.horaFin.slice(0, 5)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* API Error */}
            {errorApi && (
              <div style={{
                background: 'var(--color-cancelled-bg)',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                fontSize: 13,
                color: 'var(--color-cancelled)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: '1rem',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
                {errorApi}
              </div>
            )}

            <hr className="section-divider" />

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/dashboard")}
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      progress_activity
                    </span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      {isEditing ? 'save' : 'add_circle'}
                    </span>
                    {textoBoton}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioCrud;
