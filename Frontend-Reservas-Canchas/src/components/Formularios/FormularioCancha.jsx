import Titulo from "../texts/Title";
import SubTitulo from "../texts/SubTitle";
import InputForm from "../inputs/InputForm";
import BtnAccion from "../Botones/ButtonAccion";
import { inputsCancha } from "../../utils/FormInputsCancha";
import { useFormCancha } from "../../hooks/useFormCancha";

function FormularioCancha({
  titulo,
  subTitulo,
  textoBoton,
  cancha = null,
  onSubmitCancha,
}) {
  const {
    formData,
    handleChange,
    errores,
    errorApi,
    enviando,
    handleSubmit,
  } = useFormCancha(cancha, onSubmitCancha);

  return (
    <section className="bg-white rounded-card shadow-card p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Titulo titulo={titulo} className="font-bold text-3xl" />
        <SubTitulo subTitle={subTitulo} className="text-slate-500" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {inputsCancha.map((grupo, indexGrupo) => (
          <div key={indexGrupo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grupo.map((field) => (
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

export default FormularioCancha;