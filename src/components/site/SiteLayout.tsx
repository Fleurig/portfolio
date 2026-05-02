import type { ReactNode } from 'react';
import type { Locale } from '@/src/lib/i18n';
import { SiteHeader } from '@/src/components/site/SiteHeader';
import { SiteFooter } from '@/src/components/site/SiteFooter';
import { Container } from '@/src/components/ui/Container';
import { PageHeader } from '@/src/components/site/PageHeader';

export function SiteLayout({
  locale,
  title,
  backHref,
  children,
}: {
  locale: Locale;
  title?: string;
  backHref?: string;
  children: ReactNode;
}) {
  return (
    <div className="site-shell">
      <SiteHeader locale={locale} />
      <main id="content" className="flex-1">
        <Container className="py-10 sm:py-14">
          {title || backHref ? (
            <div className="mb-8">
              <PageHeader title={title} backHref={backHref} />
            </div>
          ) : null}
          {children}
        </Container>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
