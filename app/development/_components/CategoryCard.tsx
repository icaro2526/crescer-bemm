type CategoryCardProps = {
  title: string;
  items: string[];
};

export default function CategoryCard({ title, items }: CategoryCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <p className="text-sm font-semibold text-zinc-800">{title}</p>
      <ul className="mt-2 space-y-1 text-sm text-zinc-600">
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
