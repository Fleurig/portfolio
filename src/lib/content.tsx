import path from 'node:path';
import fs from 'node:fs/promises';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';

import type { Locale } from '@/src/lib/i18n';

export type ProjectFrontmatter = {
  title: string;
  company?: string;
  period?: string;
  url?: string;
  tags?: string[];
  featured?: boolean;
};

function contentRoot() {
  return path.join(process.cwd(), 'content');
}

async function readFileSafe(filePath: string) {
  return fs.readFile(filePath, 'utf8');
}

export const getPageMdx = cache(async (locale: Locale, page: string) => {
  const filePath = path.join(contentRoot(), locale, `${page}.mdx`);
  const source = await readFileSafe(filePath);

  try {
    const compiled = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return {
      content: compiled.content,
      frontmatter: compiled.frontmatter as Record<string, unknown>,
    };
  } catch (err) {
    console.error('[mdx] failed compiling:', filePath);
    throw err;
  }
});

export const getProjectSlugs = cache(async (locale: Locale) => {
  const dir = path.join(contentRoot(), locale, 'projects');
  const entries = await fs.readdir(dir);
  return entries.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
});

export const getAllProjects = cache(async (locale: Locale) => {
  const slugs = await getProjectSlugs(locale);

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(contentRoot(), locale, 'projects', `${slug}.mdx`);
      const source = await readFileSafe(filePath);

      try {
        const compiled = await compileMDX({
          source,
          options: { parseFrontmatter: true },
        });

        const fm = compiled.frontmatter as ProjectFrontmatter;
        return {
          slug,
          ...fm,
        };
      } catch (err) {
        console.error('[mdx] failed compiling project:', filePath);
        throw err;
      }
    }),
  );

  return projects.sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return a.title.localeCompare(b.title);
  });
});

export const getProjectMdx = cache(async (locale: Locale, slug: string) => {
  const filePath = path.join(contentRoot(), locale, 'projects', `${slug}.mdx`);
  const source = await readFileSafe(filePath);

  try {
    const compiled = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return {
      slug,
      content: compiled.content,
      frontmatter: compiled.frontmatter as ProjectFrontmatter,
    };
  } catch (err) {
    console.error('[mdx] failed compiling:', filePath);
    throw err;
  }
});
