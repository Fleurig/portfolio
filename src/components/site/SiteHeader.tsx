import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { LanguageSwitch } from "@/src/components/site/LanguageSwitch";
import type { Locale } from "@/src/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Fleur Albers
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            href={`/${locale}/cv`}
          >
            {locale === "en" ? "CV" : "CV"}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            href={`/${locale}/projects`}
          >
            {locale === "en" ? "Projects" : "Projecten"}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            href={`/${locale}/contact`}
          >
            {locale === "en" ? "Contact" : "Contact"}
          </Link>
          <LanguageSwitch locale={locale} />
        </nav>
      </Container>
    </header>
  );
}
