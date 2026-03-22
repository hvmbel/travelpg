import { Badge } from "@/components/ui/badge";
import { Car, Hotel, ShieldCheck, Sofa } from "lucide-react";

const SERVICES = [
  { name: "Бронирование жилья", icon: Hotel, status: "active" as const },
  { name: "Аренда авто", icon: Car, status: "soon" as const },
  { name: "Страховка", icon: ShieldCheck, status: "soon" as const },
  { name: "VIP-залы", icon: Sofa, status: "soon" as const },
];

export default function TripPage() {
  return (
    <section className="space-y-4 py-2">
      <h1 className="text-2xl font-semibold text-text-primary">Поездка</h1>

      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isSoon = service.status === "soon";

          return (
            <article key={service.name} className="space-y-3 rounded-2xl bg-surface-primary p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge className={isSoon ? "bg-brand-orange text-white" : "bg-brand-green text-white"}>
                  {isSoon ? "Скоро" : "Доступно"}
                </Badge>
              </div>
              <p className="text-sm font-medium text-text-primary">{service.name}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
