import type { ComponentProps } from "react";

type Props = {
  source: { content: React.ReactNode };
} & ComponentProps<"div">;

export function Mdx({ source, className, ...props }: Props) {
  return (
    <div className={className} {...props}>
      {source.content}
    </div>
  );
}
