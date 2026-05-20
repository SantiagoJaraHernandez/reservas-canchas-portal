import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../Botones/ButtonAccion";
import Icon from "../../ui/Icon";
import { inputs } from "../../utils/FormInputs";
import { useFormReservas } from "../../hooks/useFormReservas";
import { useNavigate } from "react-router-dom";

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
    horariosOcupados
  } = useFormReservas(reserva, onSubmitReserva);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden rounded-card shadow-card">
      <div className="bg-primaryDeg w-full h-40 flex flex-col items-center justify-center gap-1.5">
        <div className="bg-primary/20 h-15 w-15 rounded-full flex items-center justify-center">
          <Icon name={"stadium"} className="text-[40px] text-primary "/>
        </div>
        <Titulo titulo={"Nueva Reservación"}
        className="font-bold text-4xl"/>
        <SubTitulo subTitle={"Completa todos los campos para agregar una reserva"}
        className="text-slate-600"/>
      </div>
      <section className="bg-white  p-6 w-full mx-auto">
    
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cancha
          </label>

          <select
            disabled={enviando}
            value={formData.idCancha}
            onChange={(e) => handleChange("idCancha", e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary bg-slate-100"
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
        <div className="w-full flex items-center p-2">
          <hr className="text-slate-300 w-full" />
        </div>
          <div className="flex font-bold items-center gap-2">
            <Icon name={"access_time "} className="text-primary"/>
            <Titulo titulo={"Detalles Horarios"} className="text-xl"/>
          </div>
        {inputs.map((grupo, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4">
            {grupo
              .filter((f) => f.name !== "idCancha")
              .map((field) => (
                <div key={field.name}>
                  <InputForm
                  
                    {...field}
                    texto={field.label}
                    disabled={enviando}
                    value={formData[field.name]}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                  
                  {errores[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errores[field.name]}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ))}
        <div className="w-full flex items-center p-2">
          <hr className="text-slate-300 w-full" />
        </div>
        {horariosOcupados.length > 0 && (
  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-sm">
    <p className="font-bold mb-1">Horarios ocupados:</p>
    <ul className="text-slate-600">
      {horariosOcupados.map((r) => (
        <li key={r.id}>
          {r.horaInicio.slice(0,5)} - {r.horaFin.slice(0,5)}
        </li>
      ))}
    </ul>
  </div>
)}

        {errorApi && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {errorApi}
          </div>
        )}

        <div className="flex justify-end gap-1.5">
          <BtnAccion
          accion={() => {navigate("/dashboard")}}
            type="button"
            texto={"cancelar"}
            className="bg-slate-200 font-semibold px-5 py-4 rounded-lg flex items-center justify-center"
          />
          <BtnAccion
            type="submit"
            texto={enviando ? "Reservando..." : "Guardar Nueva Reserva"}
            className="bg-primary font-semibold px-5 py-4 rounded-lg flex items-center justify-center"
          />
        </div>
      </form>
    </section>
    </div>
  );
}

export default FormularioCrud;