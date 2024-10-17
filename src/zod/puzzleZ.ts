import { PuzzleDifficulty } from "@prisma/client";
import { z } from "zod";

const addPuzzleZ = z.object({
  name: z.string().min(1, { message: "Should be atleast 1 character long" }),
  route: z.string().min(1, { message: "Should be atleast 1 character long" }),
  difficulty: z.nativeEnum(PuzzleDifficulty, { message: "Invalid difficulty" }),
  minusPoints: z.number().positive({ message: "Number must be positive" }),
  hint: z.string().min(1, { message: "Should be atleast 1 character long" }),
  plusPoints: z.number().positive({ message: "Number must be positive" }),
  solution: z
    .string()
    .min(1, { message: "Should be atleast 1 character long" }),
});

const editPuzzleZ = z.object({
  id: z.string().min(1, { message: "No puzzle selected" }),
  name: z.string().min(1, { message: "Should be atleast 1 character long" }),
  route: z.string().min(1, { message: "Should be atleast 1 character long" }),
  difficulty: z.nativeEnum(PuzzleDifficulty, { message: "Invalid difficulty" }),
  minusPoints: z.number().positive({ message: "Number must be positive" }),
  hint: z.string().min(1, { message: "Should be atleast 1 character long" }),
  plusPoints: z.number().positive({ message: "Number must be positive" }),
  solution: z
    .string()
    .min(1, { message: "Should be atleast 1 character long" }),
});

const removePuzzleZ = z.object({
  puzzleId: z.string().min(1, { message: "No puzzle selected" }),
});

export { addPuzzleZ, editPuzzleZ, removePuzzleZ };
