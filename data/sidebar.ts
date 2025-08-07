import { AppWindow, Globe, Key, LayoutDashboard, Settings } from "lucide-react";

export function getSidebarItems(projectId: string) {
  return {
    navMain: [
      {
        title: "Overview",
        url: projectId ? `/projects/${projectId}/overview` : "/projects/overview",
        icon: LayoutDashboard,
      },
      {
        title: "Store Localization",
        url: `/projects/${projectId}/localization/store`,
        icon: Globe,
        hideIfMobileAndNoProject: true,
      },
      {
        title: "App Localization",
        url: `/projects/${projectId}/localization/app`,
        icon: AppWindow,
        hideIfMobileAndNoProject: true,
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
        hideIfMobileAndNoProject: true,
      },
    ],
  };
}
