"use client";

import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS } from "input-otp";
import { Delete, Info } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

import MiniPuzzle from "~/app/puzzle/(completed)/Xa2OLBJrqtz4sxtP/_components/miniPuzzle";
import { useSubmitPuzzle } from "~/hooks/submission";
import { useSubmission } from "~/store";

const NO_OF_ROWS = 5;
const NO_OF_COLS = 9;

type Row = string[] & { length: typeof NO_OF_COLS };
type Matrix = Row[] & { length: typeof NO_OF_ROWS };

const Page = () => {
  const { makeAutoSubmission } = useSubmission();
  useEffect(() => {
    makeAutoSubmission();
  }, [makeAutoSubmission]);

  const submitPuzzle = useSubmitPuzzle();

  const [solved, setSolved] = useState<boolean>(false);
  const [matrix, setMatrix] = useState<Matrix>([
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ]);

  const updateCell = useCallback<
    (row: number, col: number, newValue: string) => void
  >((row, col, newValue) => {
    setMatrix((prev) => {
      const newMatrix = [...prev] as Matrix;
      const newRow = [...prev[row]!] as Row;
      newRow[col] = newValue;
      newMatrix[row] = newRow;
      return newMatrix;
    });
  }, []);

  const updateFinalRow = useCallback(() => {
    setMatrix((prev) => {
      const newMatrix = [...prev] as Matrix;
      const newAnswerRow = [...prev[NO_OF_ROWS - 1]!] as Row;
      for (let col = 0; col < NO_OF_COLS; col++)
        if (
          !isNaN(parseInt(prev[0]![col] ?? "")) &&
          !isNaN(parseInt(prev[1]![col] ?? "")) &&
          !isNaN(parseInt(prev[2]![col] ?? "")) &&
          !isNaN(parseInt(prev[3]![col] ?? ""))
        ) {
          let temp = parseInt(prev[0]![col]!);
          temp = temp * parseInt(prev[1]![col]!);
          temp = temp + parseInt(prev[2]![col]!);
          temp = temp ** parseInt(prev[3]![col]!);
          newAnswerRow[col] = Math.floor(temp % 10).toString();
        } else newAnswerRow[col] = "";
      newMatrix[NO_OF_ROWS - 1] = newAnswerRow;
      return newMatrix;
    });
  }, []);

  const onChange = useCallback<
    (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void
  >(
    (e, row, col) => {
      const newValue = e.target.value.slice(e.target.value.length - 1);
      if (newValue.length > 0 && !new RegExp(REGEXP_ONLY_DIGITS).test(newValue))
        return e.preventDefault();
      updateCell(row, col, newValue);
      updateFinalRow();
      let [dRow, dCol] = [row, col];
      if (dCol + 1 < NO_OF_COLS) [dRow, dCol] = [dRow, dCol + 1];
      else if (dRow + 1 < NO_OF_ROWS) [dRow, dCol] = [dRow + 1, 0];
      document.getElementById(`i${dRow}${dCol}`)?.focus();
    },
    [updateCell, updateFinalRow],
  );

  const onKeyDown = useCallback<
    (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => void
  >(
    (e, row, col) => {
      let [dRow, dCol] = [row, col];
      switch (e.key) {
        case "ArrowLeft":
          dCol = Math.max(dCol - 1, 0);
          break;
        case "ArrowRight":
          dCol = Math.min(dCol + 1, NO_OF_COLS - 1);
          break;
        case "ArrowUp":
          dRow = Math.max(dRow - 1, 0);
          break;
        case "ArrowDown":
          dRow = Math.min(dRow + 1, NO_OF_ROWS - 1);
          break;
        case "Backspace":
          if (dCol - 1 >= 0) [dRow, dCol] = [dRow, dCol - 1];
          else if (dRow - 1 >= 0) [dRow, dCol] = [dRow - 1, NO_OF_COLS - 1];
          e.preventDefault();
          updateCell(row, col, "");
          updateFinalRow();
          break;
        case "Delete":
          if (dCol + 1 < NO_OF_COLS) [dRow, dCol] = [dRow, dCol + 1];
          else if (dRow + 1 < NO_OF_ROWS) [dRow, dCol] = [dRow + 1, 0];
          e.preventDefault();
          updateCell(row, col, "");
          updateFinalRow();
          break;
        case "Enter":
          break;
        case "Tab":
          break;
        default:
          if (
            new RegExp(REGEXP_ONLY_CHARS).test(e.key) &&
            !e.ctrlKey &&
            !e.altKey &&
            !e.metaKey
          )
            e.preventDefault();
          return;
      }
      document.getElementById(`i${dRow}${dCol}`)?.focus();
    },
    [updateCell, updateFinalRow],
  );

  // NOTE(Omkar): On dev server due to react strict mode, callback might run twice
  const onPaste = useCallback<
    (
      e: React.ClipboardEvent<HTMLInputElement>,
      row: number,
      col: number,
    ) => void
  >(
    (e, row, col) => {
      let [dRow, dCol] = [row, col];
      e.preventDefault();
      const pastedValue = e.clipboardData.getData("text/plain");
      if (
        pastedValue.length > 0 &&
        !new RegExp(REGEXP_ONLY_DIGITS).test(pastedValue)
      )
        return;
      setMatrix((prev) => {
        const newMatrix = [...prev] as Matrix;
        for (const char of pastedValue) {
          if (dCol >= NO_OF_COLS) [dRow, dCol] = [dRow + 1, 0];
          if (dRow >= NO_OF_ROWS) break;
          newMatrix[dRow]![dCol] = char;
          dCol++;
        }
        return newMatrix;
      });
      updateFinalRow();
    },
    [updateFinalRow],
  );

  useEffect(() => {
    if (matrix[NO_OF_ROWS - 1]!.join("") === "172163100") {
      if (!solved)
        submitPuzzle({
          answer: "172.16.3.100",
        });
      setSolved(true);
    }
  }, [matrix, solved, submitPuzzle]);

  return (
    <div className="relative flex size-full items-center justify-center">
      {/* Mini Puzzle 3 */}
      <>
        <pre className="absolute left-[63.3488%] top-[82.5298%] rotate-[115.1765deg] text-emerald-200">
          dFJ1FrNvf
        </pre>
        <pre className="absolute left-[82.3934%] top-[65.6919%] rotate-[149.1057deg] text-amber-200">
          Rb3MkdpqS
        </pre>
        <pre className="absolute left-[75.4254%] top-[43.0469%] rotate-[59.5257deg] text-teal-200">
          BAJxRfS8F
        </pre>
        <pre className="absolute left-[37.5075%] top-[72.8005%] rotate-[104.2695deg] text-lime-200">
          x6qilXNKe
        </pre>
        <pre className="absolute left-[12.2503%] top-[37.5431%] rotate-[73.1252deg] text-sky-200">
          ASiDA3muf
        </pre>
        <pre className="absolute left-[37.7848%] top-[14.9656%] rotate-[33.9982deg] text-indigo-200">
          7iVFIwGfh
        </pre>
        <pre className="absolute left-[10.0388%] top-[86.7833%] rotate-[65.1926deg] text-rose-200">
          PdcnFsIQ2
        </pre>
        <pre className="absolute left-[11.8494%] top-[16.8898%] rotate-[15.1057deg] text-slate-200">
          qgRp4JHLx
        </pre>
        <pre className="absolute left-[81.3186%] top-[22.6551%] rotate-[179.4563deg] text-fuchsia-200">
          QayitV3qq
        </pre>
      </>

      <div className="flex w-fit flex-col items-center justify-center gap-4">
        {Array.from({ length: NO_OF_ROWS - 1 }).map((_, row) => (
          <div key={row} className="flex gap-4">
            {Array.from({ length: NO_OF_COLS }).map((_, col) => (
              <Input
                id={`i${row}${col}`}
                key={col}
                className="aspect-square text-center"
                value={matrix[row]![col]}
                onChange={(e) => onChange(e, row, col)}
                onKeyDown={(e) => onKeyDown(e, row, col)}
                onPaste={(e) => onPaste(e, row, col)}
              />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-teal-500 hover:bg-teal-600">
                  <Info />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mini Puzzle</DialogTitle>
                  <DialogDescription>
                    Solve this to get the code
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full items-center justify-center">
                  <MiniPuzzle idx={row} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
        <Separator />
        <div className="flex gap-4">
          {Array.from({ length: NO_OF_COLS }).map((_, j) => (
            <Input
              key={j}
              className="aspect-square"
              value={matrix[NO_OF_ROWS - 1]![j]}
              disabled
            />
          ))}
          <Button
            className="bg-rose-500 hover:bg-rose-600"
            onClick={() =>
              setMatrix([
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
              ])
            }
          >
            <Delete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
