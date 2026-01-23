import PlaceholderCard from "@/components/PlaceholderCard";

export default function Home() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-sm text-zinc-500">
          Overview and child summary placeholders.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PlaceholderCard
          title="Overview placeholder"
          description="Placeholder content for the home overview."
        />
        <PlaceholderCard
          title="Child summary placeholder"
          description="Placeholder content for the child summary."
        />
      </div>
    </section>
  );
}
