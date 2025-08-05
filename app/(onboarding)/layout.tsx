export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-secondary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div>{children}</div>
    </main>
  );
}
