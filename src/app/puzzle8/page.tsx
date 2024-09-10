"use client";
import { useState } from "react";

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
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3 bg-white">
      <h1 className="text-black">Can you please help me?🥹</h1>
      <audio
        src="/audio.mp3"
        controls
        className="h-20 w-[300px] text-black"
      ></audio>
      <input type="text" />
      <input
        className="input border border-gray-800 p-2 text-black"
        type="text"
        id="input"
        placeholder="Enter the value.."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
