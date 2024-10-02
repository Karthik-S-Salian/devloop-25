import React from "react";

import { api } from "~/trpc/server";

const ViewPuzzle = async () => {
  const data = await api.puzzle.getAllPuzzle();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ViewPuzzle;
