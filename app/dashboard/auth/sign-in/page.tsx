import Image from "next/image";
import Link from "next/link";

function Page() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center mt-10 md:mt-20 lg:mt-30">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            objectFit="cover"
          />
        </Link>

        <div className="shadow-lg rounded-lg p-6 max-w-md w-full mt-16">
          <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        </div>
      </section>
    </main>
  );
}

export default Page;
