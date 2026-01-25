"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

type SymptomsContent = {
  summary: string;
  attention: string[];
  tips: string[];
};

const symptomsContentByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  SymptomsContent
> = {
  infant: {
    summary:
      "Nos primeiros meses, o corpo ainda esta se ajustando. Mudancas leves em sono, fome e humor sao comuns.",
    attention: [
      "Recusa constante de mamadas ou dificuldade para mamar.",
      "Menos fraldas molhadas do que o habitual.",
      "Choro muito dificil de acalmar por longos periodos.",
    ],
    tips: [
      "Observe o conjunto: sono, fome, energia e conforto.",
      "Anote quando as mudancas comecaram e o que ajuda a acalmar.",
      "Mantenha o ambiente calmo e ofereca pausas para descanso.",
    ],
  },
  toddler: {
    summary:
      "A crianca explora mais e pode ficar exposta a pequenos desconfortos. Mudancas de energia e apetite variam ao longo da semana.",
    attention: [
      "Pouca energia e pouco interesse em brincar por dias seguidos.",
      "Nao consegue manter liquidos ou alimentos simples.",
      "Sono muito diferente do habitual por varios dias.",
    ],
    tips: [
      "Ofereca liquidos em pequenas quantidades ao longo do dia.",
      "Mantenha rotina de descanso e alimentacao o mais regular possivel.",
      "Observe se algo piora ou melhora o desconforto.",
    ],
  },
  preschool: {
    summary:
      "A rotina fica mais definida e a crianca costuma explicar o que sente. Mudancas persistentes merecem atencao.",
    attention: [
      "Queixas frequentes que impedem brincar ou participar da rotina.",
      "Mudanca forte de humor ou desanimo por mais de um dia.",
      "Dificuldade para dormir ou acordar por causa de desconforto.",
    ],
    tips: [
      "Pergunte como ela se sente com linguagem simples.",
      "Inclua pausas tranquilas entre atividades.",
      "Registre quando os sinais aparecem para comparar depois.",
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

  const ageLabel = profile?.ageLabel ?? ageSummary?.ageLabel ?? "Idade nao informada";
  const groupLabel = ageGroupLabels[ageGroup];
  const profileName = profile?.name?.trim() || "Nao informado";
  const summaryText = content
    ? content.summary
    : ageGroup === "prenatal"
      ? "Conteudo de sintomas fica disponivel apos o nascimento."
      : "Sem dados suficientes para personalizar esta fase no momento.";

  const attentionItems = content ? content.attention.slice(0, 3) : [];
  const tipItems = content ? content.tips : [];

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Sintomas</h1>
        <p className="text-sm text-zinc-500">
          Apoio educativo para observar sinais do dia a dia com calma e clareza.
        </p>
      </div>

      <PlaceholderCard
        title="Resumo da fase"
        description={`Crianca: ${profileName}. Idade: ${ageLabel}. Faixa etaria: ${groupLabel}.`}
      />

      <PlaceholderCard title="O que observar nesta fase" description={summaryText} />

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
            Sem dados suficientes para destacar sinais agora. Cada crianca tem
            seu ritmo.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como acompanhar no dia a dia"
        description="Sugestoes simples e acolhedoras para a rotina."
      >
        {tipItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {tipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem sugestoes personalizadas agora. Observe o dia a dia com calma e
            mantenha a rotina o mais estavel possivel.
          </p>
        )}
      </PlaceholderCard>

      <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
        Cada crianca tem seu ritmo. Se algo preocupa de forma constante,
        converse com um profissional de saude de sua confianca.
      </div>
    </section>
  );
}
