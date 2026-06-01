import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { getProfileProjectSlugs } from '@/src/lib/content';

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/${locale}/admin/login`);

  const user = session.user as AuthUser;
  const slug = user.profileSlug;
  if (!slug) notFound();

  const projectSlugs = await getProfileProjectSlugs(slug, locale);

  return (
    <AdminLayout user={user} locale={locale} profileSlug={slug}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text">Projects</h1>
          <p className="mt-1 text-sm text-text-muted">
            {projectSlugs.length} project{projectSlugs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href={`/${locale}/admin/projects/new`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
          New project
        </Link>
      </div>

      {projectSlugs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-text-muted">No projects yet.</p>
          <Link
            href={`/${locale}/admin/projects/new`}
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            Add your first project
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {projectSlugs.map((projectSlug) => (
            <li key={projectSlug}>
              <Link
                href={`/${locale}/admin/projects/${projectSlug}`}
                className="glass glass-hover rounded-2xl p-4 flex items-center justify-between gap-3 group"
              >
                <span className="font-medium text-text capitalize">
                  {projectSlug.replace(/-/g, ' ')}
                </span>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
