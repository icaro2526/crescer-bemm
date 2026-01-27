"use client";

import { useMemo } from "react";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";
import CategoryCard from "@/app/development/_components/CategoryCard";
import SectionCard from "@/app/development/_components/SectionCard";
import {
  developmentStages,
  type DevelopmentCategoryKey,
} from "@/app/development/data";
import { buildPersonalizedStimulus, getAgeInMonths, getCurrentStage } from "./utils";

const categoryLabels: Record<DevelopmentCategoryKey, string> = {
  motora: "Motora",
  cognitiva: "Cognitiva",
  linguagem: "Linguagem",
  socioemocional: "Socioemocional",
};

export default function DevelopmentPage() {
  const { profile, isReady } = useChildProfile();
  const ageSummary = useMemo(
    () => calculateAgeSummary(profile?.birthDate ?? ""),
    [profile?.birthDate]
  );
  const ageInMonths = useMemo(() => getAgeInMonths(profile), [profile]);
  const currentStage = useMemo(
    () => getCurrentStage(ageInMonths),
    [ageInMonths]
  );
  const personalizedStimulus = useMemo(
    () => buildPersonalizedStimulus(profile),
    [profile]
  );
  const attentionItems = useMemo(() => {
    if (!currentStage) {
      return [];
    }
    return currentStage.attentionSigns.slice(0, 3);
  }, [currentStage]);
  const stimulationItems = useMemo(() => {
    if (!currentStage) {
      return [];
    }
    return [...currentStage.stimulation, ...personalizedStimulus];
  }, [currentStage, personalizedStimulus]);

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  if (!profile) {
    return (
      <PlaceholderCard
        title="Perfil ainda nao preenchido"
        description="Quando quiser, complete o perfil para acessar esta secao."
      />
    );
  }

  const isPrenatal = ageSummary?.isPrenatal ?? false;
  const ageLabel = profile.ageLabel ?? ageSummary?.ageLabel ?? "Idade a confirmar";
  const currentStageLabel = currentStage?.label ?? "Fase a confirmar";

  const routineSummary = [
    {
      label: "Sono",
      value: profile.answers.sleepBedtime ?? "Nao informado",
    },
    {
      label: "Refeicoes",
      value: profile.answers.feedingMeals ?? "Nao informado",
    },
    {
      label: "Tempo de tela",
      value: profile.answers.screenTimeDaily ?? "Nao informado",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Desenvolvimento</h1>
        <p className="text-sm text-zinc-500">
          Orientacao pratica e acolhedora para apoiar o desenvolvimento no dia a dia.
          Cada crianca tem seu ritmo.
        </p>
      </div>

      <PlaceholderCard
        title="Resumo da fase"
        description={`Crianca: ${profile.name || "Nao informado"}. Idade: ${ageLabel}.`}
      >
        <div className="mt-3 space-y-1 text-xs text-zinc-500">
          <p>Fase atual: {currentStageLabel}.</p>
          {routineSummary.map((item) => (
            <p key={item.label}>
              {item.label}: {item.value}.
            </p>
          ))}
        </div>
      </PlaceholderCard>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Faixas por idade
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {developmentStages.map((stage) => {
            const isActive = stage.id === currentStage?.id;
            return (
              <span
                key={stage.id}
                className={`flex-shrink-0 rounded-full border px-3 py-1 ${
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 text-zinc-600"
                }`}
              >
                {stage.label}
              </span>
            );
          })}
        </div>
      </div>

      {isPrenatal && (
        <SectionCard
          title="Perfil em gestacao"
          description="O conteudo de desenvolvimento fica disponivel apos o nascimento."
          items={["Atualize a data de nascimento quando estiver disponivel."]}
        />
      )}

      {!isPrenatal && !currentStage && (
        <SectionCard
          title="Fase a confirmar"
          description="Ainda nao foi possivel identificar a fase. Verifique a data de nascimento no perfil."
          items={["Revise o perfil para liberar os marcos personalizados."]}
        />
      )}

      {!isPrenatal && currentStage && (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionCard
              title="O que observar nesta fase"
              description="Marcos comuns para a fase atual. Cada crianca tem seu ritmo."
              items={[
                "Confira os marcos por area abaixo.",
                "Use como guia leve, nao como comparacao.",
              ]}
              emphasis="highlight"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(categoryLabels) as DevelopmentCategoryKey[]).map(
                (key) => (
                  <CategoryCard
                    key={key}
                    title={categoryLabels[key]}
                    items={currentStage.categories[key]}
                  />
                )
              )}
            </div>
          </div>

          <SectionCard
            title="Atencoes para esta fase"
            description="Observacoes leves para acompanhar com calma no dia a dia."
            items={
              attentionItems.length > 0
                ? attentionItems
                : [
                    "Se nao houver itens agora, siga observando com tranquilidade.",
                  ]
            }
          />

          <SectionCard
            title="Como estimular no dia a dia"
            description="Sugestoes simples e praticas para o dia a dia."
            items={
              stimulationItems.length > 0
                ? stimulationItems
                : [
                    "Se nao houver sugestoes agora, atividades simples e afetuosas ja ajudam bastante.",
                  ]
            }
          />
        </div>
      )}
    </section>
  );
}
