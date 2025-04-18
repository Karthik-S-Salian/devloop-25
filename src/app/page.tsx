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
      <div className="flex h-full min-h-[100vh] w-full bg-[url('/assets/homebg.webp')] bg-cover bg-center text-center shadow-lg">
        <div className="flex h-full min-h-[100vh] w-full flex-col items-center justify-center gap-4 bg-black/80 py-20">
          <Hero />
        </div>
      </div>
      <div className="mb-10 mt-20 flex flex-col items-center justify-center font-bold">
        <div className="h-auto w-[80vw]">
          <div
            className="flex w-full flex-col items-center justify-center rounded-xl border border-cyan-500 px-10 py-16 shadow-md shadow-cyan-500/50"
            id="rulesDiv"
          >
            <h2 className="neonTextShadow mb-8 text-5xl font-extrabold text-cyan-400">
              🔐{" "}
              <span className="underline decoration-cyan-500">
                Rules & Regs — Decrypt’d
              </span>
            </h2>
            <div className="space-y-4 text-left text-lg leading-relaxed text-gray-300">
              <p>
                🧠 <strong className="text-cyan-400">Solo Event:</strong> Go
                solo — no teams, no lifelines.
              </p>
              <p>
                🌐 <strong className="text-cyan-400">Online Challenge:</strong>{" "}
                Access the puzzles anytime during Hackfest. Link in bio.
              </p>
              <p>
                ⏱{" "}
                <strong className="text-cyan-400">Time-Based Scoring:</strong>{" "}
                Faster + accurate = higher on the leaderboard.
              </p>
              <p>
                🚫 <strong className="text-cyan-400">Cheating?</strong> Yes, be
                a vibe puzzle solver, not an issue.
              </p>
              <p>
                🏆 <strong className="text-cyan-400">Top Scorers Win:</strong>{" "}
                Finish first. Score highest. Brag forever.
              </p>
              <p>
                📞 <strong className="text-cyan-400">Need Help?</strong> Ping
                Athul:{" "}
                <a href="tel:+919353222540" className="text-cyan-500 underline">
                  +91 93532 22540
                </a>
              </p>
            </div>
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
