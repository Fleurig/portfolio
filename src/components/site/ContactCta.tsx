import { useTranslations } from 'next-intl';
import { Card } from '@/src/components/ui/Card';

export function ContactCta() {
  const t = useTranslations('contact');

  return (
    <Card className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-card-text">
            {t('heading')}
          </h2>
          <p className="mt-1 text-sm text-card-text-muted">
            {t('subheading')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="mailto:fleuralbers@live.nl"
            className="glass inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-card-text transition hover:opacity-90"
            aria-label={t('emailLabel')}
          >
            {t('email')}
          </a>
          <a
            href="https://www.linkedin.com/in/fleuralbers/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-card-text transition hover:opacity-90"
            aria-label={t('linkedInLabel')}
          >
            LinkedIn
            <span aria-hidden="true" className="ml-1 text-xs text-card-text-muted">
              ↗
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}

