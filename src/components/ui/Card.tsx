import { clsx } from 'clsx';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50',
        'transition will-change-transform hover:-translate-y-0.5 hover:shadow-md',
        'focus-within:ring-2 focus-within:ring-slate-300',
        'dark:border-slate-800 dark:bg-slate-950/50 dark:focus-within:ring-slate-700',
        'contrast:border-black contrast:bg-white contrast:shadow-none contrast:focus-within:ring-black',
        className,
      )}
      {...props}
    />
  );
}
