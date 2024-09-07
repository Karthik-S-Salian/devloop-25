'use client'
import React, { useState } from 'react';
import Dialog from '~/components/QnaDialog/dialog';
import { QUIZZES } from '~/components/QnaDialog/constant';

export default function Page() {
  const [points, setPoints] = useState(0);
  const [rulesDialogView, setViewDialogView] = useState(false);
  const quizzes = QUIZZES

  console.log(quizzes); // This will print the quizzes to the console

  return (
    <div>
      <div>
        <div className='flex justify-between p-4 fixed w-full '>
          <div className='p-2'>Points : {points}</div>
          <button onClick={() => setViewDialogView(prev => !prev)} className='bg-green-400 rounded-md p-2'>
            Rules
          </button>
        </div>

        {rulesDialogView && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 bg-slate-100">
            <dialog open className=" text-sm flex flex-col w-[500px] p-8 justify-center items-center h-fit rounded-md  bg-white shadow-md">
              1. You need to submit all the flags in finiteCTF&#123;XXXX&#125;  format. <br />  2. First one to solve all the challenges wins. <br />3. Incase of a tie, the one who has used the least hints, wins. <br />4. Players are encouraged to search the web for suitable tools to solve the problems.<br />5. Most importantly, have fun 😉 <br />
              br
              <button onClick={() => setViewDialogView(prev => !prev)} className="mt-2 w-full bg-slate-700 text-white p-2 text-sm rounded-md">
                Close
              </button>
            </dialog>
          </div>
        )}
      </div>

      {quizzes?.map((quiz: { questionNo: number; answer: string; points: number; question: string; imageUrl: string | undefined; hint: string; }, index: React.Key | null | undefined) => (
        <Dialog
          key={index}
          questionNo={quiz.questionNo}
          answer={quiz.answer}
          points={quiz.points}
          question={quiz.question}
          imageUrl={quiz.imageUrl}
          hint={quiz.hint}
          setPoints={setPoints}
        />
      ))}
    </div>
  );
}
