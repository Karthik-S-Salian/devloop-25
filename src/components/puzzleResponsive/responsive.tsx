"use client";

import React, { useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";

// LOGIC: Responsiveness
// 1.there are 2 icons, a lock and a key
// 2.Lock will be visible always, but key is invisible for full screen (lg:invisible)
// 3.open inspect or in mobile to see the key
// 4.bring key near lock and open it for answer

export default function PuzzleResponsive() {
  const [lockedState, setLockedkStae] = useState<boolean>(true);

  const calculateDistanceBetweenLockAndKey = () => {
    const lock = document.querySelector(".lock");
    const key = document.querySelector(".key");

    if (lock && key) {
      const lockRect = lock.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();

      const distance = Math.abs(lockRect.right - keyRect.left);

      if (distance === 0) {
        setLockedkStae(false);
        setTimeout(() => {
          alert("Here You go: **Clues/Answer**");
          window.location.reload();
        }, 1000); //for smoother transition of opening of lock to answer
      }
    }
  };

  useEffect(() => {
    calculateDistanceBetweenLockAndKey();
    window.addEventListener("resize", calculateDistanceBetweenLockAndKey);
    return () => {
      window.removeEventListener("resize", calculateDistanceBetweenLockAndKey);
    };
  }, []);

  return (
    <div>
      <h2 className="text-center">This is a responsive puzzle</h2>
      <div className="mt-24 flex justify-between text-center text-black">
        {/* LOCK */}
        <div className="lock ml-12 h-36 w-36 rounded-md bg-red-400 text-center">
          {lockedState ? (
            <IoIosLock className="m-auto text-9xl" />
          ) : (
            <IoIosUnlock className="m-auto text-9xl" />
          )}
        </div>

        {/*KEY  */}
        <div className="key mr-12 h-36 w-36 rounded-md bg-green-300 p-2 sm:visible md:visible lg:invisible">
          <IoKeySharp className="m-auto rotate-45 text-9xl"></IoKeySharp>
        </div>
      </div>
    </div>
  );
}
