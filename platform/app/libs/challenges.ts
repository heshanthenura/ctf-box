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
    title: "Deleted, Not Gone",
    preview_description: "Found a public repo of an employee",
    difficulty: "EASY",
    completed: false,
    tag: "forensics",
    flag: "PT{d3l3t3d_n0t_g0n3_8f3a91c2}",
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
  {
    id: 3,
    title: "Inject, Not Vaccine",
    preview_description: "The login portal trusts whatever shape the query takes",
    difficulty: "MEDIUM",
    completed: false,
    tag: "nosqli",
    flag: "PT{n0sql_1nj3ct10n_byp4ss3d_4uth}",
  },
];

export { challenges };
export type { ChallengeType };
