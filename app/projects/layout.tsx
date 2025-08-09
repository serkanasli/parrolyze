import AppSidebar from "@/components/projects/app-sidebar";
import Navbar from "@/components/projects/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="bg-surface flex h-screen w-full flex-col">
        {/* Header */}
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}

          <AppSidebar />
          <SidebarInset className="scrollbar bg-surface-primary w-full overflow-auto rounded-2xl p-1 shadow-sm dark:border">
            <div className="bg-surface-primary container mx-auto py-10 md:px-5">{children}</div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
