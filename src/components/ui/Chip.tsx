export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass glass--elevated inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-[var(--color-text-muted)] transition hover:-translate-y-0.5 hover:opacity-95">
      {children}
    </span>
  );
}
