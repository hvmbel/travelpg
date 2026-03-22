import Link from "next/link";

export type CountryGridItem = {
  countryCode: string;
  country: string;
  minPriceRub: number;
};

type CountryGridProps = {
  countries: CountryGridItem[];
};

function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function formatRub(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export function CountryGrid({ countries }: CountryGridProps) {
  return (
    <section className="space-y-3" aria-label="Список стран eSIM">
      <h2 className="text-lg font-semibold text-text-primary">Купить eSIM</h2>

      <div className="grid grid-cols-2 gap-3">
        {countries.map((country) => (
          <Link
            key={country.countryCode}
            href={`/esim/${country.countryCode}`}
            className="rounded-2xl bg-surface-primary p-3 shadow-sm transition-colors hover:bg-brand-light"
          >
            <p className="text-lg">{countryCodeToFlag(country.countryCode)}</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">{country.country}</p>
            <p className="mt-1 text-xs text-text-secondary">от {formatRub(country.minPriceRub)} ₽</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
