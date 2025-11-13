import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Providers } from "./providers";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L'Arche des Savoirs - Partage de Connaissances Anciennes",
  description:
    "Découvrez et partagez les savoirs du passé pour cultiver demain",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_inter.className}`}>
        <Providers>{children}</Providers>

        <Analytics />
      </body>
    </html>
  );
}

// import { Providers } from "./providers";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fr">
//       <body className={`font-sans antialiased ${inter.className}`}>
//         <Providers>{children}</Providers>
//         <Analytics />
//       </body>
//     </html>
//   );
// }
