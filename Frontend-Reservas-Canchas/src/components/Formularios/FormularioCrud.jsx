import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../Botones/ButtonAccion";
import { inputs } from "../../utils/FormInputs";
import { useFormReservas } from "../../hooks/useFormReservas";


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
              
            >
              <option value="">Selecciona una cancha</option>
              <option value={1}>Cancha 1</option>
              <option value={2}>Cancha 2</option>
              <option value={3}>Cancha 3</option>
             </select>

            {errores.idCancha && (
              <p className="text-red-500 text-sm mt-1">{errores.idCancha}</p>
            )}

          </div>
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