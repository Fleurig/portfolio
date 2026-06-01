# Portfolio — Multi-profile site

Bilingual (NL/EN) portfolio & CV website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **MDX**.  
Supports multiple user profiles, a WYSIWYG admin editor, and print-ready CV export.

## Requirements

- Node.js **>= 20**
- pnpm (or npm)

## Getting started

```bash
pnpm install
cp .env.example .env.local  # fill in secrets
pnpm dev
```

Open http://localhost:3000

## Locales

- Dutch: `/nl`
- English: `/en`

Visiting `/` redirects to `/nl`.

---

## Multi-profile system

Each user has their own profile slug (e.g. `fleurig`).

| URL | Description |
|-----|-------------|
| `/en/portfolio/fleurig` | Fleur's public home page |
| `/en/portfolio/fleurig/cv` | Fleur's public CV |
| `/en/portfolio/fleurig/projects` | Fleur's public projects |
| `/en/portfolio/fleurig/contact` | Fleur's contact page |

### Add a new profile

1. Register an account at `/en/admin/register` — a profile slug will be created automatically from your name.
2. Your content directory is scaffolded at `content/profiles/<slug>/en/` and `content/profiles/<slug>/nl/`.
3. Edit your profile via the admin panel at `/en/admin`.

Profile metadata lives in `data/profiles/<slug>/profile.json`.  
All active profiles are listed in `data/profiles/index.json`.

---

## Admin panel

Visit `/en/admin` (or `/nl/admin`). An **Admin** link is shown in the footer in development mode.

### Authentication

The site uses [BetterAuth](https://www.better-auth.com) with email + password.  
The SQLite database is stored at `./portfolio.db` (excluded from git).

Environment variables needed (copy `.env.example` → `.env.local`):

| Variable | Description |
|----------|-------------|
| `BETTER_AUTH_SECRET` | Random 32+ char secret for signing sessions |
| `BETTER_AUTH_URL` | Full URL of your site (e.g. `https://yoursite.com`) |
| `ADMIN_EMAIL` | Email address that is auto-promoted to admin on first sign-in |
| `DATABASE_PATH` | Path to SQLite file (default `./portfolio.db`) |
| `NEXT_PUBLIC_APP_URL` | Public URL (used in emails, OG tags) |
| `NEXT_PUBLIC_SHOW_ADMIN` | Set `"true"` to show the admin footer link in production |

### First run

1. Set `ADMIN_EMAIL` to your email in `.env.local`.
2. Register at `/en/admin/register` — your account is auto-promoted to admin.
3. Log in at `/en/admin/login` and start editing.

### Roles

| Role | Permissions |
|------|-------------|
| `admin` | Can edit any profile |
| `user` | Can only edit their own profile |

---

## PDF / Print export of CV

Each CV page has a **Print / Download as PDF** button. When clicked it opens the browser's native print dialog — choose "Save as PDF" as the destination.

The print layout hides navigation, headers, footers, and admin UI via `@media print` + `.no-print` classes.

A dedicated print-optimized route also exists at `/en/cv/print`.

---

## Editing content (MDX)

Profile content lives in:

```
content/profiles/<slug>/en/home.mdx
content/profiles/<slug>/en/cv.mdx
content/profiles/<slug>/en/contact.mdx
content/profiles/<slug>/en/projects/<project-slug>.mdx
content/profiles/<slug>/nl/…
```

You can also edit content via the admin WYSIWYG editor at `/en/admin`.

The original `content/en/` and `content/nl/` directories are kept for the default `/[locale]/cv` route.

### Add a new project (via admin)

1. Go to `/en/admin/projects` and click **New project**.
2. Fill in the MDX frontmatter (`title`, `company`, `period`, `tags`, `featured`).
3. Save — the file is written to `content/profiles/<slug>/<locale>/projects/<slug>.mdx`.

### Add a new project (manually)

1. Create `content/profiles/<slug>/en/projects/<slug>.mdx`
2. Add frontmatter: `title`, `company`, `period`, `tags[]`, `featured` (boolean)

---

## Deploy

### Vercel (recommended)

1. Import the repo in Vercel.
2. Set all env vars from `.env.example` in the Vercel dashboard.
3. Build command: `pnpm build` — Output: Next.js default.

> **Important**: The admin save actions use `fs.writeFileSync` which works on Node.js servers (Railway, Fly.io, VPS) but **will fail on Vercel** (read-only filesystem). On Vercel, either use a database-backed storage adapter or commit changes through the Git provider API.

### Self-hosted (Railway / Fly.io / VPS)

Works fully including the filesystem save actions. Set `BETTER_AUTH_URL` to your public domain.

`vercel.json` is included for sane defaults.

