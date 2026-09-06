interface ChallengeType {
  id: number;
  title: string;
  preview_description: string;
  difficulty: string;
  completed: boolean;
  tag: string;
}

const challenges: ChallengeType[] = [
  {
    id: 1,
    title: "Test",
    preview_description: "Description",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
  },
  {
    id: 2,
    title: "Test",
    preview_description: "asd",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
  },
  {
    id: 3,
    title: "Test",
    preview_description: "Description",
    difficulty: "EASY",
    completed: false,
    tag: "Tag",
  },
  {
    id: 4,
    preview_description: "Description",
    difficulty: "EASY",
    completed: false,
    title: "Test",
    tag: "Tag",
  },
];

export { challenges };
export type { ChallengeType };
