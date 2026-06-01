import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { MdxEditor } from '@/src/components/admin/MdxEditor';
import { getProfilePageMdxRaw } from '@/src/lib/content';
import { savePageContent } from '@/src/lib/actions/auth';

export default async function AdminHomePage({
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

  let rawContent: string;
  try {
    rawContent = await getProfilePageMdxRaw(slug, locale, 'home');
  } catch {
    rawContent = `---\ntitle: About me\n---\n\nWrite your bio here.`;
  }

  const save = savePageContent.bind(null, slug, locale, 'home');

  return (
    <AdminLayout user={user} locale={locale} profileSlug={slug}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text">Edit Home / About</h1>
        <p className="mt-1 text-sm text-text-muted">
          This is the &ldquo;About me&rdquo; section shown on your portfolio home page.
        </p>
      </div>
      <MdxEditor initialContent={rawContent} saveAction={save} label="Save home page" />
    </AdminLayout>
  );
}
