import type { Locale } from '@/src/lib/i18n';
import { SiteHeader } from '@/src/components/site/SiteHeader';
import { SiteFooter } from '@/src/components/site/SiteFooter';
import { Container } from '@/src/components/ui/Container';

export function SiteLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(80rem_50rem_at_50%_-10rem,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent)]">
      <SiteHeader locale={locale} />
      <main id="content">
        <Container className="py-10 sm:py-14">{children}</Container>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
