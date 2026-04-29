"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/src/lib/i18n";
import { otherLocale } from "@/src/lib/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target = otherLocale(locale);

  // Replace leading /nl or /en with the target locale.
  const nextPath = pathname.replace(/^\/(nl|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={nextPath}
      className="ml-1 inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      aria-label={locale === "en" ? "Switch language" : "Wissel taal"}
    >
      {target.toUpperCase()}
    </Link>
  );
}
