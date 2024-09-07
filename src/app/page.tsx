import Link from "next/link";

export default function Home() {
  return (
  	<main className="p-24">
    	<h2 className="text-center mb-12">Puzzle List</h2>
		<p>Round1 puzzles</p>
     	<ul>
			<li><Link href={"/puzzle1"} className="underline text-blue-500 italic">1. responsive puzzle</Link></li>
			<li><Link href={"/puzzle2"} className="underline text-blue-500 italic">2. Quizzes</Link></li>
			<li><Link href={"/puzzle3" } className="underline text-blue-500 italic">3. A simple click</Link></li>
      		
     	</ul>

     	<br />

     	<p>Round2 puzzles</p>
     	<ul>
    		<li>
				<Link href={"/jwt"} className="underline text-blue-500 italic">
					1. JWT Puzzle
				</Link>
			</li>
     	</ul>
    </main>
  );
}
