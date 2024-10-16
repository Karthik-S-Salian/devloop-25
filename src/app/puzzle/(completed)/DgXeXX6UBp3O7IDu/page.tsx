"use client";

import { data } from "~/app/puzzle/(completed)/DgXeXX6UBp3O7IDu/_components/data";

const Page = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 px-4 pb-20 pt-4 sm:px-6 md:px-8 xl:px-10">
      <h1>Can you please help me? 🥹</h1>

      <div className="size-full flex-grow overflow-scroll rounded-md bg-zinc-200 p-6">
        <p className="break-words">{data}</p>
      </div>
    </div>
  );
};

export default Page;
