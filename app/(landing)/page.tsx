import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <main>
      <section className="section-wide flex flex-col items-center pt-10 lg:pt-24 2xl:pt-48 h-[calc(100vh-5rem)] px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight">
            <span className="bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent">
              Translate your app.
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-secondary to-green-primary bg-clip-text text-transparent">
              Reach the world.
            </span>
          </h1>
          <p className="text-center text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Parrolyze is an open-source translation tool that helps indie
            developers localize their App Store and Play Store listings in
            multiple languages — fast.
          </p>
          <Button asChild className="mt-8 mx-auto" variant="default" size="lg">
            <Link href="/projects">Get for Free</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Page;
