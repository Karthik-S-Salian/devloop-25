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
    <div className="flex flex-col items-center justify-center gap-4 overflow-x-hidden bg-black">
      <div className="mt-2 flex h-full min-h-[100vh] w-full flex-col items-center justify-center gap-4 bg-[url('/assets/homebg.jpg')] bg-center py-20 text-center text-white shadow-lg shadow-yellow-300 backdrop-brightness-50">
        <Hero />
      </div>
      <div className="mb-10 mt-20 flex flex-col items-center justify-center font-bold text-white">
        <div className="h-auto w-[80vw]">
          <div
            className="flex w-full flex-col items-center justify-center border-2 border-white px-8 py-20"
            id="rulesDiv"
          >
            <h2 className="neonTextbg text-6xl">Instructions to Play</h2>
            <ul className="dotted-list my-16 text-lg">
              <h2 className="text-xl*">Round 1: Unlocking the Doors</h2>
              <li>
                You need to sign in with provided credentials to start playing.
              </li>
              <li>
                Solve as many puzzles (referred to as &quot;doors&quot;) as
                possible to maximize your points.
              </li>
              <li>
                Participants can attempt any number of doors, but only one at a
                time.
              </li>
              <li>Consists of a total of two rounds.</li>
              <li>
                Once you start a puzzle, your timer begins. The longer you take,
                the more your points will decrease based on a time-degeneration
                system.
              </li>
              <li>
                If you choose to quit a puzzle, the door will &quot;break,&quot;
                meaning you can never return to that puzzle again. So, think
                carefully before quitting.
              </li>
              <li>
                Hints are available for puzzles, but each hint you take will
                cost you points. Even after time degeneration and hint
                deductions, there is a *minimum threshold* of points you can
                earn from any puzzle.
              </li>
              <li>
                The top 25 teams with the highest scores (based on points and
                time) will advance to the next round.
              </li>
              <h2 className="my-4 text-xl"> Round 2: The Puzzle Paths</h2>
              <li>Solve a series of sequential puzzles to reach your goal.</li>
              <li>
                There are 9 puzzles in total, and participants must follow one
                of several paths to complete them. You cannot proceed to the
                next puzzle until the previous one in the path is solved.
              </li>
              <li>
                <b>Paths:</b> <br />
                <b> Shortest Path (5 puzzles)</b>: 1 → 2 → 5 → 8 → 9 - <br />
                <b> Longest Path (7 puzzles)</b>: 1 → 3 → 4 → 5 → 6 → 7 → 9 -{" "}
                <br />
                <b> Intermediate Path (6 puzzles)</b>: 1 → 2 → 5 → 6 → 7 → 9 -{" "}
                <br />
                <b> Intermediate Path (6 puzzles)</b>: 1 → 3 → 4 → 5 → 8 → 9 -{" "}
                <br />
              </li>
              <li>
                Shorter paths will have harder puzzles. - Longer paths will
                contain easier puzzles.
              </li>
              <li>Hints will result in an addition of time as a penalty.</li>
              <li>
                The first team to solve all the puzzles and reach the goal wins.
                The top 3 teams that complete the puzzles in the least amount of
                time will win 1st, 2nd, and 3rd prizes.{" "}
              </li>
              <li>
                Amazon Gift Cards: Hidden within the Round 2 puzzles are 3
                Amazon gift card vouchers worth Rs 500 each. The first team to
                redeem each voucher wins it.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-8 flex justify-center gap-6">
          {session ? <SignOut /> : <SignIn />}
          <Link href="/story">
            <button className="text-md mb-2 me-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
              Check Storyline
            </button>
          </Link>
        </div>
        <div className="mt-12 flex flex-col items-center font-fira-code">
          <h2 className="neonTextbg my-8 text-6xl">Dev Team</h2>
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
