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
      <div className="bg-zinc-950 text-zinc-100 min-h-screen w-full flex flex-col items-center font-mono overflow-x-hidden selection:bg-zinc-100 selection:text-zinc-950">
        <nav className="border-b border-zinc-800 bg-zinc-950 w-full flex flex-col items-center py-3">
          <div className="max-w-7xl w-full flex items-center justify-between px-6">
            <h1 className="text-sm font-semibold tracking-wider text-zinc-200">
              root@ctf-box:~#
            </h1>

            <Link
              href="/"
              className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 py-1 px-3 transition-colors"
            >
              cd ..
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6 justify-center">
          <p className="text-xs text-red-400">
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
      <div className="bg-zinc-950 text-zinc-100 min-h-screen w-full flex flex-col items-center font-mono overflow-x-hidden selection:bg-zinc-100 selection:text-zinc-950">
        <nav className="border-b border-zinc-800 bg-zinc-950 w-full flex flex-col items-center py-3">
          <div className="max-w-7xl w-full flex items-center justify-between px-6">
            <h1 className="text-sm font-semibold tracking-wider text-zinc-200">
              root@ctf-box:~/challenges/{challenge.id}#
            </h1>

            <Link
              href="/"
              className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 py-1 px-3 transition-colors"
            >
              cd ..
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6 justify-center">
          <div className="border border-zinc-800 bg-zinc-950 p-6 max-w-md w-full flex flex-col items-center gap-4 text-center">
            <p className="text-xs text-zinc-500">[ACCESS_DENIED]</p>

            <p className="text-xs text-zinc-400">
              Error: Previous stage must be completed before accessing this
              sector.
            </p>

            <Link
              href="/"
              className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 py-2 px-4 transition-colors mt-2"
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
    <div className="bg-zinc-950 text-zinc-100 min-h-screen w-full flex flex-col items-center font-mono overflow-x-hidden selection:bg-zinc-100 selection:text-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-950 w-full flex flex-col items-center py-3">
        <div className="max-w-7xl w-full flex items-center justify-between px-6">
          <h1 className="text-sm font-semibold tracking-wider text-zinc-200">
            root@ctf-box:~/challenges/{challenge.id}#
          </h1>

          <Link
            href="/"
            className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 py-1 px-3 transition-colors"
          >
            cd ..
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl w-full flex flex-col items-center flex-1 p-6">
        <div
          className={`border bg-zinc-950 p-6 max-w-2xl w-full flex flex-col gap-4 relative min-w-0 ${
            challenge.completed
              ? "border-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              : "border-zinc-800"
          }`}
        >
          <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <h1 className="text-sm font-bold text-zinc-200 mb-1">
                $ ./&lt;{challenge.title.toLowerCase()}&gt;
              </h1>
            </div>

            <span className="text-[10px] text-zinc-500 shrink-0 border border-zinc-800 px-2 py-1">
              [{challenge.tag}]
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>&gt; diff: {challenge.difficulty.toLowerCase()}</span>

            <span
              className={
                challenge.completed
                  ? "text-zinc-100 font-bold"
                  : "text-zinc-400"
              }
            >
              status: {challenge.completed ? "[SOLVED]" : "[UNSOLVED]"}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 pt-2 border-t border-zinc-800"
          >
            <label className="text-[10px] text-zinc-500">
              &gt; submit_flag:
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="FLAG{...}"
                disabled={challenge.completed}
                className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={challenge.completed}
                className="text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-900 py-2 px-4 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                submit
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`text-xs p-2 border break-words ${
                message.type === "success"
                  ? "border-zinc-400 text-zinc-200 bg-zinc-900/40"
                  : message.type === "error"
                    ? "border-red-900 text-red-400 bg-red-950/20"
                    : "border-zinc-800 text-zinc-300 bg-zinc-900/20"
              }`}
            >
              &gt; {message.text}
            </div>
          )}

          <div className="border-t border-zinc-800 pt-4 text-zinc-300 leading-relaxed min-w-0">
            {markdownLoading ? (
              <p className="text-xs text-zinc-600">
                &gt; loading challenge data...
              </p>
            ) : markdownError ? (
              <p className="text-xs text-red-400">
                &gt; Error: Unable to load challenge content.
              </p>
            ) : (
              <div
                className="text-xs space-y-3 min-w-0 break-words
                  [&_h1]:text-zinc-100 [&_h1]:font-bold
                  [&_h2]:text-zinc-100 [&_h2]:font-bold
                  [&_h3]:text-zinc-200
                  [&_ul]:list-disc [&_ul]:pl-4
                  [&_ol]:list-decimal [&_ol]:pl-4
                  [&_p]:break-words
                  [&_code]:bg-zinc-900 [&_code]:px-1 [&_code]:py-0.5 [&_code]:border [&_code]:border-zinc-800 [&_code]:break-words [&_code]:whitespace-pre-wrap
                  [&_pre]:bg-zinc-900/60 [&_pre]:p-3 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:overflow-x-auto [&_pre]:max-w-full
                  [&_pre_code]:whitespace-pre [&_pre_code]:break-normal [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0
                  [&_a]:text-zinc-300 [&_a]:underline [&_a]:break-all
                  [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full [&_table]:whitespace-nowrap"
              >
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
