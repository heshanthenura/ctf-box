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
    title: "Staging is Production",
    preview_description:
      "An admin-only endpoint trusts whatever role is in the JWT",
    difficulty: "MEDIUM",
    completed: false,
    tag: "web+crypto",
    flag: "PT{st4g1ng_1s_pr0ductn_r0le_tru5t_bug}",
  },
];

export { challenges };
export type { ChallengeType };
