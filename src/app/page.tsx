"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <style jsx>{`
        /* NeonText.css */
        .neonText {
          color: #e7b40b;
          text-shadow:
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #fff,
            0 0 42px #0fa,
            0 0 82px #0fa,
            0 0 92px #0fa,
            0 0 102px #0fa,
            0 0 151px #0fa;
          font-size: 4rem;
          animation: flicker 4.5s infinite alternate;
        }

        /* Flickering animation */
        @keyframes flicker {
          0%,
          18%,
          22%,
          25%,
          53%,
          57%,
          100% {
            text-shadow:
              0 0 4px #fff,
              0 0 11px #fff,
              0 0 19px #fff,
              0 0 40px #0fa,
              0 0 80px #0fa,
              0 0 90px #0fa,
              0 0 100px #0fa,
              0 0 150px #0fa;
          }

          20%,
          24%,
          55% {
            text-shadow: none;
          }
        }

        .neonTextbg {
          color: #e7b40b;
          text-shadow:
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 10px #fff,
            0 0 12px #0fa,
            0 0 20px #0fa,
            0 0 20px #0fa,
            0 0 20px #0fa,
            0 0 40px #0fa;
          font-size: 4rem;
        }

        .dotted-list {
          list-style-type: none;
          padding: 0;
        }

        .dotted-list li {
          position: relative;
          padding-left: 1.5em;
        }

        .dotted-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.7em;
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background-color: white;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center gap-4 overflow-x-hidden bg-black">
        <div className="mt-2 flex h-full min-h-[100vh] w-full flex-col items-center justify-center gap-4 bg-[url('/assets/homebg.jpg')] bg-center py-20 text-center text-white shadow-lg shadow-yellow-300 backdrop-brightness-50">
          <Image
            src="/assets/Nitte NMAMIT Logo - White.webp"
            alt=""
            height={700}
            width={700}
          />
          <h1 className="my-2 font-serif text-4xl font-bold">
            Finite Loop Club
          </h1>
          <h3 className="my-2 font-serif text-2xl font-bold">Presents</h3>
          <h1 className="neonText mb-6 mt-2 pb-12 pt-2 text-4xl font-bold text-green-600">
            Digital Hunt
          </h1>

          <p className="text-lg">Instructions before you start</p>
          <div className="my-8">
            <ArrowDown
              size={32}
              className="animate-bounce cursor-pointer"
              onClick={() => {
                document
                  .getElementById("rulesDiv")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
        <div className="mb-10 mt-20 font-bold text-white">
          <div className="h-auto w-[80vw]">
            <div
              className="flex w-full flex-col items-center justify-center border-2 border-white px-8 py-20"
              id="rulesDiv"
            >
              <h2 className="neonTextbg text-6xl">Instructions to Play</h2>
              <ul className="dotted-list my-16 text-lg">
                <h2 className="text-xl*">Round 1: Unlocking the Doors</h2>
                <li>
                  You need to sign in with provided credentials to start
                  playing.
                </li>
                <li>
                  Solve as many puzzles (referred to as &quot;doors&quot;) as
                  possible to maximize your points.
                </li>
                <li>
                  Participants can attempt any number of doors, but only one at
                  a time.
                </li>
                <li>Consists of a total of two rounds.</li>
                <li>
                  Once you start a puzzle, your timer begins. The longer you
                  take, the more your points will decrease based on a
                  time-degeneration system.
                </li>
                <li>
                  If you choose to quit a puzzle, the door will
                  &quot;break,&quot; meaning you can never return to that puzzle
                  again. So, think carefully before quitting.
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
                <li>
                  Solve a series of sequential puzzles to reach your goal.
                </li>
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
                  The first team to solve all the puzzles and reach the goal
                  wins. The top 3 teams that complete the puzzles in the least
                  amount of time will win 1st, 2nd, and 3rd prizes.{" "}
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
            <Link href="/auth/signIn">
              <button className="text-md mb-2 me-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                SignIn here
              </button>
            </Link>
            <Link href="/story">
              <button className="text-md mb-2 me-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                Check Storyline
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
