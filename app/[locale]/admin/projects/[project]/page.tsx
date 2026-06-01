import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { MdxEditor } from '@/src/components/admin/MdxEditor';
import { getProfilePageMdxRaw } from '@/src/lib/content';
import { saveProjectContent } from '@/src/lib/actions/auth';

const NEW_PROJECT_TEMPLATE = `---
title: Project Name
company: Company
period: "2024 – present"
tags: ["Next.js", "TypeScript"]
featured: false
---

Describe your project here.
`;

export default async function AdminProjectEditorPage({
  params,
}: {
  params: Promise<{ locale: string; project: string }>;
}) {
  const { locale, project: projectSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/${locale}/admin/login`);

  const user = session.user as AuthUser;
  const slug = user.profileSlug;
  if (!slug) notFound();

  const isNew = projectSlug === 'new';

  let rawContent: string;
  try {
    rawContent = isNew
      ? NEW_PROJECT_TEMPLATE
      : await getProfilePageMdxRaw(slug, locale, `projects/${projectSlug}`);
  } catch {
    rawContent = NEW_PROJECT_TEMPLATE;
  }

  // For new projects, projectSlug is determined by the frontmatter title → use a placeholder
  const effectiveSlug = isNew ? `project-${Date.now()}` : projectSlug;
  const save = saveProjectContent.bind(null, slug, locale, effectiveSlug);

  return (
    <AdminLayout user={user} locale={locale} profileSlug={slug}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text">
          {isNew ? 'New project' : `Edit: ${projectSlug.replace(/-/g, ' ')}`}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Use the frontmatter fields for title, company, period, tags, and featured.
        </p>
      </div>
      <MdxEditor initialContent={rawContent} saveAction={save} label="Save project" />
    </AdminLayout>
  );
}
