import { PuzzleDifficulty, PuzzleRound } from "@prisma/client";
import { z } from "zod";

const addPuzzleZ = z.object({
  name: z.string(),
  route: z.string(),
  difficulty: z.nativeEnum(PuzzleDifficulty),
  round: z.nativeEnum(PuzzleRound),
  hint: z.string(),
  minusPoints: z.number(),
  solution: z.string(),
  plusPoints: z.number(),
});

const editPuzzleZ = z.object({
  id: z.string(),
  name: z.string(),
  route: z.string(),
  difficulty: z.nativeEnum(PuzzleDifficulty),
  round: z.nativeEnum(PuzzleRound),
  minusPoints: z.number(),
  hint: z.string(),
  plusPoints: z.number(),
  solution: z.string(),
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
