import { AppWindow, Globe, Key, LayoutDashboard, Settings } from "lucide-react";

export function getSidebarItems(projectId: string) {
  return {
    navMain: [
      {
        title: "Overview",
        url: `/projects/${projectId}/overview`,
        icon: LayoutDashboard,
      },
      {
        title: "Store Localization",
        url: `/projects/${projectId}/localization/store`,
        icon: Globe,
      },
      {
        title: "App Localization",
        url: `/projects/${projectId}/localization/app`,
        icon: AppWindow,
      },
    ],
    navSecondary: [
      {
        title: "API Keys",
        url: `/projects/api-keys`,
        icon: Key,
      },
      {
        title: "Project Settings",
        url: `/projects/${projectId}/settings`,
        icon: Settings,
      },
    ],
  };
}
