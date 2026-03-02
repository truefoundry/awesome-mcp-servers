import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCP Server Registry | TrueFoundry",
  description:
    "Community-maintained registry of Model Context Protocol (MCP) servers. Discover 1300+ MCP servers across 40+ categories for AI integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-bg-page text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
