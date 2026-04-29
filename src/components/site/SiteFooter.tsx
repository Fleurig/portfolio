import { Container } from '@/src/components/ui/Container';
import { t } from '@/src/lib/translations';

export function SiteFooter({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);

  return (
    <footer className="no-print border-t border-slate-200/60 dark:border-slate-800/60">
      <Container className="flex flex-col gap-2 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-300">
        <p>
          © {new Date().getFullYear()} {tr.brand.name} — {tr.brand.location}
        </p>
        <p className="text-slate-500 dark:text-slate-400">{tr.footer.builtWith}</p>
      </Container>
    </footer>
  );
}
