"use client";

import { KeyRound, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [locked, setLocked] = useState<boolean>(true);

  const lockRef = React.useRef<HTMLDivElement>(null);
  const keyRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResizeHandler = () => {
      if (lockRef.current && keyRef.current) {
        const lockRect = lockRef.current.getBoundingClientRect();
        const keyRect = keyRef.current.getBoundingClientRect();

        if (keyRect.left < lockRect.right) setLocked(false);
      }
    };

    window.addEventListener("resize", onResizeHandler);
    return () => {
      window.removeEventListener("resize", onResizeHandler);
    };
  }, []);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative h-36 w-full">
        {/* LOCK */}
        <div
          ref={lockRef}
          className="absolute left-0 top-0 aspect-square h-full text-center"
        >
          {locked ? (
            <LockKeyhole className="h-full w-full" />
          ) : (
            <LockKeyholeOpen className="h-full w-full" />
          )}
        </div>

        {/* KEY */}
        <div
          ref={keyRef}
          className="visible absolute right-0 top-0 aspect-square h-full text-center lg:invisible"
        >
          <KeyRound className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Page;
