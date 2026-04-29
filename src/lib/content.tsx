import path from "node:path";
import fs from "node:fs/promises";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

import type { Locale } from "@/src/lib/i18n";

export type ProjectFrontmatter = {
  title: string;
  company?: string;
  period?: string;
  url?: string;
  tags?: string[];
};

function contentRoot() {
  return path.join(process.cwd(), "content");
}

async function readFileSafe(filePath: string) {
  return fs.readFile(filePath, "utf8");
}

export const getPageMdx = cache(async (locale: Locale, page: string) => {
  const filePath = path.join(contentRoot(), locale, `${page}.mdx`);
  const source = await readFileSafe(filePath);

  const compiled = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    content: compiled.content,
    frontmatter: compiled.frontmatter as Record<string, unknown>,
  };
});

export const getProjectSlugs = cache(async (locale: Locale) => {
  const dir = path.join(contentRoot(), locale, "projects");
  const entries = await fs.readdir(dir);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
});

export const getAllProjects = cache(async (locale: Locale) => {
  const slugs = await getProjectSlugs(locale);

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(contentRoot(), locale, "projects", `${slug}.mdx`);
      const source = await readFileSafe(filePath);
      const compiled = await compileMDX({
        source,
        options: { parseFrontmatter: true },
      });

      const fm = compiled.frontmatter as ProjectFrontmatter;
      return {
        slug,
        ...fm,
      };
    })
  );

  // Keep a stable order: featured first (by filename), then alphabetical.
  return projects.sort((a, b) => a.title.localeCompare(b.title));
});

export const getProjectMdx = cache(async (locale: Locale, slug: string) => {
  const filePath = path.join(contentRoot(), locale, "projects", `${slug}.mdx`);
  const source = await readFileSafe(filePath);

  const compiled = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    slug,
    content: compiled.content,
    frontmatter: compiled.frontmatter as ProjectFrontmatter,
  };
});
