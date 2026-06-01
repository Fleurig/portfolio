import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { cache } from 'react';

import type { Locale } from '@/src/lib/i18n';
import { compileRuntimeMdx } from '@/src/lib/mdxRuntime';

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectFrontmatter = {
  title: string;
  company?: string;
  period?: string;
  url?: string;
  tags?: string[];
  featured?: boolean;
  images?: ProjectImage[];
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
    const compiled = await compileRuntimeMdx(source);

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
        const compiled = await compileRuntimeMdx(source);

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
    const compiled = await compileRuntimeMdx(source);

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

// ── Profile-scoped content helpers ─────────────────────────────────

function profileContentRoot(slug: string) {
  return path.join(contentRoot(), 'profiles', slug);
}

/** Read raw MDX source for a profile page (no compile — used by the editor) */
export async function getProfilePageMdxRaw(
  slug: string,
  locale: string,
  page: string,
): Promise<string> {
  const filePath = path.join(profileContentRoot(slug), locale, `${page}.mdx`);
  return fs.readFile(filePath, 'utf8');
}

/** Compiled MDX for a profile page */
export const getProfilePageMdx = cache(
  async (slug: string, locale: string, page: string) => {
    const filePath = path.join(profileContentRoot(slug), locale, `${page}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');
    try {
      const compiled = await compileRuntimeMdx(source);
      return {
        content: compiled.content,
        frontmatter: compiled.frontmatter as Record<string, unknown>,
      };
    } catch (err) {
      console.error('[mdx] failed compiling profile page:', filePath);
      throw err;
    }
  },
);

/** All project slugs for a profile */
export const getProfileProjectSlugs = cache(async (slug: string, locale: string) => {
  const dir = path.join(profileContentRoot(slug), locale, 'projects');
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
});

/** All projects for a profile */
export const getAllProfileProjects = cache(async (slug: string, locale: string) => {
  const projectSlugs = await getProfileProjectSlugs(slug, locale);

  const projects = await Promise.all(
    projectSlugs.map(async (projectSlug) => {
      const filePath = path.join(profileContentRoot(slug), locale, 'projects', `${projectSlug}.mdx`);
      const source = await fs.readFile(filePath, 'utf8');
      try {
        const compiled = await compileRuntimeMdx(source);
        const fm = compiled.frontmatter as ProjectFrontmatter;
        return { slug: projectSlug, ...fm };
      } catch (err) {
        console.error('[mdx] failed compiling profile project:', filePath);
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

/** Compiled MDX for a single profile project */
export const getProfileProjectMdx = cache(
  async (slug: string, locale: string, projectSlug: string) => {
    const filePath = path.join(
      profileContentRoot(slug),
      locale,
      'projects',
      `${projectSlug}.mdx`,
    );
    const source = await fs.readFile(filePath, 'utf8');
    try {
      const compiled = await compileRuntimeMdx(source);
      return {
        slug: projectSlug,
        content: compiled.content,
        frontmatter: compiled.frontmatter as ProjectFrontmatter,
      };
    } catch (err) {
      console.error('[mdx] failed compiling profile project:', filePath);
      throw err;
    }
  },
);

/** Save MDX content for a profile page (used by server actions) */
export function saveProfilePageMdxSync(
  slug: string,
  locale: string,
  page: string,
  content: string,
): void {
  const filePath = path.join(process.cwd(), 'content', 'profiles', slug, locale, `${page}.mdx`);
  fsSync.mkdirSync(path.dirname(filePath), { recursive: true });
  fsSync.writeFileSync(filePath, content, 'utf8');
}

/** Save a project MDX file */
export function saveProfileProjectMdxSync(
  slug: string,
  locale: string,
  projectSlug: string,
  content: string,
): void {
  const filePath = path.join(
    process.cwd(),
    'content',
    'profiles',
    slug,
    locale,
    'projects',
    `${projectSlug}.mdx`,
  );
  fsSync.mkdirSync(path.dirname(filePath), { recursive: true });
  fsSync.writeFileSync(filePath, content, 'utf8');
}
