import { z } from "zod";

export const startPuzzleZ = z.object({
  userId: z.string(),
  puzzleId: z.string(),
});

export const submitPuzzleZ = z.object({
  userId: z.string(),
  puzzleId: z.string(),
});

export const getHintZ = z.object({
  userId: z.string(),
  puzzleId: z.string(),
});
