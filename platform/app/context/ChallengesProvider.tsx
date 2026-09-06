"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import {
  challenges as initialChallenges,
  type ChallengeType,
} from "@/app/libs/challenges";

interface ChallengesContextType {
  challenges: ChallengeType[];
  completeChallenge: (id: number) => void;
}

const ChallengesContext = createContext<ChallengesContextType | undefined>(
  undefined,
);

export function ChallengesProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] =
    useState<ChallengeType[]>(initialChallenges);

  const completeChallenge = (id: number) => {
    setChallenges((current) =>
      current.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: true } : challenge,
      ),
    );
  };
  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  const context = useContext(ChallengesContext);
  if (context === undefined) {
    throw new Error("useChallenges must be used inside ChallengesProvider");
  }
  return context;
}
