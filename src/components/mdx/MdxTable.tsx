import type { ComponentProps } from 'react';

export function MdxTable(props: ComponentProps<'table'>) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      />
    </div>
  );
}
