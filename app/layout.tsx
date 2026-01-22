import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Crescer Bem - Guia Infantil 0 a 5 anos",
  description:
    "Aplicativo educativo para orientar maes e familias no desenvolvimento infantil.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950 text-slate-100">
        <div className="min-h-screen">
          <header className="border-b border-white/10">
            <SectionContainer className="flex flex-wrap items-center justify-between gap-4 py-6">
              <Link href="/" className="text-lg font-semibold tracking-tight text-white">
                Crescer Bem
              </Link>
              <nav className="flex flex-wrap items-center gap-2">
                <Button href="/child-profile" variant="ghost">
                  Perfil da Crianca
                </Button>
                <Button href="/sections" variant="ghost">
                  Secoes
                </Button>
                <Button href="/legal-disclaimer" variant="ghost">
                  Aviso Legal
                </Button>
              </nav>
            </SectionContainer>
          </header>
          <main className="pb-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
