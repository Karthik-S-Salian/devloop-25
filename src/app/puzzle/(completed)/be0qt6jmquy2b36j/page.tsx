"use client";

import React, { useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

import {
  actualFunction,
  snippetFunction,
} from "~/app/puzzle/(completed)/be0qt6jmquy2b36j/_components/data";

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
      <div className="size-full overflow-y-scroll font-fira-code">
        <CodeBlock
          text={snippetFunction.toString()}
          language="javascript"
          showLineNumbers={true}
          theme={dracula}
        />
      </div>
    </div>
  );
};

export default Page;
