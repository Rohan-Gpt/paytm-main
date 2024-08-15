import { Link } from "react-router-dom";

export function Button({ label, onClick }) {
  return (
    <div className="w-full mt-4">
      <button
        onClick={onClick}
        className="font-sans font-bold text-center uppercase transition-all text-xs bg-black text-white w-full py-3 px-6 rounded-lg hover:shadow-lg"
        data-ripple-light="true"
      >
        {label}
      </button>
    </div>
  );
}
