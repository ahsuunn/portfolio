import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahsan Malik Al Farisi - Portfolio",
  description:
    "Software Engineering student at ITB and incoming Global FinTech Scholar at Chung-Ang University (South Korea). Full-stack developer with experience across enterprise systems, AI/NLP, and mobile apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${schibstedGrotesk.variable} ${geist.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
