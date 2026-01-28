"use client";

import Link from "next/link";
import { useMemo } from "react";
import ChildSummaryCard from "@/components/ChildSummaryCard";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { calculateAgeSummary } from "@/features/child-profile/utils";
import { getAgeInMonths, getCurrentStage } from "@/app/development/utils";

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
  const hasProfile = Boolean(profile);
  const ageLabel = hasProfile
    ? isPrenatal
      ? "Em gestacao"
      : formatAgeLabel(ageInMonths)
    : "A confirmar";

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
      {
        label: "Desenvolvimento: entender marcos da fase",
        href: "/development",
      },
      { label: "Sono: organizar rotina de descanso", href: "/sleep" },
      { label: "Nutricao: apoiar refeicoes do dia", href: "/nutrition" },
      { label: "Sintomas: observar sinais com calma", href: "/symptoms" },
      { label: "Comportamento: lidar com birras e limites", href: "/behavior" },
    ];

    if (!ageInMonths || isPrenatal) {
      return base;
    }

    // Adjust order by age group while keeping the priority sections.
    if (ageInMonths < 12) {
      return [base[1], base[2], base[0], base[3], base[4]];
    }

    if (ageInMonths < 36) {
      return [base[0], base[1], base[2], base[3], base[4]];
    }

    return [base[0], base[2], base[1], base[3], base[4]];
  }, [ageInMonths, isPrenatal]);

  const stageLabel = currentStage?.label ?? (isPrenatal ? "Em gestacao" : "Fase a confirmar");
  const phaseSummary = hasProfile
    ? `Fase atual: ${stageLabel}. Idade aproximada: ${ageLabel}.`
    : "Preencha o perfil quando puder para ver a fase atual.";
  const milestonesFallback = isPrenatal
    ? "Se a crianca ainda nao nasceu, voce pode voltar depois para ver os marcos da fase."
    : hasProfile
      ? "Cada crianca tem seu ritmo. Quando for possivel, voce vera um resumo da fase aqui."
      : "Sem pressa: ao completar o perfil, voce vera um resumo da fase aqui.";
  const attentionFallback = hasProfile
    ? "Se nao houver sinais para destacar agora, siga observando com calma."
    : "Quando o perfil estiver completo, voce vera sinais leves para observar.";

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Resumo do dia</h1>
        <p className="text-sm text-zinc-500">
          Um panorama simples para entender a fase da crianca e o que observar
          no dia a dia.
        </p>
      </div>

      <ChildSummaryCard profile={profile} />

      <PlaceholderCard
        title="Resumo da fase da crianca"
        description={phaseSummary}
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
            {milestonesFallback}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Sinais de atencao (ate 3)"
        description="Sinais leves para observar com calma e sem pressa."
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
            {attentionFallback}
          </p>
        )}
      </PlaceholderCard>

      <PlaceholderCard
        title="Proximos passos sugeridos"
        description="Cada atalho mostra quando acessar e como pode ajudar no dia a dia. Se quiser, ha uma jornada guiada opcional para o primeiro acesso."
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
            Se a faixa etaria ainda nao estiver clara, voce pode revisar a data
            de nascimento quando quiser.
          </p>
        )}
      </PlaceholderCard>

    </section>
  );
}
