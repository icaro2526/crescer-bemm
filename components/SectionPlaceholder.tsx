type SectionPlaceholderProps = {
  title: string;
  description: string;
};

export default function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-zinc-500">{description}</p>
    </section>
  );
}
