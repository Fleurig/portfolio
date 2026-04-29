import { clsx } from 'clsx';

export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx('mx-auto w-full max-w-5xl px-4 sm:px-6', className)}
      {...props}
    />
  );
}
