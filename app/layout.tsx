import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Vaulted Financial | Trading & Market Intelligence",
  description:
    "A polished portfolio demo for investment research, trading signals, risk monitoring, and paper trading.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} noise antialiased`}>
        <div className="aurora-bg" aria-hidden="true" />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
