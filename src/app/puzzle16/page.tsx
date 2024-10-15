"use client";

//corner div puzzle
import { useState } from "react";

const Page = () => {
  const [clicked, setClicked] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
  });

  const handleClick = (
    corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
  ) => {
    setClicked((prev) => {
      const updatedClicked = { ...prev, [corner]: true };

      if (
        updatedClicked.topLeft &&
        updatedClicked.topRight &&
        updatedClicked.bottomLeft &&
        updatedClicked.bottomRight
      ) {
        alert("Puzzle Solved!");
      }
      return updatedClicked;
    });
  };

  return (
    <div className="max-w-screen relative h-[100%] max-h-screen w-[100%]">
      <div
        onClick={() => handleClick("topLeft")}
        className={`absolute left-0 top-0 h-4 w-4 cursor-pointer ${
          clicked.topLeft ? "bg-red-500" : "bg-transparent"
        }`}
      ></div>

      <div
        onClick={() => handleClick("topRight")}
        className={`absolute right-0 top-0 h-4 w-4 cursor-pointer ${
          clicked.topRight ? "bg-red-500" : "bg-transparent"
        }`}
      ></div>

      <div
        onClick={() => handleClick("bottomLeft")}
        className={`absolute bottom-0 left-0 h-4 w-4 cursor-pointer ${
          clicked.bottomLeft ? "bg-red-500" : "bg-transparent"
        }`}
      ></div>

      <div
        onClick={() => handleClick("bottomRight")}
        className={`absolute bottom-0 right-0 h-4 w-4 cursor-pointer ${
          clicked.bottomRight ? "bg-red-500" : "bg-transparent"
        }`}
      ></div>
    </div>
  );
};

export default Page;
