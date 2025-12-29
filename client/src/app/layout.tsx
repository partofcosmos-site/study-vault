import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Using standard next/font/google would be better if online, but localFont is scaffolded default.
// I'll stick to basic structure but add Google Fonts strictly if I can?
// The prompt said "Using modern typography (e.g., from Google Fonts like Inter, Roboto, or Outfit)".
// I'll switch to `next/font/google`.

import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "StudyVault - Master Physics & Math",
  description:
    "The largest verified database of JEE/NEET problems with spaced repetition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {" "}
      {/* Force dark mode by default for premium feel */}
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
