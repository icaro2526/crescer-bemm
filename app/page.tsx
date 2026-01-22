import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function HomePage() {
  return (
    <SectionContainer className="py-12">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Guia Infantil 0 a 5 anos
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Crescer Bem
          </h1>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            Um espaco seguro e estruturado para apoiar familias com orientacoes
            educativas sobre o desenvolvimento infantil, de forma clara e
            acolhedora.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="Perfil da crianca"
            description="Registre nome, idade em meses e detalhes opcionais."
          >
            <Button href="/child-profile">Criar perfil</Button>
          </Card>
          <Card
            title="Secoes de orientacao"
            description="Acesse os temas essenciais para o dia a dia."
          >
            <Button href="/sections">Abrir secoes</Button>
          </Card>
          <Card
            title="Aviso legal"
            description="Entenda os limites e o uso seguro do app."
          >
            <Button href="/legal-disclaimer">Ler aviso</Button>
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
}
