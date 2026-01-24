"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      {!isOnboarding && <Header />}
      <main
        className={`mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-6 ${
          isOnboarding ? "pb-6" : "pb-24"
        }`}
      >
        {children}
      </main>
      {!isOnboarding && <BottomNav />}
    </div>
  );
}
