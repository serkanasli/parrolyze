import AppSidebar from "@/components/projects/app-sidebar";
import Navbar from "@/components/projects/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="bg-sidebar flex flex-1 flex-col">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar and main content area */}
          <AppSidebar />
          <SidebarInset className="bg-background mx-2.5 mb-2.5 flex flex-1 flex-col rounded-2xl p-5 shadow-sm">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
