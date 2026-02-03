"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";
import { getHomeState, HomeState } from "@/features/home/state";

type TimelineEntry = {
  period: string;
  notes: string[];
};

const timelineEntries: TimelineEntry[] = [];
const timelinePatterns: string[] = [];

export default function TimelinePage() {
  const { profile, isReady } = useChildProfile();
  const hasProfile = Boolean(profile);
  const hasEntries = timelineEntries.length > 0;
  const hasPatterns = timelinePatterns.length > 0;
  const lastMeaningfulInteractionAt = profile?.updatedAt
    ? new Date(profile.updatedAt)
    : null;
  const lastSensitiveContentAccessAt = null;
  const homeState = getHomeState({
    lastMeaningfulInteractionAt,
    lastSensitiveContentAccessAt,
  });
  const isSensitive = homeState === HomeState.SENSITIVE;
  const showEntriesBlock = !isSensitive || hasEntries;

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Linha do tempo</h1>
        <p className="text-sm text-zinc-500">
          Mudancas nao sao lineares. Registrar ajuda a lembrar, nao a cobrar.
          Cada crianca tem seu ritmo.
        </p>
      </div>

      <PlaceholderCard
        title="Como ler a linha do tempo"
        description="Os registros representam periodos, como semana ou mes."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Nem todo periodo tera anotacoes. Tudo bem ter pausas quando a rotina
          estiver mais corrida.
        </p>
      </PlaceholderCard>

      {showEntriesBlock && (
        <PlaceholderCard
          title="Entradas ao longo do tempo"
          description="Anotacoes curtas do que foi percebido em cada periodo."
        >
          {hasEntries ? (
            <div className="mt-3 space-y-4 text-sm text-zinc-600">
              {timelineEntries.map((entry) => (
                <div key={entry.period} className="space-y-2">
                  <p className="text-sm font-medium text-zinc-700">
                    {entry.period}
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    {entry.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">
              {hasProfile
                ? "Ainda nao ha registros. Quando voce fizer check-ins, eles aparecerao aqui."
                : "Sem perfil por enquanto. Quando quiser, complete o perfil e registre check-ins."}
            </p>
          )}
        </PlaceholderCard>
      )}

      <PlaceholderCard
        title="Padroes percebidos"
        description="Pontos leves que podem aparecer ao longo do tempo."
      >
        {hasPatterns ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {timelinePatterns.map((pattern) => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            Quando houver registros, pode surgir algo como: "Neste periodo, pode
            ter havido mais necessidade de descanso".
          </p>
        )}
      </PlaceholderCard>

      {!isSensitive && (
        <PlaceholderCard
          title="O que fazer agora?"
          description="Use como apoio, nao como cobranca."
        >
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            <li>Escolha um momento calmo para registrar o que lembrar.</li>
            <li>Use as anotacoes como apoio para conversas em casa.</li>
            <li>Se precisar, busque orientacao com tranquilidade.</li>
          </ul>
        </PlaceholderCard>
      )}
    </section>
  );
}
