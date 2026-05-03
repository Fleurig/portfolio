import { getTranslations } from 'next-intl/server';
import { Container } from '@/src/components/ui/Container';

export async function SiteFooter({ locale }: { locale: 'nl' | 'en' }) {
  const t = await getTranslations({ locale });

  return (
    <footer role="contentinfo" className="no-print glass-header">
      <Container className="flex flex-col gap-2 py-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {t('brand.name')}</p>
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
      </Container>
    </footer>
  );
}
