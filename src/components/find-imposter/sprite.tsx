'use client';
import Image from "next/image";

interface PlaneProps {
    inCorrect: () => void;  
    time:number
}
export default function Plane({inCorrect,time}:PlaneProps) {

  return (

            <div className="relative w-fit mt-6" onClick={inCorrect} style={{
                backgroundColor: 'red',
                animation: `plane ${time}s infinite`,
                position: 'relative'
                }}>
                   <a href="https://res.cloudinary.com/dh0sqelog/image/upload/v1728558854/c47793f358087f3165059dd0d31af4a4a2ff48e4.jpg" onClick={(e) => e.preventDefault()} target="_blank">
                   <Image src={"https://res.cloudinary.com/dh0sqelog/image/upload/v1728558854/c47793f358087f3165059dd0d31af4a4a2ff48e4.jpg"} alt={""} height={120} width={120}></Image>
                   </a>
                
            </div>

  );
}
