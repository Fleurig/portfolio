import { useTranslations } from 'next-intl';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';

export function ProjectCard({
  project,
}: {
  project: {
    title: string;
    company?: string;
    period?: string;
    tags?: string[];
    featured?: boolean;
  };
}) {
  const t = useTranslations('nav');

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-card-text">
              {project.title}
            </h2>
            {project.featured ? <Badge>{t('featured')}</Badge> : null}
          </div>
          {project.company ? (
            <p className="mt-1 text-sm text-card-text-muted">
              {project.company}
            </p>
          ) : null}
        </div>
        {project.period ? (
          <span className="text-xs text-card-text-muted">
            {project.period}
          </span>
        ) : null}
      </div>

      {project.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

