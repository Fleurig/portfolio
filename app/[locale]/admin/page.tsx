import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { logoutAction, ROLE_ADMIN } from '@/src/lib/actions/auth';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/${locale}/admin/login`);

  const user = session.user as AuthUser;
  const slug = user.profileSlug ?? '';

  const pages = [
    { href: `/${locale}/admin/home`, icon: '🏠', label: 'Home / About', description: 'Your intro, bio, and hero section' },
    { href: `/${locale}/admin/cv`, icon: '📄', label: 'CV', description: 'Work experience, skills, education' },
    { href: `/${locale}/admin/projects`, icon: '🗂️', label: 'Projects', description: 'Add, edit, or remove projects' },
    { href: `/${locale}/admin/contact`, icon: '✉️', label: 'Contact', description: 'Email, LinkedIn, availability' },
  ];

  const profileUrl = slug ? `/${locale}/portfolio/${slug}` : null;

  const logoutWithLocale = logoutAction.bind(null, locale);

  return (
    <AdminLayout user={user} locale={locale} profileSlug={slug}>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Manage your portfolio content below.
        </p>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-1.5 text-sm text-text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 12L12 4M12 4H6M12 4v6" />
            </svg>
            View public portfolio
          </a>
        )}
      </div>

      {/* Content sections grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="glass glass--elevated glass-hover rounded-2xl p-5 focus-ring group"
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl"
              >
                {page.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-text">{page.label}</p>
                <p className="mt-0.5 text-sm text-text-muted">{page.description}</p>
              </div>
              <svg
                aria-hidden="true"
                className="ml-auto h-4 w-4 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Profile info card */}
      <div className="mt-8 rounded-2xl border border-border-muted bg-surface-muted p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Your profile
        </h2>
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">Name</dt>
            <dd className="font-medium text-text">{user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Email</dt>
            <dd className="font-medium text-text">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Slug</dt>
            <dd className="font-mono text-xs text-text">{slug || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Role</dt>
            <dd>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary capitalize">
                {user.role ?? 'user'}
              </span>
            </dd>
          </div>
        </dl>
        <form action={logoutWithLocale} className="mt-4">
          <button
            type="submit"
            className="text-sm text-text-muted underline underline-offset-2 hover:text-text"
          >
            Sign out
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
