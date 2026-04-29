import { Container } from "@/src/components/ui/Container";

export function SiteFooter({ locale }: { locale: "nl" | "en" }) {
  return (
    <footer className="no-print border-t border-slate-200/60">
      <Container className="flex flex-col gap-2 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Fleur Albers — {locale === "en" ? "Haarlem" : "Haarlem"}
        </p>
        <p className="text-slate-500">
          {locale === "en"
            ? "Built with Next.js + MDX."
            : "Gebouwd met Next.js + MDX."}
        </p>
      </Container>
    </footer>
  );
}
