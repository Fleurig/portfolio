import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';

export const metadata: Metadata = {
  title: 'CV — Print',
  robots: { index: false },
};

export default async function CvPrintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  let mdx;
  try {
    mdx = await getPageMdx(locale, 'cv');
  } catch {
    return notFound();
  }

  return (
    <html lang={locale} className="print-page">
      <body className="bg-white font-sans text-gray-900">
        <main className="mx-auto max-w-3xl px-6 py-8 print:max-w-none print:px-0 print:py-0">
          <article className="prose max-w-none prose-sm prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-8 prose-h2:text-lg prose-h3:mt-4 prose-h3:text-base">
            <Mdx source={mdx} />
          </article>
        </main>
      </body>
    </html>
  );
}
