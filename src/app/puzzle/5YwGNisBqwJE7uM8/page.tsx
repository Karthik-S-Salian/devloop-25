"use client";

import React from "react";
import { Checkbox } from "~/components/ui/checkbox";

const MillionCheckboxes = () => {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, outerIdx) => (
        <div key={outerIdx} className="m-auto">
          {Array.from({ length: 95 }).map((_, innerIdx) => (
            <Checkbox
              key={innerIdx}
              onClick={innerIdx === 14? () => console.log(`Checkbox ${innerIdx} clicked, you shall join the elite group https://chat.whatsapp.com/CoR8icLCDmNLcazWwaXYyE`) : undefined}
              className={outerIdx== 53 && innerIdx === 14?'click Me':''}
              id={outerIdx== 53 && innerIdx === 14?'click Me':''} //PUT ID cuz className field is too cluttered with style in DOM
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MillionCheckboxes;
