import { z } from "zod";

export const submitPuzzleZ = z.object({
  puzzleId: z.string(),
  answer: z.string(),
});
