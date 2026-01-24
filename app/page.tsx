"use client";

import Link from "next/link";
import { useMemo } from "react";
import ChildSummaryCard from "@/components/ChildSummaryCard";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";
import { getAgeInMonths, getCurrentStage } from "@/app/development/utils";

export default function Home() {
  const { profile } = useChildProfile();
  const ageSummary = useMemo(
    () => calculateAgeSummary(profile?.birthDate ?? ""),
    [profile?.birthDate]
  );
  const ageInMonths = useMemo(() => getAgeInMonths(profile), [profile]);
  const currentStage = useMemo(
    () => getCurrentStage(ageInMonths),
    [ageInMonths]
  );
  const isPrenatal = ageSummary?.isPrenatal ?? false;

  // Highlight 3-5 milestones by selecting a balanced mix across categories.
  const milestoneHighlights = useMemo(() => {
    if (!currentStage || isPrenatal) {
      return [];
    }

    const { categories } = currentStage;
    const balanced = [
      categories.motora?.[0],
      categories.cognitiva?.[0],
      categories.linguagem?.[0],
      categories.socioemocional?.[0],
    ].filter(Boolean) as string[];

    const extras = Object.values(categories)
      .flat()
      .filter((item) => !balanced.includes(item));

    return [...balanced, ...extras].slice(0, 5);
  }, [currentStage, isPrenatal]);

  const attentionHighlights = useMemo(() => {
    if (!currentStage || isPrenatal) {
      return [];
    }
    return currentStage.attentionSigns.slice(0, 3);
  }, [currentStage, isPrenatal]);

  const shortcuts = useMemo(() => {
    const base = [
      { label: "Desenvolvimento", href: "/development" },
      { label: "Sono", href: "/sleep" },
      { label: "Nutricao", href: "/nutrition" },
      { label: "Sintomas", href: "/symptoms" },
    ];

    if (!ageInMonths || isPrenatal) {
      return base;
    }

    // Adjust order by age group while keeping the priority sections.
    if (ageInMonths < 12) {
      return [base[1], base[2], base[0], base[3]];
    }

    if (ageInMonths < 36) {
      return [base[0], base[1], base[2], base[3]];
    }

    return [base[0], base[2], base[1], base[3]];
  }, [ageInMonths, isPrenatal]);

  const stageLabel = currentStage?.label ?? "Faixa nao identificada";
  const ageLabel = profile?.ageLabel ?? "Idade nao informada";

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Painel diario</h1>
        <p className="text-sm text-zinc-500">
          Um resumo rapido para acompanhar o desenvolvimento e ajustar rotinas.
        </p>
      </div>

      <ChildSummaryCard profile={profile} />

      <PlaceholderCard
        title="Resumo do Desenvolvimento Atual"
        description={`Faixa atual: ${stageLabel}. Idade: ${ageLabel}.`}
      >
        {milestoneHighlights.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {milestoneHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-zinc-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem dados suficientes para destacar marcos nesta fase. Atualize o
            perfil ou aguarde a data de nascimento.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Atencoes para observar"
        description="Sinais leves para acompanhar com calma e atencao."
      >
        {attentionHighlights.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {attentionHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-zinc-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Sem alertas leves disponiveis agora. Cada crianca tem seu ritmo.
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Atalhos Personalizados"
        description="Sugestoes ajustadas pela fase atual."
      >
        <div className="mt-3 flex flex-wrap gap-2">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              {shortcut.label}
            </Link>
          ))}
        </div>
        {profile && !isPrenatal && !currentStage && (
          <p className="mt-3 text-xs text-zinc-500">
            Faixa etaria indefinida. Revise a data de nascimento para personalizar
            estes atalhos.
          </p>
        )}
      </PlaceholderCard>

    </section>
  );
}
