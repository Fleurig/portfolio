import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { AdminLayout } from '@/src/components/admin/AdminLayout';
import { MdxEditor } from '@/src/components/admin/MdxEditor';
import { getProfilePageMdxRaw } from '@/src/lib/content';
import { savePageContent } from '@/src/lib/actions/auth';

export default async function AdminContactPage({
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
    rawContent = await getProfilePageMdxRaw(slug, locale, 'contact');
  } catch {
    rawContent = `---\ntitle: Contact\nemail: ${user.email}\nlinkedin: \navailability: Open to opportunities\n---\n\nFeel free to reach out.`;
  }

  const save = savePageContent.bind(null, slug, locale, 'contact');

  return (
    <AdminLayout user={user} locale={locale} profileSlug={slug}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text">Edit Contact</h1>
        <p className="mt-1 text-sm text-text-muted">
          Update your contact details. Use the frontmatter fields for email, linkedin, and availability.
        </p>
      </div>
      <MdxEditor initialContent={rawContent} saveAction={save} label="Save contact page" />
    </AdminLayout>
  );
}
