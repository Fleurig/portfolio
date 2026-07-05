# CV Studio

Bilingual (NL/EN) CV-builder platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MDX**.

Visitors build their own CV at `/{locale}/builder`: customizable colors, fonts, layouts and section order, with a live preview and PDF export (via print). Everything is **private by default** — the CV is stored only in the visitor's browser (localStorage), and share links carry the data in the URL fragment, so it never reaches a server. A disabled ad-slot placeholder (`src/components/cv/AdSlot.tsx`) is reserved for future low-key ads to cover hosting.

The original portfolio pages (`/{locale}/cv`, `/{locale}/projects`, `/{locale}/contact`) still exist but are no longer linked from the navigation.

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
