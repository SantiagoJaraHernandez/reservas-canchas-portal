import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../Botones/ButtonAccion";
import { inputs } from "../../utils/FormInputs";
import { useFormReservas } from "../../hooks/useFormReservas";
import useCanchas from "../../hooks/useCanchas";

function FormularioCrud({
  titulo,
  subTitulo,
  textoBoton,
  reserva = null,
  onSubmitReserva,
}) {
  const {
    formData,
    handleChange,
    errores,
    errorApi,
    enviando,
    handleSubmit,
  } = useFormReservas(reserva, onSubmitReserva);

  const {
    canchas,
    loading: loadingCanchas,
    error: errorCanchas,
  } = useCanchas();

  const canchaSeleccionada = canchas.find(
    (item) => String(item.id) === String(formData.idCancha)
  );

  return (
    <section className="bg-white rounded-card shadow-card p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Titulo titulo={titulo} className="font-bold text-3xl" />
        <SubTitulo subTitle={subTitulo} className="text-slate-500" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cancha
            </label>

            <select
              value={formData.idCancha}
              onChange={(e) => handleChange("idCancha", e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              disabled={loadingCanchas}
            >
              <option value="">
                {loadingCanchas ? "Cargando canchas..." : "Selecciona una cancha"}
              </option>

              {canchas
                .filter((item) => item.activa)
                .map((cancha) => (
                  <option key={cancha.id} value={cancha.id}>
                    {cancha.nombre} - {cancha.tipo} - ${cancha.precioHora}
                  </option>
                ))}
            </select>

            {errores.idCancha && (
              <p className="text-red-500 text-sm mt-1">{errores.idCancha}</p>
            )}

            {errorCanchas && (
              <p className="text-red-500 text-sm mt-1">{errorCanchas}</p>
            )}
          </div>

          {canchaSeleccionada && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-800 mb-1">
                {canchaSeleccionada.nombre}
              </p>
              <p>Tipo: {canchaSeleccionada.tipo}</p>
              <p>Precio por hora: ${canchaSeleccionada.precioHora}</p>
              <p>Descripción: {canchaSeleccionada.descripcion || "Sin descripción"}</p>
            </div>
          )}
        </div>

        {inputs.map((grupo, indexGrupo) => (
          <div key={indexGrupo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grupo
              .filter((field) => field.name !== "idCancha")
              .map((field) => (
                <div key={field.name}>
                  <InputForm
                    {...field}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  {errores[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errores[field.name]}</p>
                  )}
                </div>
              ))}
          </div>
        ))}

        {errorApi && <p className="text-red-500 text-sm">{errorApi}</p>}

        <div className="flex justify-end">
          <BtnAccion
            type="submit"
            texto={enviando ? "Procesando..." : textoBoton}
            className="bg-primary text-white px-5 py-2 rounded-lg"
          />
        </div>
      </form>
    </section>
  );
}

export default FormularioCrud;