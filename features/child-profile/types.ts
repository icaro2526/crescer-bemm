export type ChildProfile = {
  name: string;
  birthDate: string;
  gender?: string;
  weightKg?: string;
  ageLabel?: string;
  ageInMonths?: number;
  answers: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type AgeSummary = {
  ageLabel: string;
  ageInMonths: number | null;
  isPrenatal: boolean;
};
