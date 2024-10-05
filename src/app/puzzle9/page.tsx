"use client"

import Image from "next/image";
import { useState } from "react";
import illusion from "../../resources/optical illusion.jpg";


export default function Page(){

    const [showHint,setShowHint] = useState<boolean>(false);
    const [input,setInput] = useState("");

    const handleSubmit = () => {
        if(input.toLowerCase() === "docker"){
            alert("Correct");
        }
        else{
            alert("Wrong");
        }
    }

    return(
        <>
        <div className="flex h-screen w-screen">
            <div className="items-center flex flex-col space-y-4 my-auto mx-auto bg-green-300 p-2 rounded-lg border-2 border-black">
                <div className="self-center p-1">
                    Find the hidden image from the image
                </div>
                <Image
                    src = {illusion}
                    alt = "Optical Illusion Puzzle"
                    width = {800}
                    height = {800}
                    className="rounded-lg"
                />
                <div className="flex flex-row space-x-3">
                    <label className="p-1">Enter the key</label>
                    <input type="text" className="border-2 border-black rounded-2xl p-1" onChange={(e) => setInput(e.target.value)}/>
                </div>
                {
                    showHint &&
                    <div>
                        &quot;What your eyes perceive may not reveal the whole truth—dive beneath the surface and explore the hidden layers within the depths.&quot;
                    </div>
                }
                <div className="flex flex-row space-x-8">
                    <button className="border-2 border-black p-2 rounded-2xl" onClick={handleSubmit}>Submit</button>
                    <button className="border-2 border-black p-2 rounded-2xl" onClick={() => setShowHint(!showHint)}>Hint</button>
                </div>
            </div>
        </div>
        </>
    )
}
