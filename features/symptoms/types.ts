export type AgeGroup = "unknown" | "prenatal" | "infant" | "toddler" | "preschool";

export type SymptomId =
  | "fever"
  | "cough"
  | "diarrhea"
  | "vomiting"
  | "runny-nose";

export type SymptomSectionKey =
  | "observe"
  | "common"
  | "monitor"
  | "warning"
  | "emergency";

export type AgeGroupContent = Partial<Record<AgeGroup, string[]>> & {
  default: string[];
};

export type SymptomContent = {
  title: string;
  shortDescription: string;
  alerts?: AgeGroupContent;
  sections: Record<SymptomSectionKey, AgeGroupContent>;
};
