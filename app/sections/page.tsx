import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";

const sections = [
  {
    title: "Desenvolvimento",
    description: "Marcos e estimulos para cada fase.",
  },
  {
    title: "Sono",
    description: "Rotinas acolhedoras e descanso seguro.",
  },
  {
    title: "Alimentacao",
    description: "Orientacoes para nutricao adequada.",
  },
  {
    title: "Comportamento",
    description: "Apoio para lidar com desafios diarios.",
  },
  {
    title: "Sinais de Atencao",
    description: "Informacoes educativas sobre alertas.",
  },
];

export default function SectionsHubPage() {
  return (
    <SectionContainer className="py-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Secoes de Orientacao
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Escolha um tema para explorar orientacoes organizadas por area.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card
              key={section.title}
              title={section.title}
              description={section.description}
            >
              <Button variant="ghost">Selecionar</Button>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
