import { notFound } from "next/navigation";
import { SiteLayout } from "@/src/components/site/SiteLayout";
import { getProjectSlugs, getProjectMdx } from "@/src/lib/content";
import { Mdx } from "@/src/components/mdx/Mdx";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Build both locales.
  const nl = await getProjectSlugs("nl");
  const en = await getProjectSlugs("en");

  return [
    ...nl.map((slug) => ({ locale: "nl", slug })),
    ...en.map((slug) => ({ locale: "en", slug })),
  ];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "nl" && locale !== "en") return notFound();

  const mdx = await getProjectMdx(locale, slug);

  return (
    <SiteLayout locale={locale}>
      <article className="prose prose-slate max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
