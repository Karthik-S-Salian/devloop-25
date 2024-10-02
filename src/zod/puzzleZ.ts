import { Difficulty, PuzzleType } from "@prisma/client";
import { z } from "zod";

export const addPuzzleZ = z
  .object({
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
  })
  .refine((data) => {
    if (data.hint) {
      if (!data.hintDeduction)
        throw new Error("hintDeduction is required when hint is provided");
    }

    if (data.PuzzleType !== "POINTS") {
      if (!data.minimumBountyPoints)
        throw new Error(
          "minimumBountyPoints is required when PuzzleType is not POINTS",
        );
    }
  });

export const editPuzzleZ = z
  .object({
    id: z.string(),
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
  })
  .refine((data) => {
    if (data.hint) {
      if (!data.hintDeduction)
        throw new Error("hintDeduction is required when hint is provided");
    }

    if (data.PuzzleType !== "POINTS") {
      if (!data.minimumBountyPoints)
        throw new Error(
          "minimumBountyPoints is required when PuzzleType is not POINTS",
        );
    }
  });

export const getPuzzleZ = z.object({
  route: z.string().min(1, "No puzzle selected"),
});
