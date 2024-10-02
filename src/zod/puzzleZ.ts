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
      if (data.hintDeduction === undefined) {
        throw new Error("hintDeduction is required if hint is provided");
      }
    }

    if (data.PuzzleType !== "POINTS") {
      if (data.minimumBountyPoints) {
        throw new Error("redeemCode is not allowed for non-POINTS puzzles");
      }
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
      if (data.hintDeduction === undefined) {
        throw new Error("hintDeduction is required if hint is provided");
      }
    }

    if (data.PuzzleType !== "POINTS") {
      if (data.minimumBountyPoints) {
        throw new Error("redeemCode is not allowed for non-POINTS puzzles");
      }
    }
  });
