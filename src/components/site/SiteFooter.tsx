import { getTranslations } from 'next-intl/server';
import { Container } from '@/src/components/ui/Container';

export async function SiteFooter({ locale }: { locale: 'nl' | 'en' }) {
  const t = await getTranslations({ locale });
  const showAdmin = process.env.NEXT_PUBLIC_SHOW_ADMIN === 'true' || process.env.NODE_ENV === 'development';

  return (
    <footer role="contentinfo" className="no-print glass-header">
      <Container className="flex flex-col gap-2 py-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {t('brand.name')}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/fleuralbers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            aria-label={t('footer.linkedInLabel')}
          >
            LinkedIn
            <span aria-hidden="true" className="text-xs">↗</span>
          </a>
          {showAdmin && (
            <a
              href={`/${locale}/admin`}
              className="opacity-50 hover:opacity-100 transition-opacity text-xs"
            >
              Admin
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
