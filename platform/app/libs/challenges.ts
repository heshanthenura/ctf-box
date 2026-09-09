interface ChallengeType {
  id: number;
  title: string;
  preview_description: string;
  difficulty: string;
  completed: boolean;
  tag: string;
  flag: string;
}

const challenges: ChallengeType[] = [
  {
    id: 1,
    title: "Public Repo",
    preview_description: "Found a public repo of an employee",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
    flag: "CTF{a7Kp9xQ2mL4vR8tN}",
  },
  {
    id: 2,
    title: "Test",
    preview_description: "asd",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
    flag: "CTF{aTKjs9xQ2amL4davR8tN}",
  },
  {
    id: 3,
    title: "Test",
    preview_description: "Description",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
    flag: "FLAG{test}",
  },
  {
    id: 4,
    preview_description: "Description",
    difficulty: "EASY",
    completed: false,
    title: "Test",
    tag: "Tag",
    flag: "FLAG{test}",
  },
];

export { challenges };
export type { ChallengeType };
