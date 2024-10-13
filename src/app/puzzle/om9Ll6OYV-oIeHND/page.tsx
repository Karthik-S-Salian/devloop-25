"use client";

import { useState } from "react";

import { data } from "~/app/puzzle/om9Ll6OYV-oIeHND/_components/data";

const Audio = () => {
  const [text, setText] = useState("");
  const onSubmit = () => {
    if (text !== process.env.NEXT_PUBLIC_AUDIO) {
      alert("Try again");
    } else {
      alert("Key: lorem");
    }
  };

  return (
    <div className="max-w-screen flex h-screen flex-col items-center space-y-3 bg-white py-2">
      <h1 className="text-black">Can you please help me?🥹</h1>

      <div className="max-h-[60vh] w-full max-w-[1550px] overflow-auto rounded-md bg-zinc-300 shadow-sm">
        <p className="w-full break-words p-6 text-black">{data}</p>
      </div>

      <input
        className="input border border-gray-800 p-2 text-black"
        type="text"
        id="input"
        placeholder="Enter the value.."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
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

export default Audio;
