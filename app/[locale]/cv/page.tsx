import { notFound } from 'next/navigation';
import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { t } from '@/src/lib/translations';

export const dynamic = 'force-static';

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const tr = t(locale);
  const mdx = await getPageMdx(locale, 'cv');

  return (
    <SiteLayout locale={locale}>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <a
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
          href={
            locale === 'en'
              ? '/cv-fleur-albers-en.pdf'
              : '/cv-fleur-albers-nl.pdf'
          }
        >
          {tr.pages.cvDownload}
        </a>
        <p className="text-sm text-slate-600 dark:text-slate-300">{tr.pages.cvTip}</p>
      </div>

      <article className="prose prose-slate max-w-none print:prose-sm dark:prose-invert">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
