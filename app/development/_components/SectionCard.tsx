type SectionCardProps = {
  title: string;
  description?: string;
  items: string[];
  emphasis?: "default" | "highlight";
};

export default function SectionCard({
  title,
  description,
  items,
  emphasis = "default",
}: SectionCardProps) {
  const classes =
    emphasis === "highlight"
      ? "border-zinc-900 bg-zinc-50"
      : "border-zinc-200";

  return (
    <div className={`rounded-lg border p-4 ${classes}`}>
      <p className="text-sm font-semibold text-zinc-800">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      )}
      <ul className="mt-3 space-y-1 text-sm text-zinc-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-zinc-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
