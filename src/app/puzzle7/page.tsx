"use client";
import { useState } from "react";

const IPSumPage = () => {
  const [sum, setSum] = useState(0);

  const onSubmit = () => {
    if (sum.toString() !== process.env.NEXT_PUBLIC_IPADDRESS_PUZZLE) {
      alert("Try again");
    } else {
      alert("Key: lorem");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-white text-black">
      <label htmlFor="input">
        {" "}
        <b> Enter the number to find the key to the Gateway</b>
      </label>
      <input
        className="input border border-gray-800 p-2"
        type="text"
        id="input"
        placeholder="Enter the value.."
        value={sum}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value == "") {
            setSum(0);
            return;
          }
          if (isNaN(parseInt(e.target.value))) {
            return;
          }
          setSum(parseInt(e.target.value));
        }}
      />
      <button
        className="rounded-full bg-blue-600 px-4 py-2 font-medium text-white"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default IPSumPage;
