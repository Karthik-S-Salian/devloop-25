import { z } from "zod";

const solvePuzzleZ = z.object({
  puzzleId: z.string().min(1, { message: "No puzzle selected" }),
});

export { solvePuzzleZ };
