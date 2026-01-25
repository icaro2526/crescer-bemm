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
      "Choro muito dificil de acalmar por periodos longos.",
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
  unknown: "Faixa nao informada",
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
    return "Idade nao informada";
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
  const ageGroup = ageSummary?.isPrenatal
    ? "prenatal"
    : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? null
      : symptomsContentByGroup[ageGroup];

  const ageLabel = formatAgeLabel(ageInMonths);
  const groupLabel = ageGroupLabels[ageGroup];
  const profileName = profile?.name?.trim() || "Nao informado";

  const attentionItems = content ? content.attention.slice(0, 3) : [];
  const noDataMessage =
    "Cada crianca se desenvolve no seu proprio ritmo. Observe mudancas persistentes.";
  const introText =
    "Sintomas leves sao comuns na infancia. Observar com calma ajuda a entender o que a crianca pode estar passando.";
  const profileSummary = !profile
    ? "Perfil nao encontrado. O conteudo abaixo e geral."
    : ageGroup === "prenatal"
      ? "Perfil em gestacao. Este conteudo fica disponivel apos o nascimento."
      : `Crianca: ${profileName}. Idade: ${ageLabel}. Faixa etaria: ${groupLabel}.`;

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Sintomas</h1>
        <p className="text-sm text-zinc-500">
          Orientacao pratica para observar sinais do dia a dia com calma e
          clareza.
        </p>
      </div>

      <PlaceholderCard
        title="Introducao"
        description={introText}
      >
        <p className="mt-3 text-sm text-zinc-500">{profileSummary}</p>
      </PlaceholderCard>

      <PlaceholderCard title="O que observar em casa">
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Mudancas de comportamento, humor ou energia.</li>
          <li>Alteracoes no sono ou no apetite.</li>
          <li>Febre, tosse, coriza, vomito ou diarreia.</li>
          <li>Desconfortos recorrentes, como irritacao ou choro incomum.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="Sinais de atencao"
        description="Observe com calma e considere o contexto da rotina."
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
        title="Quando procurar ajuda"
        description="Orientacoes gerais para apoiar sua decisao."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Sintomas que nao melhoram com o tempo ou voltam sempre.</li>
          <li>Febre persistente que atrapalha a rotina.</li>
          <li>Mudancas intensas no comportamento ou na disposicao.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="Mensagem final"
        description="Observar, registrar e buscar orientacao quando necessario ja e um cuidado importante. Voce nao precisa fazer isso sozinho."
      />
    </section>
  );
}
