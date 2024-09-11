import Link from "next/link";
import path from "path";

export default function Home() {
  const puzzleListRound1 = [
    { path: "/puzzle1", title: "responsive puzzle" },
    { path: "/puzzle2", title: "Quizzes" },
    { path: "/puzzle3", title: "A simple click" },
    { path: "/puzzle4", title: "Solve Qr code" },
    { path: "/puzzle5", title: "Solve an Excecl file" },
    { path: "/puzzle6", title: "Who am I?" },
    { path: "/puzzle7", title: "IPSum" },
    { path: "/puzzle8", title: "reverse audio" },
    // { path:"/puzzle9", title:""},
  ];

	const puzzleListRound2 = [
		{ path:"/jwt", title:"JWT puzzle"},
		{ path:"/morse", title:"Morse Code"}
		// { path:"/puzzle", title:""},
	]

  return (
    <main className="p-24">
      <h2 className="mb-12 text-center">Puzzle List</h2>
      <p>Round1 puzzles</p>
      <ol>
        {puzzleListRound1.map((puzzle, i) => (
          <li>
            <Link href={puzzle.path} className="italic text-blue-500 underline">
              {i + 1}. {puzzle.title}
            </Link>
          </li>
        ))}
      </ol>

      <br />

      <p>Round2 puzzles</p>
      <ul>
        {puzzleListRound2.map((puzzle, i) => (
          <li>
            <Link href={puzzle.path} className="italic text-blue-500 underline">
              {i + 1}. {puzzle.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
