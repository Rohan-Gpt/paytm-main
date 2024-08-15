import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center bg-gray-300 h-screen ">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white shadow-lg text-center pt-8 px-12 pb-10">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your information to login"} />
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
              onClick={() => {
                axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password,
                });
              }}
              label={"Sign in"}
              link={""}
            />
            <BottomWarning
              label={"Don't have an account?"}
              button={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
