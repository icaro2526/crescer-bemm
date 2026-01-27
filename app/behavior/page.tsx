"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

type BehaviorContent = {
  summary: string;
  expected: string[];
  attention: string[];
  tips: string[];
};

const behaviorContentByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  BehaviorContent
> = {
  infant: {
    summary:
      "Nos primeiros meses, o comportamento muda rapido. Choro, sono e busca por colo variam bastante.",
    expected: [
      "Busca colo e contato com mais frequencia.",
      "Choro em diferentes tons para comunicar necessidades.",
      "Momentos curtos de alerta e curiosidade.",
      "Reage a vozes e a rostos conhecidos.",
    ],
    attention: [
      "Pouca reacao a vozes ou ao contato.",
      "Choro dificil de acalmar por longos periodos.",
      "Pouco interesse em olhar para pessoas.",
    ],
    tips: [
      "Rotina simples e previsivel ajuda a acalmar.",
      "Responda com voz tranquila e toque gentil.",
      "Observe sinais de sono e fome para evitar irritacao.",
    ],
  },
  toddler: {
    summary:
      "Com mais autonomia, a crianca explora e testa limites. Birras curtas podem acontecer.",
    expected: [
      "Birras quando se frustra ou quer algo.",
      "Exploracao constante de objetos e ambientes.",
      "Diz 'nao' com frequencia para afirmar vontade.",
      "Busca atencao do cuidador com gestos e fala.",
    ],
    attention: [
      "Birras muito longas e frequentes, com dificuldade para se acalmar.",
      "Pouca interacao ou interesse em brincar com adultos.",
      "Mudanca brusca de comportamento por varios dias.",
    ],
    tips: [
      "Antecipe transicoes e avise antes de mudar de atividade.",
      "Ofereca escolhas simples para dar autonomia.",
      "Mantenha regras curtas e consistentes.",
    ],
  },
  preschool: {
    summary:
      "A comunicacao e a imaginacao crescem. A crianca busca autonomia e pode testar regras.",
    expected: [
      "Faz perguntas e conta pequenas historias.",
      "Brinca de faz de conta e imita adultos.",
      "Quer fazer as coisas sozinha quando pode.",
      "Procura amigos ou brinca ao lado de outras criancas.",
    ],
    attention: [
      "Dificuldade constante para participar de brincadeiras.",
      "Mudancas fortes de humor que atrapalham a rotina.",
      "Reacoes fisicas frequentes, como empurrar ou bater.",
    ],
    tips: [
      "Regras simples e combinados claros ajudam no dia a dia.",
      "Reforce comportamentos positivos com elogios especificos.",
      "Reserve momentos curtos de atencao exclusiva.",
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

export default function BehaviorPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = calculateAgeSummary(profile?.birthDate ?? "");
  const ageInMonths = profile?.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageGroup = isPrenatal ? "prenatal" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? null
      : behaviorContentByGroup[ageGroup];

  const hasProfile = Boolean(profile);
  const ageLabel = isPrenatal ? "Em gestacao" : formatAgeLabel(ageInMonths);
  const groupLabel = ageGroupLabels[ageGroup];
  const summaryText = content
    ? content.summary
    : isPrenatal
      ? "O conteudo de comportamento fica disponivel apos o nascimento."
      : "Cada crianca tem seu ritmo. Use este resumo como apoio no dia a dia.";
  const profileText = !hasProfile
    ? "Sem perfil por enquanto. Se quiser, complete para ver a fase atual."
    : isPrenatal
      ? "Perfil em gestacao. Este conteudo aparece apos o nascimento."
      : `Fase atual: ${groupLabel}. Idade aproximada: ${ageLabel}.`;

  const expectedItems = content ? content.expected.slice(0, 5) : [];
  const attentionItems = content ? content.attention.slice(0, 3) : [];
  const tipsItems = content ? content.tips : [];
  const expectedFallback =
    "Comportamentos variam bastante. Observe com calma e valorize pequenos avancos.";
  const attentionFallback =
    "Por enquanto, observe com calma. Pequenas mudancas fazem parte do dia a dia.";
  const tipsFallback =
    "Rotinas simples e previsiveis ajudam bastante no dia a dia.";

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Comportamento</h1>
        <p className="text-sm text-zinc-500">
          Orientacao pratica e acolhedora para o dia a dia da familia.
        </p>
      </div>

      <PlaceholderCard title="Resumo da fase" description={summaryText}>
        <p className="mt-3 text-sm text-zinc-500">{profileText}</p>
      </PlaceholderCard>

      <PlaceholderCard title="Comportamentos esperados">
        {expectedItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {expectedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{expectedFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Atencoes para esta fase"
        description="Observacoes do dia a dia, sem rotulos."
      >
        {attentionItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {attentionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{attentionFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como apoiar no dia a dia"
        description="Dicas simples, com foco em rotina e vinculo."
      >
        {tipsItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {tipsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{tipsFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos simples para seguir com tranquilidade."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Observe padroes por alguns dias e anote o que ajuda.</li>
          <li>Ajuste a rotina com horarios e combinados simples.</li>
          <li>Se a preocupacao persistir, busque orientacao de confianca.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
