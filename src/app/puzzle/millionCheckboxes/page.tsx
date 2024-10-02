"use client";

import React from "react";

import { Checkbox } from "~/components/ui/checkbox";

const MillionCheckboxes = () => {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, idx) => (
        <Checkbox
          key={idx}
          id={`chb-${idx}`}
          {...(idx === 30 && {
            onClick: () => console.log(`Checkbox ${idx} clicked`),
          })}
        />
      ))}
    </div>
  );
};

export default MillionCheckboxes;
