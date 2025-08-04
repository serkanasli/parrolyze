import { AppWindow, Globe, Key, LayoutDashboard, Settings } from "lucide-react";

export const sidebarItems = {
  navMain: [
    {
      title: "Overview",
      url: "/projects/wikiup/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Store Localization",
      url: "/projects/wikiup/localization/store",
      icon: Globe,
    },
    {
      title: "App Localization",
      url: "/projects/wikiup/localization/app",
      icon: AppWindow,
    },
  ],
  navSecondary: [
    {
      title: "API Keys",
      url: "/projects/api-keys",
      icon: Key,
    },
    {
      title: "Project Settings",
      url: "/projects/wikiup/settings",
      icon: Settings,
    },
  ],
};
