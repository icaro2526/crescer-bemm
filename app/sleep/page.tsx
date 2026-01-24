"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";

type AgeGroup = "infant" | "toddler" | "preschool" | "unknown";

type SleepContent = {
  expected: string;
  alerts: string[];
  tips: string[];
};

const sleepContentByGroup: Record<Exclude<AgeGroup, "unknown">, SleepContent> = {
  infant: {
    expected:
      "Nos primeiros meses, o sono costuma ter varios despertares e cochilos curtos. O ritmo ainda esta se organizando.",
    alerts: [
      "Dificuldade constante para adormecer em qualquer horario.",
      "Choro intenso e dificil de acalmar em muitas noites seguidas.",
      "Sono muito curto com sinais de cansaco o dia todo.",
    ],
    tips: [
      "Rotina simples com luz baixa, banho morno e voz calma.",
      "Sonecas em horarios parecidos quando possivel.",
      "Ambiente mais escuro e tranquilo para dormir.",
    ],
  },
  toddler: {
    expected:
      "O sono noturno tende a ficar mais longo, com um cochilo. E comum haver resistencia na hora de dormir.",
    alerts: [
      "Resistencia diaria e prolongada para ir dormir.",
      "Muitos despertares noturnos sem conseguir se acalmar.",
      "Sonolencia ou irritacao persistentes durante o dia.",
    ],
    tips: [
      "Rotina previsivel com inicio e fim claros.",
      "Evitar telas perto do horario de dormir.",
      "Oferecer um objeto de conforto, como um paninho.",
    ],
  },
  preschool: {
    expected:
      "O sono noturno e mais estavel. Alguns deixam de cochilar e podem querer adiar o horario de dormir.",
    alerts: [
      "Dificuldade frequente para pegar no sono por longo tempo.",
      "Acorda muito cansado na maioria dos dias.",
      "Pesadelos frequentes que afetam a rotina.",
    ],
    tips: [
      "Desacelerar com leitura curta ou conversa calma.",
      "Manter horario consistente, inclusive fins de semana.",
      "Limitar estimulacao intensa perto da hora de dormir.",
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

export default function SleepPage() {
  const { profile } = useChildProfile();
  const ageInMonths = profile?.ageInMonths ?? null;
  const prenatal = isFutureDate(profile?.birthDate ?? "");
  const ageGroup = prenatal ? "unknown" : getAgeGroup(ageInMonths);
  const content = ageGroup === "unknown" ? null : sleepContentByGroup[ageGroup];

  const expectedText = content
    ? content.expected
    : prenatal
      ? "Conteudo de sono fica disponivel apos o nascimento."
      : "Sem dados suficientes para personalizar esta fase no momento.";

  const attentionItems = content ? content.alerts.slice(0, 3) : [];
  const tipItems = content ? content.tips : [];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Sono</h1>
        <p className="text-sm text-zinc-500">
          Orientacao acolhedora para apoiar habitos de sono no dia a dia.
        </p>
      </div>

      <PlaceholderCard
        title="O que e esperado para esta fase"
        description={expectedText}
      />

      <PlaceholderCard
        title="Atencoes para esta fase"
        description="Sinais leves para observar com calma, sem alarmismo."
      >
        {attentionItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {attentionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem dados suficientes para listar atencoes agora. Cada crianca tem
            seu ritmo.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como estimular habitos de sono no dia a dia"
        description="Dicas simples e praticas, com foco na rotina da familia."
      >
        {tipItems.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {tipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem sugestoes personalizadas agora. Um ambiente calmo e acolhedor ja
            ajuda bastante.
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
