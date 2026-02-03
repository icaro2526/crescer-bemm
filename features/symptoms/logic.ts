import type { ChildProfile } from "@/features/child-profile/types";
import { calculateAgeSummary } from "@/features/child-profile/utils";
import type { AgeGroup } from "./types";

export function getAgeGroup(profile: ChildProfile | null): AgeGroup {
  if (!profile) {
    return "unknown";
  }

  const ageSummary = calculateAgeSummary(profile.birthDate);
  if (ageSummary?.isPrenatal) {
    return "prenatal";
  }

  const ageInMonths = profile.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  if (ageInMonths === null) {
    return "unknown";
  }

  if (ageInMonths < 12) {
    return "infant";
  }

  if (ageInMonths < 36) {
    return "toddler";
  }

  if (ageInMonths <= 71) {
    return "preschool";
  }

  return "unknown";
}

export function getAgeGroupLabel(group: AgeGroup) {
  switch (group) {
    case "prenatal":
      return "Pregnancy (not yet born)";
    case "infant":
      return "0-11 months";
    case "toddler":
      return "1-3 years";
    case "preschool":
      return "3-5 years";
    default:
      return "Age not set";
  }
}

export function buildPersonalizedNotes(
  answers: Record<string, string> | undefined
) {
  if (!answers) {
    return [];
  }

  const notes: string[] = [];
  const screenTime = answers.screenTimeDaily;
  const sleepBedtime = answers.sleepBedtime;
  const feedingMeals = answers.feedingMeals;

  if (screenTime) {
    notes.push(`Screen time reported: ${screenTime}.`);
    if (screenTime.includes("2+")) {
      notes.push(
        "If symptoms appear after longer screen sessions, note the timing."
      );
    }
  }

  if (sleepBedtime) {
    notes.push(`Typical bedtime: ${sleepBedtime}.`);
    if (sleepBedtime === "After 10pm" || sleepBedtime === "Varies") {
      notes.push(
        "Track if symptoms feel worse after late or inconsistent sleep."
      );
    }
  }

  if (feedingMeals) {
    notes.push(`Meals per day: ${feedingMeals}.`);
    if (feedingMeals === "Varies") {
      notes.push("Changes in routine can affect how symptoms show up.");
    }
  }

  return notes;
}
