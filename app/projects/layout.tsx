import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/projects/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex-1 flex flex-col bg-sidebar">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar and main content area */}
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col rounded-2xl p-5 bg-background shadow-sm mx-2.5 mb-2.5">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
