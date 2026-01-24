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
  const ageInMonths = profile?.ageInMonths ?? null;
  const prenatal = isFutureDate(profile?.birthDate ?? "");
  const ageGroup = prenatal ? "unknown" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" ? null : nutritionContentByGroup[ageGroup];

  const headerText = content
    ? content.header
    : prenatal
      ? "Conteudo de nutricao fica disponivel apos o nascimento."
      : "Sem dados suficientes para personalizar esta fase no momento.";

  const expectedItems = content ? content.expected.slice(0, 5) : [];
  const alertItems = content ? content.alerts.slice(0, 3) : [];
  const tipItems = content ? content.tips : [];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Nutrição</h1>
        <p className="text-sm text-zinc-500">{headerText}</p>
      </div>

      <PlaceholderCard title="O que e esperado nesta fase">
        {expectedItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {expectedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem dados suficientes para listar expectativas agora. Cada crianca
            tem seu ritmo.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Atencoes para esta fase"
        description="Sinais leves para observar com calma, sem alarmismo."
      >
        {alertItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {alertItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem alertas leves disponiveis agora. Acompanhe com tranquilidade.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como estimular no dia a dia"
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
            Sem sugestoes personalizadas agora. Momentos calmos a mesa ja ajudam
            bastante.
          </p>
        )}
      </PlaceholderCard>
    </section>
  );
}
