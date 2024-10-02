"use client";

import { api } from "~/trpc/react";

export default function Test() {
  const { data: puzzle, isLoading, error } = api.puzzle.getPuzzle.useQuery("test");
  
     if (isLoading) return <>Loading...</>;
     if (error) return <>Error: {error.message}</>;
     if (!puzzle) return <>No puzzle data</>;
     return <>Hello</>;
}
