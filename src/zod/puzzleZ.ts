import { Difficulty, PuzzleRound, PuzzleType } from "@prisma/client";
import { z } from "zod";

const addPuzzleZ = z
  .object({
    name: z.string(),
    route: z.string(),
    puzzleType: z.nativeEnum(PuzzleType),
    difficulty: z.nativeEnum(Difficulty),
    hint: z.string().optional(),
    hintDeduction: z.number().optional(),
    solution: z.string(),
    points: z.number(),
    minimumPoints: z.number(),
    redeemCode: z.string().optional(),
    minimumBountyPoints: z.number().optional(),
    puzzleRound: z.nativeEnum(PuzzleRound),
  })
  .refine((data) => {
    if (data.hint && !data.hintDeduction)
      throw new Error("hintDeduction is required when hint is provided");

    if (data.puzzleType !== "POINTS" && !data.minimumBountyPoints)
      throw new Error(
        "minimumBountyPoints is required when PuzzleType is not POINTS",
      );
  });

const editPuzzleZ = z
  .object({
    id: z.string(),
    name: z.string(),
    route: z.string(),
    puzzleType: z.nativeEnum(PuzzleType),
    difficulty: z.nativeEnum(Difficulty),
    hint: z.string().optional(),
    hintDeduction: z.number().optional(),
    solution: z.string(),
    points: z.number(),
    minimumPoints: z.number(),
    redeemCode: z.string().optional(),
    minimumBountyPoints: z.number().optional(),
    puzzleRound: z.nativeEnum(PuzzleRound),
  })
  .refine((data) => {
    if (data.hint && !data.hintDeduction)
      throw new Error("hintDeduction is required when hint is provided");

    if (data.puzzleType !== "POINTS" && !data.minimumBountyPoints)
      throw new Error(
        "minimumBountyPoints is required when PuzzleType is not POINTS",
      );
  });

const getRoundPuzzlesZ = z.object({
  round: z.nativeEnum(PuzzleRound, { message: "Invalid round" }),
});

const removePuzzleZ = z.object({
  puzzleId: z.string().min(1, { message: "No puzzle selected" }),
});

export { addPuzzleZ, editPuzzleZ, getRoundPuzzlesZ, removePuzzleZ };
