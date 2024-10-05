"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Page() {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const showAnswer = () => {
    let answer = "";
    //api call to the answer
    void fetch("/api/show-answer")
      .then((data) => data.json())
      .then((ans: { answer: string }) => {
        answer = ans.answer;

        if (btnRef.current) {
          if (btnRef.current.innerText === "") {
            btnRef.current.innerHTML += answer;
          }
        }
      });
  };

  return (
    <button
      style={{ border: "2px solid white", padding: "2px" }}
      onClick={showAnswer}
      ref={btnRef}
    >
      <Link href={"/"}>
        <img
          src={"https://placehold.co/600x400"}
          alt="click me"
          width={600}
          height={400}
        ></img>
      </Link>
    </button>
  );
}
