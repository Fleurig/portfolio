# Fleur Albers — Portfolio

Bilingual (NL/EN) portfolio & CV website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MDX**.

## Requirements

- Node.js **>= 20**
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Locales

- Dutch: `/nl`
- English: `/en`

Visiting `/` redirects to `/nl`.

## Editing content (MDX)

Content lives in:

- `content/nl/*.mdx`
- `content/en/*.mdx`
- Projects: `content/<locale>/projects/*.mdx`

### Add a new project

1. Create a file in `content/nl/projects/<slug>.mdx` and `content/en/projects/<slug>.mdx`
2. Add `title`, `company`, `period`, and `url` in frontmatter.

## CV PDFs

Placeholders are in:

- `public/cv-fleur-albers.pdf`
- `public/cv-fleur-albers.pdf`

Replace them with your real PDFs.

## Deploy (Vercel)

1. Import the repo in Vercel
2. Framework preset: Next.js
3. Build command: `pnpm build`
4. Output: Next.js default

`vercel.json` is included for sane defaults.
