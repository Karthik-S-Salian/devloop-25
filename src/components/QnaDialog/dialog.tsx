"use client"
import Image from 'next/image';
import React, { useState } from 'react';

type propType = {
  questionNo: number;
  answer: string;
  points: number;
  question: string;
  imageUrl?: string;
  hint: string;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function Dialog({ questionNo, question, answer, points, imageUrl, hint, setPoints }: propType) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hintDialogView, setHintDialogView] = useState(false);
  const [answeredState,setUserAnsweredState]=useState(false)

  const verifyAnswer = () => {
    if (userAnswer === `finiteCTF{${answer}}`) {
      alert("Bingo");
      setPoints(prev => prev + points);
      setUserAnsweredState(true);
    } else {
      alert("Incorrect");
    }
  }

  return (
    <div className='p-6'>
      <h2 className='text-center text-3xl mt-[25vh]'>Challenge {questionNo}</h2>
      <br />

      <div className='container text-center w-[60%] bg--600 m-auto'>
        <div id="question" className='m-auto'>{question}</div>

        <div id="image" className='mt-3'>
          {imageUrl && <Image width={100} height={100} className='w-full' src={imageUrl} alt={''}></Image>}
        </div>

        <div className='mt-6'>
          <p>Use the word as the flag in the format:</p>
          <p className='text-green-500'>finiteCTF&#123;XXXX&#125;</p>
        </div>

        {hintDialogView && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 bg-gray-950">
            <dialog open className='flex-col justify-center items-center h-fit rounded-md p-2 w-[200px] bg-white shadow-md'>
              {hint} <br />
              <button onClick={() => setHintDialogView(prev => !prev)} className='m-2  right-0 bg-slate-300 p-2 text-sm rounded-md'>
                Close
              </button>
            </dialog>
          </div>
        )}

        {hint && (
          <div id="hint" className="flex justify-center mt-3">
            <button
              onClick={() => setHintDialogView(prev => !prev)}
              className="bg-green-400 rounded-md px-2 py-1"
            >
              Hint
            </button>
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder='Answer'
            onChange={(e) => { setUserAnswer(e.target.value) }}
            className='p-2 outline-0 w-full rounded-md bg-gray-600 my-3'
            disabled={answeredState}
            title={answeredState?"answered once":""}
          />
          <button onClick={verifyAnswer} title={answeredState?"answered once already":""} disabled={answeredState} className='w-full border-2 p-3 rounded-lg transition-colors hover:bg-slate-500'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
