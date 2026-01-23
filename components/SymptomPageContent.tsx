"use client";

import { useMemo } from "react";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { symptomContent } from "@/features/symptoms/content";
import {
  buildPersonalizedNotes,
  getAgeGroup,
  getAgeGroupLabel,
} from "@/features/symptoms/logic";
import type {
  AgeGroup,
  AgeGroupContent,
  SymptomId,
  SymptomSectionKey,
} from "@/features/symptoms/types";

const sectionTitles: Record<SymptomSectionKey, string> = {
  observe: "What to observe",
  common: "Common non-diagnostic explanations",
  monitor: "Safe monitoring guidance",
  warning: "Warning signs to seek medical help",
  emergency: "Emergency red flags",
};

function getSectionItems(group: AgeGroup, content: AgeGroupContent) {
  return content[group] ?? content.default;
}

type SymptomPageContentProps = {
  symptomId: SymptomId;
};

export default function SymptomPageContent({
  symptomId,
}: SymptomPageContentProps) {
  const { profile } = useChildProfile();
  const content = symptomContent[symptomId];

  const ageGroup = useMemo(() => getAgeGroup(profile), [profile]);
  const ageLabel =
    profile?.ageLabel ||
    (ageGroup === "unknown" ? "Age not set" : getAgeGroupLabel(ageGroup));
  const personalizedNotes = useMemo(
    () => buildPersonalizedNotes(profile?.answers),
    [profile?.answers]
  );
  const isProfileMissing = !profile;
  const isPrenatal = ageGroup === "prenatal";
  const alerts =
    content.alerts && !isProfileMissing && !isPrenatal
      ? getSectionItems(ageGroup, content.alerts)
      : [];
  const fallbackItem = isPrenatal
    ? "Guidance will appear after birth."
    : "Complete onboarding to personalize this section.";

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{content.title}</h1>
        <p className="text-sm text-zinc-500">
          {content.shortDescription} This content is for education and safety
          awareness only.
        </p>
      </div>

      <PlaceholderCard
        title="Personalized context"
        description={`Age group: ${ageLabel}. This uses your child profile to tailor guidance.`}
      >
        {isPrenatal && (
          <p className="mt-2 text-xs text-zinc-500">
            Symptom guidance is focused on children ages 0-5. Update the profile
            after birth to personalize this section.
          </p>
        )}
        {!isPrenatal && personalizedNotes.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-zinc-500">
            {personalizedNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
        {!isPrenatal && personalizedNotes.length === 0 && (
          <p className="mt-2 text-xs text-zinc-500">
            Add routines and screen time details during onboarding to
            personalize this section.
          </p>
        )}
      </PlaceholderCard>

      {alerts.length > 0 && (
        <PlaceholderCard
          title="Age-specific alerts"
          description="These alerts are shown based on the age group."
          className="border-zinc-400"
        >
          <ul className="mt-2 space-y-1 text-xs text-zinc-600">
            {alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </PlaceholderCard>
      )}

      <div className="grid gap-4">
        {(Object.keys(sectionTitles) as SymptomSectionKey[]).map((key) => {
          const items =
            isPrenatal || isProfileMissing
              ? [fallbackItem]
              : getSectionItems(ageGroup, content.sections[key]);
          return (
            <PlaceholderCard
              key={key}
              title={sectionTitles[key]}
              description="Placeholder guidance will be refined later."
            >
              <ul className="mt-2 space-y-1 text-xs text-zinc-500">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PlaceholderCard>
          );
        })}
      </div>
    </section>
  );
}
