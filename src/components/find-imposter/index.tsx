'use client';
import Image from "next/image";
import { findImposterstyle } from "./style";
import Plane from "./sprite";

// LOGIC: Finding Imposter plane,looking up image link on hover
// 1.there are 5 plane images flying on screen
// 2. all look same, exept for 1 plane has different url as source
// 3. clicking on correct plane on first try should yield points 
export default function FindImposter() {
  
  function correct(){
    console.log("Correct Answer")
    alert("Congrats, here +10 points for you")
  }

  function inCorrect(){
    console.log("Correct Answer")
    alert("Unfortunately, No gain :(")
  }

  return (
    <div className="">
      <style jsx global>{`${findImposterstyle}`}</style>

      <div className="content">
       
        <div className="paralax">
          <h2 className="text-3xl mt-12 font-bold text-center">HELP US CAPTURE <p className="text-red-500 inline">IMPOSTER AIRCRAFT</p></h2>
          <h3 className="font-bold text-gray-200 text-center text-xl">YOU HAVE JSUT A SINGLE CHANCE</h3>
          <div className="layer rocks2"></div>
          <div className="layer rocks1"></div>
          <div className="layer hills"></div>
          <div className="layer foreground"></div>

          <Plane inCorrect={inCorrect} time={20}></Plane>
          <Plane inCorrect={inCorrect} time={15}></Plane>


          {/* IMPOSTER */}
          <div className="plane w-[70px] h-[70px] mt-6 " onClick={correct}>
            <a href="https://res.cloudinary.com/dh0sqelog/image/upload/v1728558961/da8a9d0e424278e116df1b06da350a23743b588c.jpg" onClick={(e) => e.preventDefault()} target="_blank">
             <Image src={"https://res.cloudinary.com/dh0sqelog/image/upload/v1728558961/da8a9d0e424278e116df1b06da350a23743b588c.jpg"} alt={""} height={120} width={120}></Image>
            </a>
          </div>

          <Plane inCorrect={inCorrect} time={21}></Plane>
          <Plane inCorrect={inCorrect} time={14}></Plane>

        </div>
      </div>

      <div id="link"></div>
    </div>
  );
}
