"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";

type AgeGroup = "infant" | "toddler" | "preschool" | "prenatal" | "unknown";

const observationExamplesByGroup: Record<
  Exclude<AgeGroup, "prenatal" | "unknown">,
  string[]
> = {
  infant: [
    "Mudancas no choro, no conforto e no colo.",
    "Sono e horarios de mamadas.",
    "Contato visual e reacao a vozes.",
    "Momentos de alerta ao longo do dia.",
  ],
  toddler: [
    "Birras e transicoes entre atividades.",
    "Interesse em brincar junto e compartilhar.",
    "Palavras novas, gestos e pedidos.",
    "Rotina de sono e alimentacao.",
  ],
  preschool: [
    "Conversas do dia a dia e perguntas.",
    "Brincadeiras com outras criancas.",
    "Mudancas de humor na rotina.",
    "Autonomia em pequenas tarefas.",
  ],
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

export default function ProfessionalSupportPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = calculateAgeSummary(profile?.birthDate ?? "");
  const ageInMonths = profile?.ageInMonths ?? ageSummary?.ageInMonths ?? null;
  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageGroup = isPrenatal ? "prenatal" : getAgeGroup(ageInMonths);
  const hasProfile = Boolean(profile);
  const observationExamples =
    ageGroup === "unknown" || ageGroup === "prenatal"
      ? []
      : observationExamplesByGroup[ageGroup];

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Preparacao para conversar com profissionais
        </h1>
        <p className="text-sm text-zinc-500">
          Conversar com profissionais pode gerar duvidas e inseguranca. Voce nao
          precisa ter tudo perfeito. Esta pagina ajuda a se preparar com calma
          e clareza, sem pressa e sem rotulos.
        </p>
      </div>

      <PlaceholderCard
        title="Como organizar suas observacoes"
        description="Reunir exemplos do dia a dia ja e suficiente."
      >
        {observationExamples.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {observationExamples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            {hasProfile
              ? "Ainda nao foi possivel identificar a fase. Use exemplos gerais do dia a dia."
              : "Sem perfil por enquanto. Use exemplos gerais do dia a dia, como sono, rotina e comunicacao."}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="O que levar para a conversa"
        description="Uma lista simples ja ajuda bastante."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Anotacoes breves do que voce observou.</li>
          <li>Duas ou tres duvidas que gostaria de conversar.</li>
          <li>Mudancas recentes na rotina que chamaram sua atencao.</li>
        </ul>
        <p className="mt-3 text-sm text-zinc-500">
          Nao precisa levar tudo. O mais importante e contar com suas palavras.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que nao precisa preocupar agora"
        description="Este momento e para acolher e entender."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Voce nao precisa chegar com respostas prontas.</li>
          <li>Termos tecnicos nao sao obrigatorios.</li>
          <li>Nem tudo precisa ser resolvido em uma conversa.</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos simples e tranquilos para seguir."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Observe por alguns dias e anote o que se repete.</li>
          <li>Separe os pontos que mais chamaram sua atencao.</li>
          <li>Converse com o pediatra e busque avaliacao se precisar.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
