import React from "react";

const BotonForm = ({ texto, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      {texto}
    </button>
  );
};

export default BotonForm;
