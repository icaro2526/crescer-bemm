"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useChildProfile } from "@/features/child-profile/context";
import { onboardingSteps } from "@/features/child-profile/onboarding";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type Answers = Record<string, string>;

export default function OnboardingPage() {
  const router = useRouter();
  const { saveProfile } = useChildProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const steps = onboardingSteps;
  const step = steps[stepIndex];
  const totalSteps = steps.length;
  const currentValue = answers[step.id] ?? "";

  const ageSummary = useMemo(
    () => calculateAgeSummary(answers.birthDate ?? ""),
    [answers.birthDate]
  );

  const isInfoStep = step.type === "info";
  const isOptional = step.optional ?? isInfoStep;
  const isStepValid = isInfoStep
    ? true
    : isOptional || currentValue.trim().length > 0;

  const updateAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!isStepValid) {
      return;
    }

    const isLast = stepIndex === totalSteps - 1;
    if (!isLast) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    const now = new Date().toISOString();
    const profile = {
      name: (answers.childName ?? "").trim(),
      birthDate: answers.birthDate ?? "",
      gender: answers.gender || undefined,
      weightKg: answers.weightKg || undefined,
      ageLabel: ageSummary?.ageLabel,
      ageInMonths: ageSummary?.ageInMonths ?? undefined,
      answers,
      createdAt: now,
      updatedAt: now,
    };

    saveProfile(profile);
    router.replace("/");
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 py-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Question {stepIndex + 1} of {totalSteps}
        </p>
        <h1 className="text-2xl font-semibold">{step.section}</h1>
        <p className="text-sm text-zinc-500">
          You will answer {totalSteps} quick questions. This is for
          personalization only and does not provide medical advice or diagnosis.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">
          {step.label}
        </label>

        {step.type === "text" && (
          <input
            type="text"
            value={currentValue}
            placeholder={step.placeholder}
            onChange={(event) => updateAnswer(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        )}

        {step.type === "date" && (
          <input
            type="date"
            value={currentValue}
            onChange={(event) => updateAnswer(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        )}

        {step.type === "number" && (
          <input
            type="number"
            inputMode="decimal"
            value={currentValue}
            placeholder={step.placeholder}
            onChange={(event) => updateAnswer(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
        )}

        {step.type === "select" && (
          <select
            value={currentValue}
            onChange={(event) => updateAnswer(event.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          >
            <option value="">Select an option</option>
            {step.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {step.type === "info" && (
          <div className="rounded-md border border-dashed border-zinc-300 px-3 py-3 text-sm text-zinc-600">
            {ageSummary?.ageLabel ??
              "Add a birth date to calculate the current age."}
          </div>
        )}

        {step.optional && (
          <p className="text-xs text-zinc-400">Optional</p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isStepValid}
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {stepIndex === totalSteps - 1 ? "Save profile" : "Continue"}
        </button>
      </div>
    </div>
  );
}
