import Link from "next/link";
import React from "react";

import { auth } from "~/server/auth";

import TeamCard from "~/components/ui/custom/card";

import SignIn from "~/components/auth/signin";
import SignOut from "~/components/auth/signout";
import Hero from "~/components/hero";
import { devTeam } from "~/constants/devTeam";

const Home = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-x-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="flex h-full min-h-[100vh] w-full bg-[url('/assets/homebg.webp')] bg-cover bg-center text-center shadow-lg ">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black/80 py-20 min-h-[100vh]">
          <Hero />
        </div>
      </div>
      <div className="mb-10 mt-20 flex flex-col items-center justify-center font-bold">
        <div className="h-auto w-[80vw]">
          <div
            className="flex w-full flex-col items-center justify-center rounded-lg border border-cyan-500 bg-black/70 px-8 py-20 shadow-lg shadow-cyan-500/50"
            id="rulesDiv"
          >
            <h2 className="text-6xl text-cyan-400 neonTextShadow">
              Instructions to Play
            </h2>
            <ul className="dotted-list my-16 font-mono text-lg">
              <h2 className="text-2xl text-cyan-300">
                Round 1: Unlocking the Doors
              </h2>
              <li className="my-2">
                Sign in with provided credentials to start playing.
              </li>
              <li className="my-2">
                Solve as many puzzles (&quot;doors&quot;) as possible to
                maximize points.
              </li>
              <li className="my-2">
                Attempt any number of doors, but only one at a time.
              </li>
              <li className="my-2">Consists of a total of two rounds.</li>
              <li className="my-2">
                Timer starts when you begin a puzzle. Points decrease over time.
              </li>
              <li className="my-2">
                Quitting a puzzle &quot;breaks&quot; the door, preventing
                re-entry.
              </li>
              <li className="my-2">
                Hints cost points, but puzzles have a minimum threshold of
                points.
              </li>
              <li className="my-2">
                Top 25 teams with the highest scores advance to the next round.
              </li>
              <h2 className="my-4 text-2xl text-cyan-300">
                Round 2: The Puzzle Paths
              </h2>
              <li className="my-2">
                Solve sequential puzzles to reach your goal.
              </li>
              <li className="my-2">
                Choose paths with varying difficulty and number of puzzles:
                <ul className="ml-4 list-disc">
                  <li>Shortest Path (5 puzzles): 1 → 2 → 5 → 8 → 9</li>
                  <li>Longest Path (7 puzzles): 1 → 3 → 4 → 5 → 6 → 7 → 9</li>
                  <li>Intermediate Path (6 puzzles): 1 → 2 → 5 → 6 → 7 → 9</li>
                  <li>Intermediate Path (6 puzzles): 1 → 3 → 4 → 5 → 8 → 9</li>
                </ul>
              </li>
              <li className="my-2">
                Shorter paths have harder puzzles; longer paths are easier.
              </li>
              <li className="my-2">Hints add time as a penalty.</li>
              <li className="my-2">
                Top 3 teams completing puzzles in the least time win prizes.
              </li>
              <li className="my-2">
                Hidden Amazon Gift Cards worth Rs 500 in Round 2 puzzles.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-8 flex justify-center gap-6">
          {session ? <SignOut /> : <SignIn />}
          <Link href="/story">
            <button className="text-md mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-cyan-500/50 ring-4 ring-cyan-700 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300">
              Check Storyline
            </button>
          </Link>
        </div>
        <div className="mt-12 flex flex-col items-center font-fira-code">
          <h2 className="my-8 text-6xl text-cyan-400">Dev Team</h2>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-12 py-2">
            {devTeam.map((dev, idx) => (
              <TeamCard key={idx} image={dev.image} name={dev.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
