import type { AgeSummary } from "./types";

export function calculateAgeSummary(
  birthDateIso: string,
  now: Date = new Date()
): AgeSummary | null {
  if (!birthDateIso) {
    return null;
  }

  const birthDate = new Date(birthDateIso);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birth = new Date(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (birth > today) {
    const diffMs = birth.getTime() - today.getTime();
    const weeks = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24 * 7)));
    const ageLabel = weeks > 0 ? `Expected in ${weeks} weeks` : "Expected soon";

    return {
      ageLabel,
      ageInMonths: null,
      isPrenatal: true,
    };
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const ageInMonths = years * 12 + months;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} year${years === 1 ? "" : "s"}`);
  }

  if (months > 0 || years === 0) {
    parts.push(`${months} month${months === 1 ? "" : "s"}`);
  }

  return {
    ageLabel: parts.join(" "),
    ageInMonths,
    isPrenatal: false,
  };
}
