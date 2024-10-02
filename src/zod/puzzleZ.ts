import { Difficulty, PuzzleType } from "@prisma/client";
import { z } from "zod";

export const addPuzzleZ = z.object({
  route: z.string(),
  PuzzleType: z.nativeEnum(PuzzleType),
  Difficulty: z.nativeEnum(Difficulty),
  hint: z.string().optional(),
  hintDeduction: z.number().optional(),
  solution: z.string(),
  points: z.number(),
  minimumPoints: z.number(),
  redeemCode: z.string().optional(),
  minimumBountyPoints: z.number().optional(),
});

export const getPuzzleZ = z.object({
  route: z.string().min(1, "No puzzle selected"),
});
