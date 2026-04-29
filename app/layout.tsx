import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fleur Albers — Front-end Developer",
    template: "%s — Fleur Albers",
  },
  description:
    "Bilingual portfolio and CV of Fleur Albers (Haarlem) — Front-end Developer (React/Next.js).",
  metadataBase: new URL("https://fleuralbers.nl"),
  openGraph: {
    title: "Fleur Albers — Front-end Developer",
    description:
      "Portfolio and CV — React/Next.js, TypeScript, design systems, multi-tenant apps.",
    url: "https://fleuralbers.nl",
    siteName: "Fleur Albers",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className="min-h-dvh bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
