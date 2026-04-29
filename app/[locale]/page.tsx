import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { t } from '@/src/lib/translations';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return {};
  const tr = t(locale);

  return {
    title: tr.seo.homeTitle,
    description: tr.seo.homeDescription,
    openGraph: {
      title: tr.seo.homeTitle,
      description: tr.seo.homeDescription,
      locale,
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const tr = t(locale);
  const mdx = await getPageMdx(locale, 'home');

  return (
    <SiteLayout locale={locale} title={tr.seo.homeTitle} backHref={`/${locale}`}>
      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
