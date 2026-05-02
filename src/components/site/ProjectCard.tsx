import { useTranslations } from 'next-intl';
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
    <div className="glass-card group relative h-full overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300">
      {/* Accent gradient bar */}
      <div
        aria-hidden="true"
        className="card-accent-bar absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
      />

      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="min-w-0 flex-1">
          {/* Featured label */}
          {project.featured ? (
            <p
              className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary"
            >
              {t('featured')}
            </p>
          ) : null}

          <h2 className="text-base font-semibold tracking-tight text-text leading-snug">
            {project.title}
          </h2>

          {project.company ? (
            <p className="mt-0.5 text-sm text-text-muted">{project.company}</p>
          ) : null}
        </div>

        {/* Period badge + hover arrow */}
        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          {project.period ? (
            <span className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-text-muted">
              {project.period}
            </span>
          ) : null}

          <svg
            aria-hidden="true"
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-70"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </div>
      </div>

      {project.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {project.tags.length > 5 ? (
            <span className="self-center text-xs text-text-muted">
              +{project.tags.length - 5}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

