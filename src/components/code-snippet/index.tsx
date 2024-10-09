"use client";

import React, { useEffect, useState } from "react";
import { puzzleSnippetFunction1,puzzleSnippetFunction2 } from "./constant";
import Script from "next/script";
import Snippet from "./snippet";

declare global {
  interface Window {
    puzzleSnippetFunction: () => void;
  }
}

export default function CodeSnippetIndex() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    window.puzzleSnippetFunction = puzzleSnippetFunction1;
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="pt-24 m-auto">

    <Script
        id="dynamic-function"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
        __html: `
            console.log('Puzzle function is now available in the console as puzzleFunction');
        `,
        }}
    /> 

    {/* FOR DEVELOPERS */}
    <div className="text-center">
    <h2 ><b> Concept is to find values of variables in the given code snippet</b></h2>
    <p>the value is empty in the snippet, but is of values in the same code put on DOM of the page</p>
    <p>participants have to understand this and, try accesing the variabels from console, code snippet acts as distraction, DOM concept shound not be obvious</p>
    </div>
  
    <Snippet></Snippet>
    
    </div>
  );
}


