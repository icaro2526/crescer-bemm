"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";

type AgeGroup = "infant" | "toddler" | "preschool" | "unknown";

type NutritionContent = {
  header: string;
  expected: string[];
  alerts: string[];
  tips: string[];
};

const nutritionContentByGroup: Record<
  Exclude<AgeGroup, "unknown">,
  NutritionContent
> = {
  infant: {
    header:
      "Nesta fase, a nutricao se organiza aos poucos, com sinais de fome e saciedade ficando mais claros.",
    expected: [
      "Leite como base da alimentacao.",
      "Pequenas porcoes em varios momentos do dia.",
      "Curiosidade por sabores e texturas quando introduzido.",
      "Dias com apetite variavel sao comuns.",
    ],
    alerts: [
      "Recusa alimentar frequente por varios dias.",
      "Pouca ingestao de liquidos ao longo do dia.",
      "Dificuldade constante para aceitar alimentos.",
    ],
    tips: [
      "Manter um momento calmo para as refeicoes.",
      "Oferecer variedades simples sem pressao.",
      "Observar sinais de fome e saciedade.",
    ],
  },
  toddler: {
    header:
      "O apetite pode oscilar bastante, e preferencias por alguns alimentos sao esperadas.",
    expected: [
      "Apetite com altos e baixos ao longo da semana.",
      "Preferencias marcadas por alguns alimentos.",
      "Maior autonomia para comer com as proprias maos.",
      "Lanches pequenos entre refeicoes.",
    ],
    alerts: [
      "Recusa total de grupos de alimentos por longos periodos.",
      "Refeicoes sempre com muita pressa e desconforto.",
      "Pouca ingestao de agua durante o dia.",
    ],
    tips: [
      "Repetir ofertas com paciencia e sem insistencia.",
      "Fazer refeicoes em familia sempre que possivel.",
      "Manter horarios previsiveis para comer.",
    ],
  },
  preschool: {
    header:
      "A rotina alimentar tende a ficar mais estavel, com mais conversa e participacao na mesa.",
    expected: [
      "Participa das refeicoes com mais interesse.",
      "Consegue escolher entre opcoes simples.",
      "Apetite varia conforme a rotina e o cansaco.",
      "Aceita novos alimentos com incentivo gentil.",
    ],
    alerts: [
      "Comer muito pouco por varios dias seguidos.",
      "Rejeicao intensa que interfere nas refeicoes.",
      "Queixas constantes na hora de comer.",
    ],
    tips: [
      "Incluir a crianca em tarefas simples da cozinha.",
      "Manter refeicoes sem distracoes intensas.",
      "Oferecer escolhas simples entre dois alimentos.",
    ],
  },
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

function isFutureDate(value: string) {
  if (!value) {
    return false;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.getTime() > new Date().getTime();
}

export default function NutritionPage() {
  const { profile } = useChildProfile();
  const hasProfile = Boolean(profile);
  const ageInMonths = profile?.ageInMonths ?? null;
  const prenatal = isFutureDate(profile?.birthDate ?? "");
  const ageGroup = prenatal ? "unknown" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" ? null : nutritionContentByGroup[ageGroup];

  const headerText = content
    ? content.header
    : prenatal
      ? "O conteudo de nutricao fica disponivel apos o nascimento."
      : hasProfile
        ? "Ainda nao foi possivel identificar a fase. Use orientacoes gerais por enquanto."
        : "Se quiser, complete o perfil para ver orientacoes ajustadas a fase.";

  const expectedItems = content ? content.expected.slice(0, 5) : [];
  const alertItems = content ? content.alerts.slice(0, 3) : [];
  const tipItems = content ? content.tips : [];
  const expectedFallback =
    "Cada crianca tem seu ritmo. Pequenas observacoes no dia a dia ja ajudam bastante.";
  const alertFallback =
    "Se nao houver sinais para destacar agora, siga observando com calma.";
  const tipsFallback =
    "Sem sugestoes personalizadas agora. Um ambiente tranquilo a mesa ja ajuda bastante.";

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Nutrição</h1>
        <p className="text-sm text-zinc-500">{headerText}</p>
      </div>

      <PlaceholderCard title="Resumo da fase">
        {expectedItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {expectedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            {expectedFallback}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Atencoes para esta fase"
        description="Observacoes do dia a dia, sem alarmismo."
      >
        {alertItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {alertItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            {alertFallback}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como apoiar no dia a dia"
        description="Dicas praticas e aplicaveis a rotina da familia."
      >
        {tipItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {tipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            {tipsFallback}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos simples para apoiar a alimentacao com tranquilidade."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Mantenha horarios parecidos para as refeicoes.</li>
          <li>Ofereca agua em pequenos momentos ao longo do dia.</li>
          <li>Evite pressa e distrações fortes durante a refeicao.</li>
          <li>Observe sinais de fome e saciedade com paciencia.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
