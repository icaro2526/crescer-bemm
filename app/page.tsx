import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlaceholderCard from "@/components/PlaceholderCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold">
            Child development guidance (ages 3-5)
          </h1>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
