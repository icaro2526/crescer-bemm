import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function ChildProfilePage() {
  return (
    <SectionContainer className="py-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Perfil da Crianca
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Preencha os dados principais para personalizar a experiencia de
            orientacao.
          </p>
        </div>

        <Card>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="name">
                Nome da crianca
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite o nome"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="age">
                Idade em meses
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={0}
                max={60}
                placeholder="Ex: 18"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="gender">
                Genero (opcional)
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-400/60"
                defaultValue=""
              >
                <option value="" disabled className="bg-slate-900 text-slate-300">
                  Selecionar
                </option>
                <option value="feminino" className="bg-slate-900 text-white">
                  Feminino
                </option>
                <option value="masculino" className="bg-slate-900 text-white">
                  Masculino
                </option>
                <option value="prefiro-nao-dizer" className="bg-slate-900 text-white">
                  Prefiro nao dizer
                </option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit">Salvar perfil</Button>
              <Button href="/" variant="ghost">
                Voltar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </SectionContainer>
  );
}
