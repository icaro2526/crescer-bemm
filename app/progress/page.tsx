"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

type ProgressContent = {
  summary: string;
  indicators: {
    language: string[];
    sleep: string[];
    nutrition: string[];
    behavior: string[];
    routine: string[];
  };
};

const progressContentByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  ProgressContent
> = {
  infant: {
    summary:
      "Nos primeiros meses, pequenas mudancas no olhar, no sono e no contato mostram evolucao.",
    indicators: {
      language: [
        "Responde a vozes com sons e balbucios curtos.",
        "Olha para quem fala e reage a sons familiares.",
      ],
      sleep: [
        "Sono mais organizado em pequenos blocos de tempo.",
        "Em alguns dias, se acalma mais rapido.",
      ],
      nutrition: [
        "Mostra sinais de fome e saciedade com mais clareza.",
        "Aceita mamar ou comer com mais conforto.",
      ],
      behavior: [
        "Busca mais contato visual e sorri com mais frequencia.",
        "Fica acordado e atento por mais tempo.",
      ],
      routine: [
        "Reconhece momentos do dia, como banho e descanso.",
        "Aceita pequenas repeticoes na rotina.",
      ],
    },
  },
  toddler: {
    summary:
      "Nesta fase, a evolucao aparece na autonomia e na forma de se comunicar e se adaptar.",
    indicators: {
      language: [
        "Usa mais palavras para pedir o que quer.",
        "Comeca a juntar palavras em frases curtas.",
      ],
      sleep: [
        "Aceita melhor a rotina de dormir.",
        "Acorda com mais disposicao em muitos dias.",
      ],
      nutrition: [
        "Mostra preferencia por alguns alimentos, mas aceita provar novos.",
        "Consegue comer com mais autonomia.",
      ],
      behavior: [
        "Birras ficam mais curtas quando recebe apoio.",
        "Procura o adulto para mostrar algo que fez.",
      ],
      routine: [
        "Entende avisos simples antes de mudar de atividade.",
        "Se adapta a horarios parecidos para comer e dormir.",
      ],
    },
  },
  preschool: {
    summary:
      "A evolucao costuma aparecer em comunicacao mais clara e mais previsibilidade na rotina.",
    indicators: {
      language: [
        "Conta pequenas historias sobre o dia.",
        "Explica o que sente com palavras simples.",
      ],
      sleep: [
        "Entende quando e hora de desacelerar.",
        "Mantem horarios parecidos para dormir.",
      ],
      nutrition: [
        "Aceita escolhas simples nas refeicoes.",
        "Participa do momento a mesa com mais calma.",
      ],
      behavior: [
        "Consegue esperar um pouco mais em algumas situacoes.",
        "Mostra mais interesse em brincar com outras criancas.",
      ],
      routine: [
        "Segue combinados simples com mais frequencia.",
        "Se organiza melhor com ajuda para pequenas tarefas.",
      ],
    },
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

export default function ProgressPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = calculateAgeSummary(profile?.birthDate ?? "");
  const ageInMonths = profile?.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageGroup = isPrenatal ? "prenatal" : getAgeGroup(ageInMonths);
  const content =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? null
      : progressContentByGroup[ageGroup];

  const hasProfile = Boolean(profile);
  const ageLabel = isPrenatal ? "Em gestacao" : formatAgeLabel(ageInMonths);
  const indicatorsFallback =
    "Com o tempo, pequenas mudancas vao aparecer no dia a dia.";
  const profileSummary = !hasProfile
    ? "Sem perfil por enquanto. Se quiser, complete para ver atencoes por fase."
    : isPrenatal
      ? "Perfil em gestacao. Este conteudo fica disponivel apos o nascimento."
      : `Idade aproximada: ${ageLabel}. Use estas atencoes como guia leve.`;

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Progresso</h1>
        <p className="text-sm text-zinc-500">
          Cada crianca tem seu proprio ritmo. Progresso e seguir com seguranca,
          no seu tempo.
        </p>
      </div>

      <PlaceholderCard title="Atencoes para esta fase">
        <p className="text-sm text-zinc-500">
          Atencoes sao observacoes do dia a dia, nao rotulos. Se por alguns dias
          o sono, o humor ou o interesse em brincar mudarem muito, vale observar
          com calma e anotar.
        </p>
        <p className="mt-3 text-sm text-zinc-500">{profileSummary}</p>
      </PlaceholderCard>

      <PlaceholderCard
        title="Resumo da fase"
        description={content ? content.summary : indicatorsFallback}
      >
        {content ? (
          <div className="mt-3 space-y-4 text-sm text-zinc-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Linguagem
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {content.indicators.language.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Sono
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {content.indicators.sleep.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Alimentacao
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {content.indicators.nutrition.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Comportamento
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {content.indicators.behavior.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Rotina
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {content.indicators.routine.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">{indicatorsFallback}</p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Como apoiar no dia a dia"
        description="Dicas simples para apoiar a rotina com calma."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Ofereca pequenas escolhas para incentivar autonomia.</li>
          <li>Avise antes de mudar de atividade e mantenha combinados simples.</li>
          <li>Valorize tentativas de comunicacao com gestos ou palavras.</li>
          <li>Mantenha horarios parecidos para trazer previsibilidade.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos tranquilos para seguir com confianca."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Continue observando sem pressa e registre pequenas mudancas.</li>
          <li>Use as outras areas do app como apoio no dia a dia.</li>
          <li>Confie no processo e busque orientacao quando precisar.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
