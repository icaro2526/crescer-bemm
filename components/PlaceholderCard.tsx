import type { ReactNode } from "react";

type PlaceholderCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function PlaceholderCard({
  title,
  description,
  children,
  className,
}: PlaceholderCardProps) {
  return (
    <div
      className={`rounded-lg border border-dashed border-zinc-300 p-4 ${
        className ?? ""
      }`}
    >
      <p className="text-sm font-medium text-zinc-700">{title}</p>
      {description && <p className="mt-2 text-xs text-zinc-500">{description}</p>}
      {children}
    </div>
  );
}
