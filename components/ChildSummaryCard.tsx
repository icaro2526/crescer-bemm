import type { ChildProfile } from "@/features/child-profile/types";

type ChildSummaryCardProps = {
  profile: ChildProfile | null;
};

function formatAgeLabel(ageInMonths: number | undefined) {
  if (ageInMonths === undefined) {
    return "A confirmar";
  }

  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ano${years === 1 ? "" : "s"}`);
  }

  if (months > 0 || years === 0) {
    parts.push(`${months} mes${months === 1 ? "" : "es"}`);
  }

  return parts.join(" e ");
}

function formatGender(value: string | undefined) {
  if (!value) {
    return "Nao informado";
  }

  const normalized = value.toLowerCase();
  if (normalized === "female") {
    return "Feminino";
  }
  if (normalized === "male") {
    return "Masculino";
  }
  if (normalized === "another") {
    return "Outro";
  }
  if (normalized === "prefer not to say") {
    return "Prefere nao dizer";
  }

  return value;
}

function formatDate(value: string) {
  if (!value) {
    return "Nao informado";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ChildSummaryCard({ profile }: ChildSummaryCardProps) {
  if (!profile) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-4">
        <p className="text-sm font-medium text-zinc-700">Resumo da crianca</p>
        <p className="mt-2 text-xs text-zinc-500">
          Quando quiser, preencha o perfil para ver o resumo aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <p className="text-sm font-medium text-zinc-700">Resumo da crianca</p>
      <div className="mt-2 space-y-1 text-xs text-zinc-600">
        <p>Nome: {profile.name || "Nao informado"}</p>
        <p>Data de nascimento: {formatDate(profile.birthDate)}</p>
        <p>Idade atual: {formatAgeLabel(profile.ageInMonths)}</p>
        <p>Genero: {formatGender(profile.gender)}</p>
        <p>
          Peso: {profile.weightKg ? `${profile.weightKg} kg` : "Nao informado"}
        </p>
      </div>
    </div>
  );
}
