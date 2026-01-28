"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

type SymptomsContent = {
  attention: string[];
};

const symptomsContentByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  SymptomsContent
> = {
  infant: {
    attention: [
      "Recusa constante de mamadas ou dificuldade para mamar.",
      "Poucas fraldas molhadas ao longo do dia.",
      "Choro dificil de acalmar por varios momentos do dia.",
    ],
  },
  toddler: {
    attention: [
      "Pouca energia e pouco interesse em brincar por dias seguidos.",
      "Nao consegue manter liquidos ou alimentos simples.",
      "Sono muito diferente do habitual por varios dias.",
    ],
  },
  preschool: {
    attention: [
      "Queixas frequentes que impedem brincar ou participar da rotina.",
      "Mudanca forte de humor ou desanimo por mais de um dia.",
      "Dificuldade para dormir ou acordar por causa de desconforto.",
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

export default function SymptomsPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = calculateAgeSummary(profile?.birthDate ?? "");
  const ageInMonths = profile?.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageGroup = isPrenatal ? "prenatal" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? null
      : symptomsContentByGroup[ageGroup];

  const hasProfile = Boolean(profile);
  const ageLabel = isPrenatal ? "Em gestacao" : formatAgeLabel(ageInMonths);
  const groupLabel = ageGroupLabels[ageGroup];
  const attentionItems = content ? content.attention.slice(0, 3) : [];
  const noDataMessage =
    "Cada crianca tem seu ritmo. Observe com calma, sem pressa, e anote o que voce percebe.";
  const introText =
    "Sinais sao observacoes do dia a dia. Eles ajudam a observar e organizar o que voce percebe, sem conclusoes ou rotulos.";
  const phaseSummary = !hasProfile
    ? "Sem perfil por enquanto. Se quiser, complete o perfil para ver a fase com mais clareza."
    : isPrenatal
      ? "Perfil em gestacao. Este conteudo fica disponivel apos o nascimento."
      : ageGroup === "unknown"
        ? "Fase a confirmar. Se preferir, revise a data de nascimento quando puder."
        : `Fase atual: ${groupLabel}. Idade aproximada: ${ageLabel}.`;

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Sintomas</h1>
        <p className="text-sm text-zinc-500">
          Apoio pratico para observar sinais do dia a dia com calma e organizar
          o que voce percebe.
        </p>
      </div>

      <PlaceholderCard
        title="Introducao"
        description={introText}
      />

      <PlaceholderCard
        title="Resumo da fase"
        description={phaseSummary}
      />

      <PlaceholderCard
        title="Atencoes para esta fase"
        description="Observacoes do dia a dia, sem alarmismo."
      >
        {attentionItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {attentionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            {noDataMessage}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="O que observar no dia a dia"
        description="Exemplos simples para ajudar a perceber o que muda."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Mudancas de comportamento, humor ou energia.</li>
          <li>Alteracoes no sono ou no apetite.</li>
          <li>Febre, tosse, coriza, vomito ou diarreia.</li>
          <li>Desconfortos recorrentes, como irritacao ou choro incomum.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="Como apoiar no dia a dia"
        description="Dicas simples para apoiar com mais tranquilidade."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Observe com calma e veja se algo muda com descanso ou colo.</li>
          <li>Ofereca agua e alimentos leves se a crianca aceitar.</li>
          <li>Mantenha a rotina simples e um ambiente tranquilo.</li>
          <li>Anote quando comecou, o que melhora e o que piora.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos tranquilos para seguir com confianca."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Continue observando com calma e registre o que notar.</li>
          <li>Use as outras areas do app como apoio no dia a dia.</li>
          <li>Se algo persistir, busque orientacao de confianca.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
