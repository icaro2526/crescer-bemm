import type { ChildProfile } from "@/features/child-profile/types";
import { calculateAgeSummary } from "@/features/child-profile/utils";
import { developmentStages } from "./data";
import type { DevelopmentStage } from "./data";

export function getAgeInMonths(profile: ChildProfile | null) {
  if (!profile?.birthDate) {
    return null;
  }

  const summary = calculateAgeSummary(profile.birthDate);
  if (summary?.isPrenatal) {
    return null;
  }

  return profile.ageInMonths ?? summary?.ageInMonths ?? null;
}

export function getCurrentStage(
  ageInMonths: number | null
): DevelopmentStage | null {
  if (ageInMonths === null) {
    return null;
  }

  const match = developmentStages.find(
    (stage) => ageInMonths >= stage.minMonths && ageInMonths <= stage.maxMonths
  );

  if (match) {
    return match;
  }

  if (ageInMonths > developmentStages[developmentStages.length - 1].maxMonths) {
    return developmentStages[developmentStages.length - 1];
  }

  return developmentStages[0];
}

export function buildPersonalizedStimulus(
  profile: ChildProfile | null
): string[] {
  const answers = profile?.answers;
  if (!answers) {
    return [];
  }

  const tips: string[] = [];

  const screenTime = answers.screenTimeDaily;
  if (screenTime) {
    if (screenTime.includes("2+") || screenTime.includes("1-2")) {
      tips.push("Equilibre telas com brincadeiras ativas e tempo ao ar livre.");
    } else {
      tips.push("Mantenha pausas regulares entre momentos com telas.");
    }
  }

  const bedtime = answers.sleepBedtime;
  if (bedtime) {
    if (bedtime === "After 10pm" || bedtime === "Varies") {
      tips.push(
        "Uma rotina de sono consistente ajuda no humor e na atencao."
      );
    }
  }

  const meals = answers.feedingMeals;
  if (meals) {
    if (meals === "Varies") {
      tips.push("Rotinas de refeicao previsiveis ajudam no apetite.");
    }
  }

  return tips;
}
