import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <main>
      <section className="section-wide flex h-[calc(100vh-5rem)] flex-col items-center px-4 pt-10 lg:pt-24 2xl:pt-48">
        <div className="max-w-2xl text-center">
          <h1 className="text-center text-5xl leading-tight font-bold md:text-6xl">
            <span className="from-green-primary to-green-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Translate your app.
            </span>
            <br />
            <span className="from-green-secondary to-green-primary bg-gradient-to-r bg-clip-text text-transparent">
              Reach the world.
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed md:text-lg">
            Parrolyze is an open-source translation tool that helps indie developers localize their
            App Store and Play Store listings in multiple languages — fast.
          </p>
          <Button asChild className="mx-auto mt-8" variant="default" size="lg">
            <Link href="/projects">Get for Free</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Page;
