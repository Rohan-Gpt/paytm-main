import axios from "axios";
import { getAuthorizationHeader } from "./AuthHeader";
import { useEffect, useState } from "react";

export function YourBalance() {
  const [balance, setbalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: { Authorization: getAuthorizationHeader() },
      })
      .then((response) => {
        setbalance(response.data.balance);
      });
  }, [balance]);

  return (
    <div className="mx-12 mt-5">
      <a
        href="#"
        className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
        <p className="font-medium text-gray-700">Your Balance</p>
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          {balance}
        </h5>
        <p className="font-normal text-gray-700">sdfgsd</p>
      </a>
    </div>
  );
}
