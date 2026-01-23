type PlaceholderCardProps = {
  title: string;
  description: string;
};

export default function PlaceholderCard({
  title,
  description,
}: PlaceholderCardProps) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 p-4">
      <p className="text-sm font-medium text-zinc-700">{title}</p>
      <p className="mt-2 text-xs text-zinc-500">{description}</p>
    </div>
  );
}
