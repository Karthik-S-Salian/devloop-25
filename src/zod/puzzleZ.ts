import { PuzzleDifficulty, PuzzleRound } from "@prisma/client";
import { z } from "zod";

const addPuzzleZ = z.object({
  name: z.string().min(1, { message: "Should be atleast 1 character long" }),
  devName: z.string().min(1, { message: "Should be atleast 1 character long" }),
  route: z.string().min(1, { message: "Should be atleast 1 character long" }),
  difficulty: z.nativeEnum(PuzzleDifficulty, { message: "Invalid difficulty" }),
  round: z.nativeEnum(PuzzleRound, { message: "Invalid round" }),
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
  devName: z.string().min(1, { message: "Should be atleast 1 character long" }),
  route: z.string().min(1, { message: "Should be atleast 1 character long" }),
  difficulty: z.nativeEnum(PuzzleDifficulty, { message: "Invalid difficulty" }),
  round: z.nativeEnum(PuzzleRound, { message: "Invalid round" }),
  minusPoints: z.number().positive({ message: "Number must be positive" }),
  hint: z.string().min(1, { message: "Should be atleast 1 character long" }),
  plusPoints: z.number().positive({ message: "Number must be positive" }),
  solution: z
    .string()
    .min(1, { message: "Should be atleast 1 character long" }),
});

const getRoundPuzzlesZ = z.object({
  round: z.union([z.nativeEnum(PuzzleRound), z.literal("BOTH")], {
    message: "Invalid round",
  }),
});

const removePuzzleZ = z.object({
  puzzleId: z.string().min(1, { message: "No puzzle selected" }),
});

export { addPuzzleZ, editPuzzleZ, getRoundPuzzlesZ, removePuzzleZ };
