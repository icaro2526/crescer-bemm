import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return (
    <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6", className].join(" ")}>
      {children}
    </div>
  );
}
