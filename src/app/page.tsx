import Link from "next/link";
import { type UrlObject } from "url";

import { Button } from "~/components/ui/button";

import { api } from "~/trpc/server";

const Home = async () => {
  const roundOnePuzzles = await api.puzzle.getRoundPuzzles({
    round: "ROUND_ONE",
  });

  const roundTwoPuzzles = await api.puzzle.getRoundPuzzles({
    round: "ROUND_TWO",
  });

  const puzzleListRound1 = [
    { path: "/puzzle2", title: "Quizzes" },
    { path: "/puzzle5", title: "Solve an Excecl file" },
    { path: "/puzzle6", title: "Who am I?" },
    { path: "/puzzle7", title: "IPSum" },
    { path: "/puzzle8", title: "reverse audio" },
    { path: "/puzzle9", title: "optical illusion" },
    { path: "/puzzle10", title: "mirror text" },
    { path: "/puzzle11", title: "image processing" },
    // { path:"/puzzle9", title:""},
  ];

  const puzzleListRound2 = [
    { path: "/jwt", title: "JWT puzzle" },
    { path: "/morse", title: "Morse Code" },
  ];

  return (
    <div className="flex size-full flex-col gap-10">
      <h1>Puzzle List</h1>

      <div className="flex items-center justify-center gap-10">
        <div className="flex w-fit flex-col gap-4">
          <h3>Round 1</h3>
          <div className="flex flex-col gap-4">
            {roundOnePuzzles.map((puzzle, idx) => (
              <Button key={idx} asChild>
                <Link href={`/puzzle/${puzzle.route}` as unknown as UrlObject}>
                  {puzzle.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex w-fit flex-col gap-4">
          <h3>Round 2</h3>
          <div className="flex flex-col gap-4">
            {roundTwoPuzzles.map((puzzle, idx) => (
              <Button key={idx} asChild>
                <Link href={`/puzzle/${puzzle.route}` as unknown as UrlObject}>
                  {puzzle.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
