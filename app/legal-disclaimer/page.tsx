import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function LegalDisclaimerPage() {
  return (
    <SectionContainer className="py-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Aviso Legal
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Este aplicativo oferece informacoes educativas sobre desenvolvimento
            infantil de 0 a 5 anos.
          </p>
        </div>

        <Card>
          <div className="space-y-4 text-sm text-slate-200 sm:text-base">
            <p>
              O conteudo aqui apresentado nao substitui avaliacao, diagnostico ou
              acompanhamento medico, psicologico, terapeutico ou de qualquer
              profissional habilitado.
            </p>
            <p>
              Em caso de duvidas, sinais de alerta ou preocupacoes com o
              desenvolvimento da crianca, procure orientacao profissional
              adequada.
            </p>
          </div>
        </Card>
      </div>
    </SectionContainer>
  );
}
