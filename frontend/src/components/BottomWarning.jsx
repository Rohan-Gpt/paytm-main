import { Link } from "react-router-dom";

export function BottomWarning({ label, button, to }) {
  return (
    <div className="flex justify-center mt-2">
      <div>{label}</div>

      <Link to={to} className="underline">
        {button}
      </Link>
    </div>
  );
}
