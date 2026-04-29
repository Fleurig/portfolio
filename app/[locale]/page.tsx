import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/src/components/site/SiteLayout";
import { getPageMdx } from "@/src/lib/content";
import { Mdx } from "@/src/components/mdx/Mdx";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Home" : "Home";
  return { title };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "nl" && locale !== "en") return notFound();

  const mdx = await getPageMdx(locale, "home");

  return (
    <SiteLayout locale={locale}>
      <Mdx source={mdx} />
    </SiteLayout>
  );
}
