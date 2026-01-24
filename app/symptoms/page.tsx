import Link from "next/link";
import PlaceholderCard from "@/components/PlaceholderCard";

const symptoms = [
  {
    title: "Fever",
    href: "/symptoms/fever",
    description: "View age-aware guidance for fever.",
  },
  {
    title: "Cough",
    href: "/symptoms/cough",
    description: "View age-aware guidance for cough.",
  },
  {
    title: "Diarrhea",
    href: "/symptoms/diarrhea",
    description: "View age-aware guidance for diarrhea.",
  },
  {
    title: "Vomiting",
    href: "/symptoms/vomiting",
    description: "View age-aware guidance for vomiting.",
  },
  {
    title: "Runny nose",
    href: "/symptoms/runny-nose",
    description: "View age-aware guidance for runny nose.",
  },
];

export default function SymptomsPage() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Symptoms</h1>
        <p className="text-sm text-zinc-500">
          Educational guidance only. Select a symptom to view tailored
          monitoring and safety notes.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {symptoms.map((symptom) => (
          <Link key={symptom.href} href={symptom.href} className="block">
            <PlaceholderCard
              title={symptom.title}
              description={symptom.description}
              className="transition hover:border-zinc-400"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
