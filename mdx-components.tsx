import type { MDXComponents } from 'mdx/types';
import { mdxComponents } from '@/src/components/mdx/mdxComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents };
}
