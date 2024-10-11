import { z } from "zod";

const startPuzzleZ = z.object({
  route: z.string().min(1, "No puzzle selected"),
});

const submitPuzzleZ = z.object({
  manualSubmission: z.boolean().default(true),
  // manualSubmission == false => puzzleId == puzzle.route
  puzzleId: z.string().min(1, {
    message: "No puzzle selected",
  }),
  answer: z.string().min(1, {
    message: "Answer cannot be empty",
  }),
});

const helpPuzzleZ = z.object({
  puzzleId: z.string().min(1, {
    message: "No puzzle selected",
  }),
});

const quitPuzzleZ = z.object({
  puzzleId: z.string().min(1, {
    message: "No puzzle selected",
  }),
});

export { startPuzzleZ, submitPuzzleZ, helpPuzzleZ, quitPuzzleZ };
