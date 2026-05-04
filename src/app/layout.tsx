import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Matheus Reimer — Software Engineer",
  description:
    "Software Engineer and Tech Lead specializing in scalable web applications, performance optimization, and front-end architecture. Building systems that handle 35M+ monthly requests.",
  openGraph: {
    title: "Matheus Reimer — Software Engineer",
    description: "Scalable web apps · Performance optimization · 35M+ monthly requests",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-950 text-gray-100">{children}</body>
    </html>
  );
}
