import { PuzzleType } from "@prisma/client";
import { z } from "zod";

const getPuzzleFromRouteZ = z.object({
  route: z.string().min(1, "Route must be at least 1 character"),
});

const addPuzzleZ = z
  .object({
    route: z.string().min(1, "Route must be at least 1 character"),
    puzzleType: z.nativeEnum(PuzzleType),
    hint: z.string().min(1, "Hint must be at least 1 character"),
    hintDeduction: z.number().positive(),
    solution: z.string().min(1, "Solution must be at least 1 character"),
    points: z.number().positive(),
    isOneTimeUse: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.puzzleType === "POINTS" || typeof data.isOneTimeUse !== "undefined",
    {
      message: "One time use must be defined for REDEEM_CODE puzzle type",
      path: ["isOneTimeUse"],
    },
  )
  .refine((data) => data.points > data.hintDeduction, {
    message: "Hint deduction must be less than points",
    path: ["hintDeduction"],
  });

export { getPuzzleFromRouteZ, addPuzzleZ };
