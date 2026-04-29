import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { t } from '@/src/lib/translations';

export function ProjectCard({
  project,
  locale,
}: {
  project: {
    title: string;
    company?: string;
    period?: string;
    tags?: string[];
    featured?: boolean;
  };
  locale: 'nl' | 'en';
}) {
  const tr = t(locale);

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-[var(--color-card-text)]">
              {project.title}
            </h2>
            {project.featured ? <Badge>{tr.nav.featured}</Badge> : null}
          </div>
          {project.company ? (
            <p className="mt-1 text-sm text-[var(--color-card-text-muted)]">
              {project.company}
            </p>
          ) : null}
        </div>
        {project.period ? (
          <span className="text-xs text-[var(--color-text-muted)]">
            {project.period}
          </span>
        ) : null}
      </div>

      {project.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
