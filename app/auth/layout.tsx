import AppLogo from "@/components/app-logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-secondary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center justify-center">
            <AppLogo
              image={{
                width: 200,
                height: 200,
              }}
            />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
