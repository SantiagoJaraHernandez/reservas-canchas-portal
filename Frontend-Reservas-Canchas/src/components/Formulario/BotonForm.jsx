
const BotonForm = ({ texto, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold w-50 h-10 cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      {texto}
    </button>
  );
};

export default BotonForm;
