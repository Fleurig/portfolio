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
  };
}) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 contrast:text-black">
            {project.title}
          </h2>
          {project.company ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 contrast:text-black">
              {project.company}
            </p>
          ) : null}
        </div>
        {project.period ? (
          <span className="text-xs text-slate-500 dark:text-slate-400 contrast:text-black">
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
