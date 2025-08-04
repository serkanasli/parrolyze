import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeKey = "light" | "dark";

interface ThemeAssets {
  logoSrc: string;
}

const themeAssets: Record<ThemeKey, ThemeAssets> = {
  light: {
    logoSrc: "/logo-dark.svg",
  },
  dark: {
    logoSrc: "/logo-light.svg",
  },
};

export function useThemeAssets(): ThemeAssets & { currentTheme: ThemeKey } {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "light";

  const currentTheme: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";

  const assets = themeAssets[currentTheme];

  return {
    currentTheme,
    logoSrc: assets.logoSrc,
  };
}
