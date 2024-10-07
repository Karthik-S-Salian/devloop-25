"use client";

import React, { useEffect, useState } from "react";
import { puzzleSnippetFunction1,puzzleSnippetFunction2 } from "./constant";
import { CopyBlock, dracula } from "react-code-blocks";
import Script from "next/script";

export default function Snippet() {


  return (
    <div className="w-1/2 m-auto my-12 h-[600px] overflow-y-scroll">

      <CopyBlock
        text={puzzleSnippetFunction2.toString()}
        language={"javascript"}
        showLineNumbers={true}
        theme={dracula}
      />
    </div>
  );
}
