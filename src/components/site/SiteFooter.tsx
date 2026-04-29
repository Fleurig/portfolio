import { Container } from '@/src/components/ui/Container';
import { t } from '@/src/lib/translations';

export function SiteFooter({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);

  return (
    <footer className="no-print border-t border-[var(--color-header-border)] bg-[var(--color-header-surface)] backdrop-blur-md">
      <Container className="flex flex-col gap-2 py-8 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {tr.brand.name} — {tr.brand.location}
        </p>
        <p className="text-[var(--color-text-muted)]">{tr.footer.builtWith}</p>
      </Container>
    </footer>
  );
}
