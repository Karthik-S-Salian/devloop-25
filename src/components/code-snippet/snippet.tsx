"use client";

import Script from "next/script";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import { puzzleSnippetFunction2 } from "./constant";

export default function Snippet() {
  return (
    <div className="m-auto my-12 h-[600px] w-1/2 overflow-y-scroll">
      <CopyBlock
        text={puzzleSnippetFunction2.toString()}
        language={"javascript"}
        showLineNumbers={true}
        theme={dracula}
      />
    </div>
  );
}
