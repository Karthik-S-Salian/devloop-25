"use client";

import { useEffect, useState } from "react";

// import { useSubmitRoundOnePuzzle } from "~/hooks/submission";

const messages = [
  "You found a hidden dimension!",
  "Every page has a story, and this one is yours!",
  "Is this just another page, or is it destiny?",
  "Positivity can be good, but negativity can sometimes be better.",
  "Curious minds find the best secrets.",
];

export default function PageSlug({ params }: { params: { slug: string } }) {
  // const submitPuzzle = useSubmitRoundOnePuzzle();
  const { slug } = params;

  const [randomMessage, setRandomMessage] = useState<string>("...");

  useEffect(() => {
    console.log(page);

    if (page === 404) {
      setRandomMessage("404 Found! You found the secret page! Redirecting....");
      setTimeout(() => {
        // submitPuzzle({ answer: "404" });
      }, 2000);
    } else if (page < 0) {
      setRandomMessage(
        "Maybe you're going the wrong way! A error might be the key to success.",
      );
    } else {
      setRandomMessage(
        messages[Math.floor(Math.random() * messages.length)] ?? "",
      );
    }
  }, []);

  const match = /^page-?(\d+)$/.exec(slug);
  if (!match) {
    return (
      <h1 className="flex h-full w-full items-center justify-center text-xl">
        Invalid Page
      </h1>
    );
  }

  const split = slug.split("page");
  console.log(split);
  const page = parseInt(split[1] ?? "", 10);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-xl">
      {/* Great that you thought the answer might be here, but unfortunately, it's not. */}
      <h1>Page {page}</h1>
      <p className="text-black">{randomMessage}</p>
      {/* You thought we would keep you on the same page? Think again! */}
      <div
        dangerouslySetInnerHTML={{ __html: "<!-- Secret comment here! -->" }}
      />
    </div>
  );
}
