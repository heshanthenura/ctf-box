"use client";

import Link from "next/link";
import { useChallenges } from "@/app/context/ChallengesProvider";
import { ChallengeType } from "@/app/libs/challenges";

export default function Home() {
  const { challenges } = useChallenges();

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen w-dvw flex flex-col items-center font-mono selection:bg-zinc-100 selection:text-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-950 w-full flex flex-col items-center py-3">
        <div className="max-w-7xl w-full flex items-center px-6">
          <h1 className="text-sm font-semibold tracking-wider text-zinc-200">
            root@ctf-box:~#
          </h1>
        </div>
      </nav>
      <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6">
        <div className="w-full border border-zinc-800 bg-zinc-900/30 mb-8 text-xs">
          <div className="border-b border-zinc-800 bg-zinc-900/60 px-4 py-2 flex items-center justify-between text-zinc-400">
            <span>$ cat /etc/briefing.txt</span>
            <span className="text-[10px] text-zinc-600">utf-8</span>
          </div>
          <div className="p-5 space-y-3 leading-relaxed text-zinc-300">
            <p className="text-zinc-400">
              We&apos;ve been hired by a private client to run an aggressive
              penetration test against a rival corporation. Word on the street
              is their developers cut corners, leaving their digital perimeter
              full of holes. Our objective is to infiltrate their staging
              infrastructure step-by-step, bypass their security controls, and
              extract what our client asked for before their team locks down the
              network.
            </p>
            <p className="text-zinc-500 italic pt-1">
              &gt; Complete each objective sequentially to progress through the
              operation. Good luck.
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((challenge: ChallengeType, index: number) => {
            const isUnlocked = index === 0 || challenges[index - 1].completed;

            return (
              <div
                key={challenge.id}
                className={`border bg-zinc-950 p-4 flex flex-col justify-between gap-4 overflow-hidden relative group transition-colors ${
                  !isUnlocked
                    ? "border-zinc-900/40 opacity-40"
                    : challenge.completed
                      ? "border-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h1 className="text-xs font-bold text-zinc-200 truncate">
                      $ ./&lt;{challenge.title.toLowerCase()}&gt;
                    </h1>
                    <span className="text-[10px] text-zinc-500 shrink-0">
                      [{challenge.tag}]
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                    <span>&gt; diff: {challenge.difficulty.toLowerCase()}</span>
                    <span
                      className={
                        !isUnlocked
                          ? "text-zinc-700"
                          : challenge.completed
                            ? "text-zinc-100 font-bold"
                            : "text-zinc-400"
                      }
                    >
                      status:{" "}
                      {!isUnlocked
                        ? "[LOCKED]"
                        : challenge.completed
                          ? "[SOLVED]"
                          : "[UNSOLVED]"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-2 break-words">
                    #{" "}
                    {isUnlocked
                      ? challenge.preview_description
                      : "Access denied. Complete previous target to decrypt."}
                  </p>
                </div>

                {isUnlocked ? (
                  <Link
                    href={"challenges/" + challenge.id}
                    className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-500 py-2 px-3 text-center transition-colors shrink-0"
                  >
                    cd challenges/{challenge.id}
                  </Link>
                ) : (
                  <div className="text-xs border border-zinc-900 text-zinc-700 py-2 px-3 text-center cursor-not-allowed shrink-0">
                    [LOCKED]
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
