import { Send } from "lucide-react";
import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const Goto = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Button asChild>
        <a href="https://onemillioncheckboxes.com/" target="_blank">
          Inspiration
        </a>
      </Button>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Goto"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById(`cb-${value}`)?.focus();
          }
        }}
      />
      <Button onClick={() => document.getElementById(`cb-${value}`)?.focus()}>
        <Send />
      </Button>
    </>
  );
};

export default Goto;
