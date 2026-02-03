"use client";

import type { ReactNode } from "react";
import { ChildProfileProvider } from "@/features/child-profile/context";

export default function Providers({ children }: { children: ReactNode }) {
  return <ChildProfileProvider>{children}</ChildProfileProvider>;
}
