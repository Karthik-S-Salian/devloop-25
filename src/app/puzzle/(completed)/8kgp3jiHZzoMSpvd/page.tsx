"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";

type SudokuBoard = (number | null)[][];

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

const Sudoku: React.FC = () => {
  const [board, setBoard] = useState<SudokuBoard>(initialBoard);

  const handleChange = (row: number, col: number, value: string) => {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 1 || newValue > 9) {
      return;
    }
    const newBoard = board.map((r) => [...r]);
    if (newBoard[row]) {
      newBoard[row][col] = newValue;
    }
    setBoard(newBoard);
  };

  const handleReset = () => {
    setBoard(initialBoard);
  };

  return (
    <div className="flex h-[50vw] items-center justify-center selection:w-full">
      <div className="flex flex-col items-center gap-5">
        <div className="grid grid-cols-9 gap-1">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  value={cell ?? ""}
                  maxLength={1}
                  disabled={initialBoard[rowIndex]?.[colIndex] !== null}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                  className={`size-10 border border-gray-400 text-center text-lg ${initialBoard[rowIndex]?.[colIndex] !== null ? "bg-gray-200 text-gray-600" : "bg-white"} `}
                />
              ))}
            </div>
          ))}
        </div>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default Sudoku;
