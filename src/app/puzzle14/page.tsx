"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex h-screen flex-col items-center space-y-4">
      <h1>Byte Value Puzzle</h1>
      <div className="flex border-2 border-black">
        <p className="border-r-2 border-black p-2">int arr[18]</p>
        <p className="border-r-2 border-black p-2">floatarr[25]+char c;</p>
        <p className="border-r-2 border-black p-2"> short arr[54];</p>
        <p className="border-r-2 border-black p-2">char arr[108];</p>
        <p className="border-r-2 border-black p-2">
          int arr[27]+short a+char c;
        </p>
      </div>
      <div className="flex space-x-4">
        <Input
          placeholder="Enter the decoded message"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-2 border-black p-2"
        />
        <Button
          className="border-2 border-black p-2"
          onClick={() => {
            if (value === "Hello") {
              alert("Correct Answer");
            } else {
              alert("Wrong Answer");
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
