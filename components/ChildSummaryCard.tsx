import type { ChildProfile } from "@/features/child-profile/types";

type ChildSummaryCardProps = {
  profile: ChildProfile | null;
};

function formatDate(value: string) {
  if (!value) {
    return "Not provided";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ChildSummaryCard({ profile }: ChildSummaryCardProps) {
  if (!profile) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-4">
        <p className="text-sm font-medium text-zinc-700">Child summary</p>
        <p className="mt-2 text-xs text-zinc-500">
          Complete onboarding to see the profile summary here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <p className="text-sm font-medium text-zinc-700">Child summary</p>
      <div className="mt-2 space-y-1 text-xs text-zinc-600">
        <p>Name: {profile.name || "Not provided"}</p>
        <p>Birth date: {formatDate(profile.birthDate)}</p>
        <p>Current age: {profile.ageLabel || "Not available"}</p>
        <p>Gender: {profile.gender || "Not provided"}</p>
        <p>Weight: {profile.weightKg ? `${profile.weightKg} kg` : "Not provided"}</p>
      </div>
    </div>
  );
}
