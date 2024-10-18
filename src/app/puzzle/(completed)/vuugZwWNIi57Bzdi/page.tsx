"use client";

import React, { useEffect } from "react";

import Plane from "~/app/puzzle/(completed)/vuugZwWNIi57Bzdi/_components/plane";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeManualSubmission, setSubmissionNote } = useSubmission();

  useEffect(() => {
    makeManualSubmission();
    setSubmissionNote("Only the file name matters");
  }, [makeManualSubmission, setSubmissionNote]);

  return (
    <div
      style={{
        backgroundImage: "url(/image/DPiBiVSaV1UPeAB1.jpg)",
      }}
      className="relative size-full overflow-hidden bg-cover bg-center"
    >
      {/* Background UI */}
      <>
        <div
          style={{
            backgroundImage: "url(/image/AMvB9p5bL3H8HZ2I.png)",
          }}
          className="sm:[1500%] absolute bottom-32 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none duration-240s md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage: "url(/image/4SAzhUmwUSJqG8HW.png)",
          }}
          className="sm:[1500%] absolute bottom-48 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none duration-120s md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage: "url(/image/hL9STuVMBOHEuZnI.png)",
          }}
          className="sm:[1500%] absolute bottom-28 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none duration-60s md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage: "url(/image/Cd91cZArDDah6cxo.png)",
          }}
          className="sm:[1500%] absolute bottom-0 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none duration-30s md:w-[1000%] xl:w-[500%]"
        />
      </>

      <div className="absolute size-full py-10">
        <Plane idx={0} />
        <Plane idx={2} />
        <Plane idx={3} />
        <Plane idx={4} isOddOneOut />
        <Plane idx={5} />
      </div>

      <p className="pt-8 text-center text-3xl font-bold">
        <span>Help us capture the </span>
        <span className="text-red-500">IMPOSTER</span>
      </p>
    </div>
  );
};

export default Page;
