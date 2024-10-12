"use client";

import { Button } from "~/components/ui/button";

const Page = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <Button asChild>
        <a href="/image/Dvs7MGbCWpIYeUti.png" download>
          Download
        </a>
      </Button>
    </div>
  );
};

export default Page;
