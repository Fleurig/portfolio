import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProfilePageMdx } from '@/src/lib/content';
import { getProfile } from '@/src/lib/profiles';
import { Mdx } from '@/src/components/mdx/Mdx';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const profile = await getProfile(slug);
    return {
      title: `Contact — ${profile.displayName}`,
      description: `Get in touch with ${profile.displayName}`,
      openGraph: { locale },
    };
  } catch {
    return {};
  }
}

export default async function ProfileContactPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const base = `/${locale}/portfolio/${slug}`;

  let mdx;
  try {
    mdx = await getProfilePageMdx(slug, locale, 'contact');
  } catch {
    return notFound();
  }

  return (
    <SiteLayout locale={locale} backHref={base}>
      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
