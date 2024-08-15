import { InputBox } from "./InputBox";
import { Heading } from "./Heading";
import axios from "axios";
import { useState } from "react";
import { getAuthorizationHeader } from "./AuthHeader";

export function TransferCard({ toName, id }) {
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center bg-gray-300 h-screen ">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white shadow-lg text-center pt-8 px-12 pb-10">
          <Heading label={"Send Money"}></Heading>
          <div className="flex mt-4">
            <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {toName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center h-ful text-lg font-semibold">
              <div>{toName}</div>
            </div>
          </div>
          <InputBox
            label={"Amount"}
            placeholder={"amount in Rs"}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></InputBox>
          <div className="w-full mt-4">
            <button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    to: id,
                    amount,
                  },
                  { headers: { Authorization: getAuthorizationHeader() } }
                );
                console.log(response);
              }}
              className="font-sans font-semibold text-center uppercase transition-all text-sm bg-green-500 text-white w-full py-3 px-6 rounded-lg hover:shadow-lg"
              data-ripple-light="true"
            >
              Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
