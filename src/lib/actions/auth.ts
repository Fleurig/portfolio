'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth';
import {
  saveProfilePageMdxSync,
  saveProfileProjectMdxSync,
} from '@/src/lib/content';
import { scaffoldProfileContent } from '@/src/lib/profiles';
import type { AuthUser } from '@/src/lib/auth';

async function requireOwnerOrAdmin(slug: string): Promise<AuthUser> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Not authenticated');

  const user = session.user as AuthUser;
  const isAdmin = user.role === 'admin';
  const isOwner = user.profileSlug === slug;

  if (!isAdmin && !isOwner) {
    throw new Error('Not authorized: you do not own this profile');
  }
  return user;
}

/** Save a page's MDX content (home, cv, contact) for a profile */
export async function savePageContent(
  slug: string,
  locale: string,
  page: string,
  content: string,
): Promise<{ success: true }> {
  await requireOwnerOrAdmin(slug);
  saveProfilePageMdxSync(slug, locale, page, content);
  revalidatePath(`/${locale}/portfolio/${slug}`);
  revalidatePath(`/${locale}/portfolio/${slug}/${page}`);
  return { success: true };
}

/** Save a project's MDX content for a profile */
export async function saveProjectContent(
  slug: string,
  locale: string,
  projectSlug: string,
  content: string,
): Promise<{ success: true }> {
  await requireOwnerOrAdmin(slug);
  saveProfileProjectMdxSync(slug, locale, projectSlug, content);
  revalidatePath(`/${locale}/portfolio/${slug}/projects`);
  revalidatePath(`/${locale}/portfolio/${slug}/projects/${projectSlug}`);
  return { success: true };
}

/** Register a new user and scaffold their profile content */
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  profileSlug: string;
  locale: string;
}): Promise<{ error?: string }> {
  const { name, email, password, profileSlug, locale } = data;

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(profileSlug)) {
    return { error: 'Profile slug may only contain lowercase letters, numbers, and hyphens.' };
  }

  // Check if slug is already taken
  try {
    const { getAllProfiles } = await import('@/src/lib/profiles');
    const existing = await getAllProfiles();
    if (existing.includes(profileSlug)) {
      return { error: 'This profile slug is already taken. Please choose another.' };
    }
  } catch {
    // index.json might not exist yet — that's fine
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password, name, profileSlug },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { error: msg };
  }

  // Scaffold content directories
  scaffoldProfileContent(profileSlug);

  redirect(`/${locale}/admin/login?registered=1`);
}

/** Log out the current user */
export async function logoutAction(locale: string): Promise<void> {
  await auth.api.signOut({ headers: await headers() });
  redirect(`/${locale}/admin/login`);
}
