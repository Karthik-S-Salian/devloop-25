"use client";

import React, { useEffect } from "react";

import Plane from "~/app/puzzle/vuugZwWNIi57Bzdi/_components/plane";
import { useSubmission } from "~/store";

const Page = () => {
  const { makeManualSubmission } = useSubmission();

  useEffect(() => {
    makeManualSubmission();
  }, [makeManualSubmission]);

  return (
    <div>
      {/* TODO(Omkar): Improvement */}
      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        section {
          margin: 0;
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #c0b3a0; /* Hardcoded scrub color */
        }

        .content {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .paralax {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/background.jpg");
          background-size: cover;
          background-position: center;
        }

        .paralax .layer {
          position: absolute;
          width: 400%;
        }

        .paralax .foreground {
          height: 50%;
          bottom: 0;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/foreground.png")
            repeat-x;
          background-size: 25% 100%;
          animation: slideshow 30s linear infinite; /* Hardcoded foregroundDuration */
        }

        .paralax .hills {
          height: 40%;
          bottom: 15%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/hills.png")
            repeat-x;
          background-size: 25% 100%;
          animation: slideshow 60s linear infinite; /* Hardcoded hillsDuration */
        }

        .paralax .rocks1 {
          height: 35%;
          bottom: 25%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/rocks1.png")
            repeat-x;
          background-size: 25% 100%;
          animation: slideshow 120s linear infinite; /* Hardcoded rocks1Duration */
        }

        .paralax .rocks2 {
          height: 40%;
          bottom: 15%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/rocks2.png")
            repeat-x;
          background-size: 25% 100%;
          animation: slideshow 240s linear infinite; /* Hardcoded rocks2Duration */
        }

        @keyframes slideshow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div className="">
        <div className="content">
          <div className="paralax">
            <h2 className="mt-12 text-center text-3xl font-bold">
              HELP US CAPTURE{" "}
              <p className="inline text-red-500">IMPOSTER AIRCRAFT</p>
            </h2>
            <h3 className="text-center text-xl font-bold text-gray-200">
              YOU HAVE JUST A SINGLE CHANCE
            </h3>
            <div className="layer rocks2"></div>
            <div className="layer rocks1"></div>
            <div className="layer hills"></div>
            <div className="layer foreground"></div>

            <Plane time={20} />
            <Plane time={15} />
            <Plane time={10} isOddOneOut />
            <Plane time={21} />
            <Plane time={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
