import Link from "next/link";

import { getServerAuthSession } from "~/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  const isRound2 = session?.user?.isRound2 ?? false;

  const puzzleListRound1 = [
    { path: "/puzzle1", title: "responsive puzzle" },
    { path: "/puzzle2", title: "Quizzes" },
    { path: "/puzzle3", title: "A simple click" },
    { path: "/puzzle4", title: "Solve Qr code" },
    { path: "/puzzle5", title: "Solve an Excecl file" },
    { path: "/puzzle6", title: "Who am I?" },
    { path: "/puzzle7", title: "IPSum" },
    { path: "/puzzle8", title: "reverse audio" },
    { path: "/puzzle9", title: "optical illusion"}
    // { path:"/puzzle9", title:""},
  ];

  const puzzleListRound2 = [
    { path: "/jwt", title: "JWT puzzle" },
    { path: "/morse", title: "Morse Code" },
    // { path:"/puzzle", title:""},
  ];

  return (
    <main className="p-24">
      <h2 className="mb-12 text-center">Puzzle List</h2>
      {!isRound2 && <p>Round1 puzzles</p>}
      <ol>
        {!isRound2 &&
          puzzleListRound1.map((puzzle, idx) => (
            <li key={idx}>
              <Link
                href={puzzle.path}
                className="italic text-blue-500 underline"
              >
                {idx + 1}. {puzzle.title}
              </Link>
            </li>
          ))}
      </ol>

      <br />

      {isRound2 && <p>Round2 puzzles</p>}
      <ul>
        {isRound2 &&
          puzzleListRound2.map((puzzle, idx) => (
            <li key={idx}>
              <Link
                href={puzzle.path}
                className="italic text-blue-500 underline"
              >
                {idx + 1}. {puzzle.title}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}
