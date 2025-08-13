"use client";

import { useThemeAssets } from "@/hooks/use-theme-assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AppLogoProps {
  className?: string;
  href?: string;
  image?: {
    width?: number;
    height?: number;
  };
}

export default function AppLogo({ className, image, href }: AppLogoProps) {
  const { logoSrc } = useThemeAssets();
  const width = image?.width ?? 175;
  const height = image?.height ?? 175;

  return (
    <Link href={href || "/"} className={cn("flex items-center p-2.5", className)}>
      <Image src={logoSrc} alt="Logo" width={width} height={height} />
    </Link>
  );
}
