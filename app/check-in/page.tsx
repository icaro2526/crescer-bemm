"use client";

import PlaceholderCard from "@/components/PlaceholderCard";
import { useChildProfile } from "@/features/child-profile/context";

export default function CheckInPage() {
  const { profile, isReady } = useChildProfile();
  const hasProfile = Boolean(profile);

  if (!isReady) {
    return <p className="text-sm text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Check-in semanal</h1>
        <p className="text-sm text-zinc-500">
          Um momento simples para olhar a semana com calma e perceber pequenos
          sinais do dia a dia.
        </p>
      </div>

      <PlaceholderCard
        title="Perguntas da semana"
        description="Responda com frases curtas, do seu jeito."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>O que foi mais facil nesta semana?</li>
          <li>O que foi mais dificil?</li>
          <li>Algo novo chamou sua atencao?</li>
        </ul>
      </PlaceholderCard>

      <PlaceholderCard
        title="Respostas livres"
        description="Nao precisa escrever muito. Uma ou duas frases ja ajudam."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Se preferir, anote apenas palavras-chave ou pequenos exemplos do dia
          a dia.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="Resumo"
        description="Esses registros ajudam a acompanhar o desenvolvimento ao longo do tempo."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Com o tempo, fica mais facil perceber o que melhora, o que se repete
          e o que precisa de mais atencao.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que fazer agora?"
        description="Passos simples e tranquilos."
      >
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Escolha um momento calmo para responder.</li>
          <li>Se faltar tempo, responda uma pergunta por vez.</li>
          <li>
            {hasProfile
              ? "Use este registro como apoio para conversar com quem cuida com voce."
              : "Se quiser, complete o perfil para ter um panorama mais completo."}
          </li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
