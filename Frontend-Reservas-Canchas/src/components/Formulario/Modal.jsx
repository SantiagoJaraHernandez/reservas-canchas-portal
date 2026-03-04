import ReactDOM from "react-dom";

function Modal({ show, type, message, onClose }) {
    if (!show) return null;

    const iconos = {
        success: "check_circle",
        error: "error",
        warning: "warning",
    };

    const colores = {
        success: "text-green-500",
        error: "text-red-500",
        warning: "text-yellow-500",
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
            <div className="bg-gray-500 rounded-xl shadow-lg p-6 w-90 h-40 text-center flex flex-col items-center justify-around glass-panel">
                <span className={`material-symbols-outlined text-5xl ${colores[type]}`}>
                    {iconos[type]}
                </span>
                <p className="mt-4 text-lg font-semibold text-white">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-[#13ec5b] text-white rounded-lg hover:bg-green-600 transition w-40 h-8 cursor-pointer"
                >
                    Cerrar
                </button>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
