import { clsx } from 'clsx';

export function Badge({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700',
        'dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200',
        className,
      )}
      {...props}
    />
  );
}
