import Icon from "../../ui/Icon";
function BtnAccion({accion, icono, className = "", texto}) {
    return(
        <button className={`${className} cursor-pointer text-gray-400`} onClick={accion}>
            <Icon name={icono}/>
            {texto}
        </button>
    )
}
export default BtnAccion;