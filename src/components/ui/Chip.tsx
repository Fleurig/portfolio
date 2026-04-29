export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass glass--elevated glass-hover inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}
