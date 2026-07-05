'use client';

import { useId } from 'react';
import { clsx } from 'clsx';

const controlClass =
  'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus-ring';

export function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={controlClass}
      />
    </div>
  );
}

export function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={clsx(controlClass, 'resize-y')}
      />
    </div>
  );
}

/** Small square icon button used for list actions (move up/down, remove). */
export function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="btn btn-surface h-8 w-8 shrink-0 p-0"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-surface px-3 py-2">
      <span aria-hidden="true">＋</span> {label}
    </button>
  );
}
