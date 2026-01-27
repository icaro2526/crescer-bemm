"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

type RoutineContent = {
  summary: string;
  observe: string[];
  tips: string[];
};

const routineContentByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  RoutineContent
> = {
  infant: {
    summary:
      "Nos primeiros meses, a rotina se organiza aos poucos e pode mudar de semana para semana.",
    observe: [
      "Horarios de sono e fome variam bastante.",
      "Momentos curtos de alerta ao longo do dia.",
      "Necessidade de colo e contato frequente.",
      "Sinais de cansaco que aparecem rapido.",
    ],
    tips: [
      "Mantenha uma ordem parecida ao acordar, mamar e dormir.",
      "Reduza luz e barulho perto do horario de descanso.",
      "Crie um ritual curto antes de dormir.",
    ],
  },
  toddler: {
    summary:
      "Com mais autonomia, a crianca se beneficia de transicoes suaves e repeticao.",
    observe: [
      "Resistencia ao trocar de atividade.",
      "Busca por fazer coisas sozinha.",
      "Horarios de sono e refeicoes mais previsiveis.",
      "Necessidade de lembrar combinados simples.",
    ],
    tips: [
      "Avise antes de mudar de atividade e use frases curtas.",
      "Ofereca escolhas simples para dar autonomia.",
      "Mantenha horarios parecidos para comer e dormir.",
    ],
  },
  preschool: {
    summary:
      "A rotina fica mais clara e a crianca gosta de participar das combinacoes.",
    observe: [
      "Quer escolher pequenas tarefas do dia.",
      "Se beneficia de avisos antes das transicoes.",
      "Horarios regulares ajudam no humor.",
      "Momento de brincar e descansar ficam mais separados.",
    ],
    tips: [
      "Combine regras simples e repita com paciencia.",
      "Inclua a crianca em pequenas tarefas da casa.",
      "Mantenha um horario consistente para dormir.",
    ],
  },
};

const ageGroupLabels: Record<AgeGroup, string> = {
  infant: "0-11 meses",
  toddler: "1-3 anos",
  preschool: "3-5 anos",
  prenatal: "Gestacao",
  unknown: "Fase a confirmar",
};

function getAgeGroup(ageInMonths: number | null): AgeGroup {
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

function formatAgeLabel(ageInMonths: number | null) {
  if (ageInMonths === null) {
    return "Idade a confirmar";
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

export default function RoutinesPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = calculateAgeSummary(profile?.birthDate ?? "");
  const ageInMonths = profile?.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageGroup = isPrenatal ? "prenatal" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? null
      : routineContentByGroup[ageGroup];

  const hasProfile = Boolean(profile);
  const ageLabel = isPrenatal ? "Em gestacao" : formatAgeLabel(ageInMonths);
  const groupLabel = ageGroupLabels[ageGroup];
  const observeDescription = content
    ? content.summary
    : isPrenatal
      ? "O conteudo de rotinas fica disponivel apos o nascimento."
      : hasProfile
        ? "Ainda nao foi possivel identificar a fase. Use observacoes gerais por enquanto."
        : "Sem perfil por enquanto. Se quiser, complete para ver a fase atual.";

  const observeItems = content ? content.observe : [];
  const tipItems = content ? content.tips : [];
  const observeFallback =
    "Rotinas se constroem aos poucos. Pequenos combinados ja fazem diferenca.";
  const tipsFallback =
    "Comece com um passo simples e repita por alguns dias, com flexibilidade.";

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Rotinas</h1>
        <p className="text-sm text-zinc-500">
          Rotinas trazem previsibilidade e conforto, mas podem ser flexiveis.
          Pequenos combinados deixam o dia a dia mais leve.
        </p>
      </div>

      <PlaceholderCard
        title="Resumo da fase"
        description={
          hasProfile && !isPrenatal && content
            ? `${observeDescription} Fase atual: ${groupLabel}. Idade aproximada: ${ageLabel}.`
            : observeDescription
        }
      >
        {observeItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {observeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{observeFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como apoiar no dia a dia"
        description="Dicas praticas para aplicar aos poucos, com flexibilidade."
      >
        {tipItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {tipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{tipsFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos simples e acionaveis."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Escolha dois momentos fixos do dia, como acordar e dormir.</li>
          <li>Observe por alguns dias o que funciona melhor.</li>
          <li>Ajuste aos poucos e busque orientacao se precisar.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
