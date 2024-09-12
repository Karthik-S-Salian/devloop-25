"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function JwtPuzzle() {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [token, setToken] = useState<string>("");

  //   const fetchJWT = async () => {
  //     try {
  //       const response = await axios.get("/api/get-jwt");
  //       if (response.data.token) {
  //         localStorage.setItem("jwt", response.data.token);
  //         setToken(response.data.token);
  //       } else {
  //         fetchJWT;
  //       }
  //     } catch (error) {
  //       console.error(error, "Failed to fetch jwt");
  //     }
  //   };

  //   useEffect(() => {
  //     fetchJWT();
  //   }, []);

  //   const handleCheck = () => {
  //     try {
  //       const decoded: any = jwtDecode(token);
  //       const decodedPassword = decoded.password;
  //       if (input === decodedPassword) {
  //         alert("Congrats");
  //       } else {
  //         alert("Try Again");
  //       }
  //     } catch (error) {
  //       console.error("Error while checking");
  //     }
  //   };

  return (
    <>
      <div className="flex h-screen items-center justify-center text-black">
        <div className="border-3 flex h-auto w-auto flex-col space-y-5 rounded-2xl border-black bg-green-100 p-4 shadow-lg shadow-green-900">
          <div className="flex flex-row space-x-5">
            <label>Enter the password</label>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="border-3 rounded-2xl border border-black pl-2 pr-2"
              required
            />
          </div>
          {showHint && (
            <>
              <div>JWT&aposs are stored in the local storage. Press f12</div>
            </>
          )}
          <div className="flex flex-row justify-center space-x-5">
            <button
              className="rounded-xl border-2 border-black p-1"
              //   onClick={handleCheck}
            >
              Check
            </button>
            <button
              className="rounded-xl border-2 border-black p-1"
              onClick={() => setShowHint(!showHint)}
            >
              Hint
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JwtPuzzle;
