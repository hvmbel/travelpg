import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PackagePicker } from "@/components/esim/PackagePicker";
import { getPlansByCountry } from "../../../../db/queries";

type CountryPageProps = {
  params: Promise<{ countryCode: string }>;
};

function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export default async function EsimCountryPage({ params }: CountryPageProps) {
  const resolved = await params;
  const countryCode = resolved.countryCode.toUpperCase();
  const plans = getPlansByCountry(countryCode);

  if (plans.length === 0) {
    notFound();
  }

  const countryName = plans[0].country;

  return (
    <section className="space-y-4 py-2">
      <header className="flex items-center gap-3">
        <Link
          href="/esim"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-primary shadow-sm"
          aria-label="Назад к eSIM"
        >
          <ArrowLeft className="h-4 w-4 text-text-primary" />
        </Link>
        <div>
          <p className="text-lg font-semibold text-text-primary">
            {countryCodeToFlag(countryCode)} {countryName}
          </p>
          <p className="text-sm text-text-secondary">Выберите подходящий пакет</p>
        </div>
      </header>

      <PackagePicker plans={plans} countryName={countryName} />
    </section>
  );
}
