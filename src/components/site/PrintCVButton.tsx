'use client';

type Props = {
  label?: string;
  printUrl?: string;
};

export function PrintCVButton({ label = 'Print / Save as PDF', printUrl }: Props) {
  const handleClick = () => {
    if (printUrl) {
      window.open(printUrl, '_blank');
    } else {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="no-print inline-flex shrink-0 items-center gap-2 rounded-xl bg-text px-4 py-2 text-sm font-semibold text-bg shadow-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
    >
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 7H2a1 1 0 0 0-1 1v5h2v-2h10v2h2V8a1 1 0 0 0-1-1h-2" />
        <rect x="4" y="1" width="8" height="7" rx="1" />
        <path d="M4 12h8" />
      </svg>
      {label}
    </button>
  );
}
