"use client";

import PlaceholderCard from "@/components/PlaceholderCard";

export default function OnboardingPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Boas-vindas</h1>
        <p className="text-sm text-zinc-500">
          Voce nao precisa ter tudo sob controle. Este app esta aqui para ajudar
          com leveza, sem pressao e sem certo ou errado.
        </p>
      </div>

      <PlaceholderCard
        title="O que este app faz"
        description="Ajuda voce a acompanhar o dia a dia com mais clareza."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Aqui voce encontra orientacoes simples, organizadas por fase, para
          apoiar sono, alimentacao, comportamento e rotinas.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="O que este app nao faz"
        description="Nao compara criancas e nao traz diagnosticos."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Este app nao substitui avaliacao profissional e nao faz julgamentos.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="Como usar no dia a dia"
        description="Use quando fizer sentido para sua familia."
      >
        <p className="mt-2 text-sm text-zinc-500">
          Voce pode escolher uma secao por vez, voltar quando quiser e registrar
          o que achar importante. O uso e flexivel.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="Encerramento"
        description="Voce pode começar quando quiser."
      >
        <p className="mt-2 text-sm text-zinc-500">
          O importante e seguir no seu ritmo, com carinho e confianca.
        </p>
      </PlaceholderCard>

      <PlaceholderCard
        title="Um proximo passo possivel"
        description="Sugestoes leves para quando fizer sentido."
      >
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Escolha uma area para explorar com calma.</li>
          <li>Se preferir, volte depois e continue no seu ritmo.</li>
        </ul>
      </PlaceholderCard>
    </section>
  );
}
