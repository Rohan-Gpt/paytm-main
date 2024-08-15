import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center bg-gray-300 h-screen ">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white shadow-lg text-center pt-8 px-12 pb-5">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label={"First Name"}
            placeholder={"Rohan"}
          />
          <InputBox
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Gupta"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"email"}
            placeholder={"Rohan123@example.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Password"}
          />
          <div className=" mt-4 justify-center">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname,
                    lastname,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
              link={""}
            />
            <BottomWarning
              label={"Already have an account?"}
              button={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
