"use client"

import { useState } from "react"

export default function MorseAudio(){

    const [input,setInput] = useState<string>("");
    const [hint,showHint] = useState<boolean>(false);

    const checkValue = () => {
        if(input==="digital hunt is easy"){
            alert("Correct");
        }
        else{
            alert("Try Again");
        }
    }

    return(
        <>
            <div className="flex items-center justify-center h-screen border-black">
                <div className="flex flex-col h-auto w-auto border-black bg-green-100 rounded-2xl shadow-green-900 shadow-lg p-4 text-black space-y-5 items-center">
                    <audio  src="/morse-code.mp3" controls/>
                    <div className="flex flex-row space-x-5">
                        <label>Enter the message : </label>
                        <input onChange={(e) => setInput(e.target.value)} type="text" name="message" id="message" className="pr-2 pl-2 border border-3 border-black rounded-2xl" required/>
                    </div>
                    {
                        hint && (
                            <>
                                <div>
                                    The pitch will guide you. High and low, dot and dash—the key lies in the sound.
                                </div>
                            </>
                        )
                    }
                    <div className="flex flex-row space-x-5 justify-center">
                        <button className="border-2 border-black p-1 rounded-xl" onClick={checkValue}>Check</button>
                        <button className="border-2 border-black p-1 rounded-xl" onClick={(e) => showHint(!hint)}>Hint</button>
                    </div>
                </div>
            </div>
        </>
    )
}