import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProfilePageMdx } from '@/src/lib/content';
import { getProfile } from '@/src/lib/profiles';
import { Mdx } from '@/src/components/mdx/Mdx';
import { PrintCVButton } from '@/src/components/site/PrintCVButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const profile = await getProfile(slug);
    return {
      title: `CV — ${profile.displayName}`,
      description: `CV of ${profile.displayName}`,
      openGraph: { title: `CV — ${profile.displayName}`, locale },
    };
  } catch {
    return {};
  }
}

export default async function ProfileCvPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  let mdx;
  try {
    mdx = await getProfilePageMdx(slug, locale, 'cv');
  } catch {
    return notFound();
  }

  const t = await getTranslations({ locale });
  const base = `/${locale}/portfolio/${slug}`;

  return (
    <SiteLayout locale={locale} backHref={base}>
      {/* Print toolbar */}
      <div className="no-print mb-8 glass glass--elevated rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{t('pages.cvTip')}</p>
          <PrintCVButton label={t('pages.cvDownload')} />
        </div>
      </div>

      <article className="prose max-w-none print:prose-sm">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
