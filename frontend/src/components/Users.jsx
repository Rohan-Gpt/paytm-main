import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Users({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mx-10 mt-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full px-10 py-2">
        <Button
          onClick={() => {
            navigate(
              "/send?id=" + user._id + "&name=" + user.firstName + user.lastName
            );
          }}
          label={"Send Money"}
        ></Button>
      </div>
    </div>
  );
}
