"use client";

import React, { useEffect } from "react";

import Plane from "~/app/puzzle/(completed)/vuugZwWNIi57Bzdi/_components/plane";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeManualSubmission, setSubmissionNote } = useSubmission();

  useEffect(() => {
    makeManualSubmission();
    setSubmissionNote("Enter only the last part");
  }, [makeManualSubmission, setSubmissionNote]);

  return (
    <div
      style={{
        backgroundImage:
          "url(http://www.testomic.com/public/codepen-assets/img/paralax/background.jpg)",
      }}
      className="relative size-full overflow-hidden bg-cover bg-center"
    >
      {/* Background UI */}
      <>
        <div
          style={{
            backgroundImage:
              "url(http://www.testomic.com/public/codepen-assets/img/paralax/rocks2.png)",
          }}
          className="duration-240s sm:[1500%] absolute bottom-36 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage:
              "url(http://www.testomic.com/public/codepen-assets/img/paralax/rocks1.png)",
          }}
          className="duration-120s sm:[1500%] absolute bottom-64 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage:
              "url(http://www.testomic.com/public/codepen-assets/img/paralax/hills.png)",
          }}
          className="duration-60s sm:[1500%] absolute bottom-32 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none md:w-[1000%] xl:w-[500%]"
        />
        <div
          style={{
            backgroundImage:
              "url(http://www.testomic.com/public/codepen-assets/img/paralax/foreground.png)",
          }}
          className="duration-30s sm:[1500%] absolute bottom-0 h-2/5 w-[2000%] animate-slideshow bg-25-100 bg-repeat-x transition-none md:w-[1000%] xl:w-[500%]"
        />
      </>

      <div className="absolute size-full py-10">
        <Plane idx={0} time={17} />
        <Plane idx={2} time={13} />
        <Plane idx={3} time={25} />
        <Plane idx={4} time={21} isOddOneOut />
        <Plane idx={5} time={16} />
      </div>

      <div>
        <p className="mt-12 text-center text-3xl font-bold">
          <span>Help us capture the </span>
          <span className="text-red-500">IMPOSTER</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
