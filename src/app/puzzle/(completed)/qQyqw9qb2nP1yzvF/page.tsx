"use client";

import { Fragment, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";
import { useSubmission } from "~/store";

type SudokuBoard = ((number | null)[] & { length: 9 })[] & { length: 9 };

const initialBoard: SudokuBoard = [
  [5, 3, null, 4, 7, null, 8, null, null], // 5 = N
  [null, 6, null, 8, null, 3, null, 1, null], // 6 = O
  [null, null, 6, null, null, 5, 2, null, 3], // 6 = O
  [null, null, null, 2, 6, null, 5, 3, null], // 2 = B
  [null, null, null, null, 1, 7, 4, null, null], // 1 = S
  [null, 1, null, null, null, 8, 9, null, null], // 8 = Q
  [null, 2, null, 7, null, null, 3, null, null], // 3 = U
  [null, null, null, null, null, null, null, 1, null], // 1 = A
  [null, 4, null, null, null, 6, 1, null, 4], // 4 = D
];

const Page = () => {
  const { setSubmissionNote } = useSubmission();
  useEffect(() => {
    setSubmissionNote("Meaningful phrase");
  }, [setSubmissionNote]);

  const [board, setBoard] = useState<SudokuBoard>(initialBoard);

  const handleChange = (row: number, col: number, value: string) => {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 1 || newValue > 9) return;
    const newBoard = board.map((r) => [...r]) as SudokuBoard;
    if (newBoard[row]) newBoard[row][col] = newValue;
    setBoard(newBoard);
  };

  const handleReset = () => setBoard(initialBoard);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-9 gap-1">
        {board.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell ?? ""}
                maxLength={1}
                disabled={initialBoard[rowIndex]?.[colIndex] !== null}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                className={cn(
                  "size-8 border border-gray-400 text-center text-lg sm:size-10 md:size-12",
                  initialBoard[rowIndex]?.[colIndex] !== null
                    ? "bg-gray-200 text-gray-600"
                    : "bg-white",
                  (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) &&
                    "border-t-2 border-t-black",
                  (rowIndex === 2 || rowIndex === 5 || rowIndex === 8) &&
                    "border-b-2 border-b-black",
                  (colIndex === 0 || colIndex === 3 || colIndex === 6) &&
                    "border-l-2 border-l-black",
                  (colIndex === 2 || colIndex === 5 || colIndex === 8) &&
                    "border-r-2 border-r-black",
                )}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

export default Page;
