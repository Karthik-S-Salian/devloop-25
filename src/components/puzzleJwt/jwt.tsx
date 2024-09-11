"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function JwtPuzzle(){

    const [showHint,setShowHint] = useState<boolean>(false);
    const [input,setInput] = useState<string>("");
    const [token,setToken] = useState<string>("");    

    const fetchJWT = async () => {
        try{
            const response = await axios.get("/api/get-jwt");
            if(response.data.token){
                localStorage.setItem("jwt",response.data.token);
                setToken(response.data.token);
            }
            else{
                fetchJWT;
            }
        }
        catch(error){
            console.error(error,"Failed to fetch jwt");
        }
    };

    useEffect(() => {
        fetchJWT();    
    },[]);

    const handleCheck = () => {
        try{
            const decoded : any = jwtDecode(token);
            const decodedPassword = decoded.password;
            if(input === decodedPassword){
                alert("Congrats");
            }
            else{
                alert("Try Again");
            }
        }
        catch(error){
            console.error("Error while checking");
        }
    }

    return(
        <>
            <div className="flex h-screen items-center justify-center text-black">
                <div className="flex flex-col h-auto w-auto border-3 border-black shadow-lg p-4 bg-green-100 rounded-2xl shadow-green-900 space-y-5">
                    <div className="flex flex-row space-x-5 ">
                        <label>Enter the password</label>
                        <input onChange={(e) => setInput(e.target.value)} type="password" name="password" id="password" className="pr-2 pl-2 border border-3 border-black rounded-2xl" required/>
                    </div>
                    {
                        showHint && (
                            <>
                                <div>
                                    JWT&aposs are stored in the local storage. Press f12
                                </div>
                            </>
                        )
                    }
                    <div className="flex flex-row space-x-5 justify-center">
                        <button className="border-2 border-black p-1 rounded-xl" onClick={handleCheck}>Check</button>
                        <button className="border-2 border-black p-1 rounded-xl" onClick={() => setShowHint(!showHint)}>Hint</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JwtPuzzle;