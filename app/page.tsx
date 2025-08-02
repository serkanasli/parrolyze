import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="section-wide flex flex-col items-center pt-10 lg:pt-24 h-[calc(100vh-5rem)] px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-bold text-center">
            Translate your app. Reach the world.
          </h1>
          <p className="text-center text-lg mt-4">
            Parrolyze is an open-source translation tool that helps indie
            developers localize their App Store and Play Store listings in
            multiple languages, fast.
          </p>
          <Link href="/app">
            <Button className="mt-8 mx-auto block" variant="default" size="lg">
              Get for Free
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
