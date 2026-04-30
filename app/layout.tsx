import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://fleuralbers.nl'),
  openGraph: {
    url: 'https://fleuralbers.nl',
    siteName: 'Fleur Albers',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// The root layout is a minimal passthrough. The [locale] layout provides
// the <html> and <body> elements so the lang attribute can be set correctly.
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
