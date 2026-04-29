import { notFound } from 'next/navigation';
import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';

export const dynamic = 'force-static';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const mdx = await getPageMdx(locale, 'contact');

  return (
    <SiteLayout locale={locale}>
      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
