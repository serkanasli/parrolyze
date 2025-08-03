import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function Page() {
  return (
    <section className="section-wide flex flex-col items-center justify-center h-screen bg-green-secondary/10 px-2.5 md:px-0">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={250}
          height={100}
          className="mb-5"
        />
      </Link>
      <Card className="w-full max-w-md mt-5 border-0">
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" variant="blue" size="lg">
            {/* <Loader2Icon className="animate-spin" /> */}
            Sign up
          </Button>
          <Button type="submit" className="ml-auto" asChild variant="link">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Separator className="my-2.5" />
          <Button variant="secondary" className="w-full border" size="lg">
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Page;
