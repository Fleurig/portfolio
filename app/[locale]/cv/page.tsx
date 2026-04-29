import { notFound } from "next/navigation";
import { SiteLayout } from "@/src/components/site/SiteLayout";
import { getPageMdx } from "@/src/lib/content";
import { Mdx } from "@/src/components/mdx/Mdx";

export const dynamic = "force-static";

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "nl" && locale !== "en") return notFound();

  const mdx = await getPageMdx(locale, "cv");

  return (
    <SiteLayout locale={locale}>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <a
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          href={
            locale === "en"
              ? "/cv-fleur-albers-en.pdf"
              : "/cv-fleur-albers-nl.pdf"
          }
        >
          {locale === "en" ? "Download CV (PDF)" : "Download CV (PDF)"}
        </a>
        <p className="text-sm text-slate-600">
          {locale === "en"
            ? "Tip: use your browser print dialog for a clean A4 export."
            : "Tip: gebruik je browser print-dialog voor een nette A4 export."}
        </p>
      </div>

      <article className="prose prose-slate max-w-none print:prose-sm">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
