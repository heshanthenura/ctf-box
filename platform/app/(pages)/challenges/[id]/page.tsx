"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChallenges } from "@/app/context/ChallengesProvider";

export default function ChallengePage() {
  const params = useParams();

  const { challenges, completeChallenge } = useChallenges();

  const [flagInput, setFlagInput] = useState("");

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [markdown, setMarkdown] = useState("");
  const [markdownLoading, setMarkdownLoading] = useState(true);
  const [markdownError, setMarkdownError] = useState(false);

  const challengeId = Number(params.id);

  const challengeIndex = challenges.findIndex(
    (challenge) => challenge.id === challengeId,
  );

  const challenge = challenges[challengeIndex];

  useEffect(() => {
    if (!challenge) return;

    const loadMarkdown = async () => {
      try {
        setMarkdownLoading(true);
        setMarkdownError(false);

        const response = await fetch(`/challenges/${challenge.id}.md`);

        if (!response.ok) {
          throw new Error("Markdown file not found");
        }

        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error("Failed to load challenge Markdown:", error);
        setMarkdownError(true);
      } finally {
        setMarkdownLoading(false);
      }
    };

    loadMarkdown();
  }, [challenge]);

  if (!challenge) {
    return (
      <div className="bg-black text-emerald-500 min-h-screen w-dvw flex flex-col items-center font-mono">
        <nav className="border-b border-emerald-900/50 bg-black w-full flex flex-col items-center py-3">
          <div className="max-w-7xl w-full flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold tracking-wider text-emerald-400">
              root@ctf-box:~#
            </h1>

            <Link
              href="/"
              className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 py-1 px-3 transition-colors"
            >
              cd ..
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6 justify-center">
          <p className="text-xs text-red-500">
            Error: Challenge not found or connection lost.
          </p>
        </div>
      </div>
    );
  }

  const isUnlocked =
    challengeIndex === 0 || challenges[challengeIndex - 1].completed;

  if (!isUnlocked) {
    return (
      <div className="bg-black text-emerald-500 min-h-screen w-dvw flex flex-col items-center font-mono">
        <nav className="border-b border-emerald-900/50 bg-black w-full flex flex-col items-center py-3">
          <div className="max-w-7xl w-full flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold tracking-wider text-emerald-400">
              root@ctf-box:~/challenges/{challenge.id}#
            </h1>

            <Link
              href="/"
              className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 py-1 px-3 transition-colors"
            >
              cd ..
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6 justify-center">
          <div className="border border-emerald-950 bg-black p-6 max-w-md w-full flex flex-col items-center gap-4 text-center">
            <p className="text-xs text-emerald-800">[ACCESS_DENIED]</p>

            <p className="text-xs text-emerald-600/80">
              Error: Previous stage must be completed before accessing this
              sector.
            </p>

            <Link
              href="/"
              className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 py-2 px-4 transition-colors mt-2"
            >
              cd ..
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (challenge.completed) {
      setMessage({
        text: "Notice: Challenge already solved. Flag submission ignored.",
        type: "info",
      });

      return;
    }

    if (flagInput.trim() === challenge.flag) {
      completeChallenge(challenge.id);

      setMessage({
        text: "Success: Correct flag! Challenge marked as [SOLVED].",
        type: "success",
      });

      setFlagInput("");
    } else {
      setMessage({
        text: "Error: Incorrect flag. Access denied.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-black text-emerald-500 min-h-screen w-dvw flex flex-col items-center font-mono">
      <nav className="border-b border-emerald-900/50 bg-black w-full flex flex-col items-center py-3">
        <div className="max-w-7xl w-full flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-wider text-emerald-400">
            root@ctf-box:~/challenges/{challenge.id}#
          </h1>

          <Link
            href="/"
            className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 py-1 px-3 transition-colors"
          >
            cd ..
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6">
        <div
          className={`border bg-black p-6 max-w-2xl w-full flex flex-col gap-4 relative ${
            challenge.completed
              ? "border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              : "border-emerald-900/60"
          }`}
        >
          <div className="flex items-start justify-between gap-2 border-b border-emerald-900/40 pb-4">
            <div>
              <h1 className="text-sm font-bold text-emerald-400 mb-1">
                $ ./&lt;{challenge.title.toLowerCase()}&gt;
              </h1>
            </div>

            <span className="text-[10px] text-emerald-600 shrink-0 border border-emerald-900/60 px-2 py-1">
              [{challenge.tag}]
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-600/70">
            <span>&gt; diff: {challenge.difficulty.toLowerCase()}</span>

            <span
              className={
                challenge.completed
                  ? "text-emerald-400 font-bold"
                  : "text-emerald-700"
              }
            >
              status: {challenge.completed ? "[SOLVED]" : "[UNSOLVED]"}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 pt-2 border-t border-emerald-900/40"
          >
            <label className="text-[10px] text-emerald-600">
              &gt; submit_flag:
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="FLAG{...}"
                disabled={challenge.completed}
                className="flex-1 bg-black border border-emerald-900/60 px-3 py-2 text-xs text-emerald-400 placeholder:text-emerald-800 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={challenge.completed}
                className="text-xs border border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/60 py-2 px-4 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                submit
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`text-xs p-2 border ${
                message.type === "success"
                  ? "border-emerald-500 text-emerald-400 bg-emerald-950/20"
                  : message.type === "error"
                    ? "border-red-900 text-red-500 bg-red-950/20"
                    : "border-emerald-900/60 text-emerald-400 bg-emerald-950/10"
              }`}
            >
              &gt; {message.text}
            </div>
          )}

          <div className="border-t border-emerald-900/40 pt-4 text-emerald-400/90 leading-relaxed">
            {markdownLoading ? (
              <p className="text-xs text-emerald-700">
                &gt; loading challenge data...
              </p>
            ) : markdownError ? (
              <p className="text-xs text-red-500">
                &gt; Error: Unable to load challenge content.
              </p>
            ) : (
              <div className="text-xs space-y-3 [&_h1]:text-emerald-300 [&_h1]:font-bold [&_h2]:text-emerald-300 [&_h2]:font-bold [&_h3]:text-emerald-300 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_code]:bg-emerald-950/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:border [&_code]:border-emerald-900/60 [&_pre]:bg-emerald-950/20 [&_pre]:p-3 [&_pre]:border [&_pre]:border-emerald-900/60 [&_pre]:overflow-x-auto [&_a]:text-emerald-400 [&_a]:underline">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
