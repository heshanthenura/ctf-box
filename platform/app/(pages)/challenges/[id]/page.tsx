"use client";

import { useChallenges } from "@/app/context/ChallengesProvider";
import Link from "next/link";

export default function ChallengePage() {
  const { challenges } = useChallenges();

  return (
    <div className="bg-black text-emerald-500 min-h-screen w-dvw flex flex-col items-center font-mono">
      <nav className="border-b border-emerald-900/50 bg-black w-full flex flex-col items-center py-3">
        <div className="max-w-7xl w-full flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-wider text-emerald-400">
            root@ctf-box:~#
          </h1>

          <Link href="/">cd ..</Link>
        </div>
      </nav>
      <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"></div>
      </div>
    </div>
  );
}
