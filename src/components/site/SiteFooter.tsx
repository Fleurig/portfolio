import { Container } from '@/src/components/ui/Container';
import { t } from '@/src/lib/translations';

export function SiteFooter({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);

  return (
    <footer className="no-print border-t border-header-border bg-header-surface backdrop-blur-md">
      <Container className="flex flex-col gap-2 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {tr.brand.name}</p>
        <a
          href="https://www.linkedin.com/in/fleuralbers/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          aria-label={locale === 'nl' ? 'LinkedIn profiel (opent in nieuw tabblad)' : 'LinkedIn profile (opens in a new tab)'}
        >
          LinkedIn
          <span aria-hidden="true" className="text-xs">↗</span>
        </a>
      </Container>
    </footer>
  );
}
