"use client";

import { useEffect, useRef } from "react";

export default function MirrorCard() {
  const contentRef = useRef<HTMLDivElement>(null);
  const mirrorContentRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      contentRef.current &&
      mirrorContentRef.current &&
      textContentRef.current
    ) {
      mirrorContentRef.current.innerHTML = contentRef.current.innerHTML;
      const textContent = contentRef.current.innerText;
      textContentRef.current.innerText = textContent;
    }
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div>
        <p className="my-12 text-center">
          Text Translation: ukranian-english, i am the nearer continent to the
          weird country that allows actors to lead it
        </p>
        <div ref={contentRef} className="hidden">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-md rounded-lg bg-card text-card-foreground shadow-lg">
              <div className="rounded-t-lg bg-muted px-4 py-2 text-center">
                Here we go
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-center text-xl font-bold">AHEM</h5>
                <p className="mb-4 text-center">
                  Я є прихильником дивної країни, яка дозволяє акторам кіно
                  керувати нею
                </p>
                <div className="text-center"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="mirror-content"
          ref={mirrorContentRef}
          className="user-select-none pointer-events-none h-full w-full -scale-x-100 transform"
          aria-hidden="true"
          style={{ userSelect: "none", pointerEvents: "none" }}
        ></div>

        <div
          ref={textContentRef}
          className="sr-only"
          aria-label="Copyable mirrored text content"
        ></div>
      </div>
    </div>
  );
}
