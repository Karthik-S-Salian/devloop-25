"use client";
import React, { useEffect } from 'react';

export default function PuzzleResponsive() {
  
  const calculateAndPrintDistance = () => {
    const lock = document.querySelector('.lock');
    const key = document.querySelector('.key');

    if (lock && key) {
      const lockRect = lock.getBoundingClientRect();
      const keyRect = key.getBoundingClientRect();

      const distance = Math.abs(lockRect.right - keyRect.left);
      
      if (distance === 0) {
        alert('Here You go: **Clues/Anwser**');
      }
    }
  };

  useEffect(() => {
    calculateAndPrintDistance();
    window.addEventListener('resize', calculateAndPrintDistance);
    return () => {
      window.removeEventListener('resize', calculateAndPrintDistance);
    };
  }, []); 

  return (
    <div>
      <h2 className='text-center'>This is a responsive puzzle</h2>
      <div className="flex justify-between mt-24 text-center text-black " >
        <div className="lock rounded-md w-24 h-24 bg-red-400">lock</div>
        <div className="key rounded-md w-24 h-24 bg-green-300">key</div>
      </div>
    </div>
  );
}
