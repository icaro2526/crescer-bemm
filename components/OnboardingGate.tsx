"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useChildProfile } from "@/features/child-profile/context";

export default function OnboardingGate({ children }: { children: ReactNode }) {
  const { profile, isReady } = useChildProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!profile && pathname !== "/onboarding") {
      router.replace("/onboarding");
      return;
    }

    if (profile && pathname === "/onboarding") {
      router.replace("/");
    }
  }, [isReady, profile, pathname, router]);

  return <>{children}</>;
}
