import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Ahsan Malik Al Farisi - Portfolio",
  description:
    "Software Engineering student at ITB. Frontend & mobile developer specializing in Next.js and Flutter.",
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
