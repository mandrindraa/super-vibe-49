"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.globe.min"; // You can replace this with any Vanta effect

export function VantaBackground() {
  const [vantaEffect, _] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  useEffect(() => {
    // Colors for light and dark modes
    const lightBg = 0xf5f5f0; // Light beige background
    const darkBg = 0x0f172a; // Dark background
    const lightColor = 0xbc5a29; // Forest green for light mode
    const darkColor = 0xf1e7d2;

    const backgroundColor = isDark ? darkBg : lightBg;
    const glColor = isDark ? darkColor : lightColor;

    if (vantaEffect) {
      vantaEffect.destroy();
    }

    if (vantaRef.current) {
      NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1,
        scaleMobile: 1,
        color: glColor,
        backgroundColor: backgroundColor,
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [isDark, vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />;
}
