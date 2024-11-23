"use client";

import React, { useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

import { actualFunction, a } from "./_components/data";

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    snippetFunction: () => void;
  }
}

const Page = () => {
  useEffect(() => {
    window.snippetFunction = actualFunction;
  }, []);

  return (
    <div className="size-full px-4 pb-20 pt-4 sm:px-6 md:px-8 xl:px-10">
      <div className="font-fira-code size-full overflow-y-scroll">
        <CodeBlock
          text={a}
          language="javascript"
          showLineNumbers={true}
          theme={dracula}
        />
      </div>
    </div>
  );
};

export default Page;
