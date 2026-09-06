"use client";

import Link from "next/link";
import { useChallenges } from "@/app/context/ChallengesProvider";
import { ChallengeType } from "@/app/libs/challenges";

export default function Home() {
  const { challenges } = useChallenges();

  return (
    <div className="bg-black text-emerald-500 min-h-screen w-dvw flex flex-col items-center font-mono">
      <nav className="border-b border-emerald-900/50 bg-black w-full flex flex-col items-center py-3">
        <div className="max-w-7xl w-full flex items-center px-6">
          <h1 className="text-lg font-semibold tracking-wider text-emerald-400">
            root@ctf-box:~#
          </h1>
        </div>
      </nav>
      <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((challenge: ChallengeType) => (
            <div
              key={challenge.id}
              className="border border-emerald-900/60 bg-black p-4 flex flex-col justify-between gap-4 overflow-hidden relative group hover:border-emerald-500/50 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h1 className="text-xs font-bold text-emerald-400 truncate">
                    $ ./&lt;{challenge.title.toLowerCase()}&gt;
                  </h1>
                  <span className="text-[10px] text-emerald-600 shrink-0">
                    [{challenge.tag}]
                  </span>
                </div>
                <div className="text-[10px] text-emerald-600/70 mb-2">
                  &gt; diff: {challenge.difficulty.toLowerCase()}
                </div>
                <p className="text-xs text-emerald-600/80 mb-2 break-words">
                  # {challenge.preview_description}
                </p>
              </div>

              <Link
                href={"challenges/" + challenge.id}
                className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/60 py-2 px-3 text-center transition-colors shrink-0"
              >
                cd challenges/{challenge.id}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
