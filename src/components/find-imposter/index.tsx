'use client';

import Image from "next/image";

export default function FindImposter() {
  return (
    <div className="">
      <style jsx global>{`

        .plane {
            width: 100px;
            height: 100px;
            background-color: red;
            position: relative;
            animation-name: plane;
            animation-duration: 5s;
            animation-timing-function: linear; /* Smooth, continuous movement */
            animation-iteration-count: infinite;
            background: url("public/pixel_plane.jpeg")
        }


       @keyframes plane {
            0%   { left: 0px; top: 200px; }
            20%  { left: 25vw; top: 150px; } /* Ascend */
            50%  { left: 50vw; top: 100px; } /* Peak */
            80%  { left: 75vw; top: 150px; } /* Descend */
            100% { left: 100vw; top: 200px; } /* Return to initial height */
        }

        html, body {
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
          background-color: #C0B3A0; /* Hardcoded scrub color */
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
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/foreground.png") repeat-x;
          background-size: 25% 100%;
          animation: slideshow 30s linear infinite; /* Hardcoded foregroundDuration */
        }

        .paralax .hills {
          height: 40%;
          bottom: 15%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/hills.png") repeat-x;
          background-size: 25% 100%;
          animation: slideshow 60s linear infinite; /* Hardcoded hillsDuration */
        }

        .paralax .rocks1 {
          height: 35%;
          bottom: 25%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/rocks1.png") repeat-x;
          background-size: 25% 100%;
          animation: slideshow 120s linear infinite; /* Hardcoded rocks1Duration */
        }

        .paralax .rocks2 {
          height: 40%;
          bottom: 15%;
          background: url("http://www.testomic.com/public/codepen-assets/img/paralax/rocks2.png") repeat-x;
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

      <div className="content">
        <div className="paralax">
          <div className="layer rocks2"></div>
          <div className="layer rocks1"></div>
          <div className="layer hills"></div>
          <div className="layer foreground"></div>

          <div className="relative w-[50px] h-[50px]" style={{
            backgroundColor: 'red',
            animation: 'plane 10s infinite',
            position: 'relative'
            }}>
                <img src="pixel_plane.jpeg" className="w-[120px] h-[120px]" alt="plane" />
          </div>


          <div className="plane  ">
            {/* <Image src={"/pixel_plane.jpeg"} alt={""}></Image> */}
            <img src="pixel_plane.jpeg" className="w-[50px] h-[50px]" alt="plane" />
          </div>

          <div className="relative w-[50px] h-[50px]" style={{
                backgroundColor: 'red',
                animation: 'plane 8s infinite',
                position: 'relative'
                }}>
                <img src="pixel_plane.jpeg" className="w-[120px] h-[120px]" alt="plane" />
            </div>

            <div className="relative w-[50px] h-[50px]" style={{
                backgroundColor: 'red',
                animation: 'plane 10s infinite',
                position: 'relative'
                }}>
                <img src="pixel_plane.jpeg" className="w-[120px] h-[120px]" alt="plane" />
            </div>

        </div>
      </div>

      <div id="link"></div>
    </div>
  );
}
