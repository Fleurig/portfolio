import { BackButton } from '@/src/components/ui/BackButton';

export function PageHeader({
  title,
  backHref,
}: {
  title?: string;
  backHref?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {backHref ? <BackButton fallback={backHref} /> : null}

      {title ? (
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          {title}
        </h1>
      ) : null}
    </div>
  );
}

