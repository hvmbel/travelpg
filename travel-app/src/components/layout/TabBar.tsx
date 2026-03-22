"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Home, LayoutGrid, PlaneTakeoff, Smartphone } from "lucide-react";

const tabs = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/esim", label: "eSIM", icon: Smartphone },
  { href: "/card", label: "Карта", icon: CreditCard },
  { href: "/trip", label: "Поездка", icon: PlaneTakeoff },
  { href: "/store", label: "Витрина", icon: LayoutGrid },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-200 bg-surface-primary/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur sm:left-1/2 sm:right-auto sm:w-[430px] sm:-translate-x-1/2 sm:rounded-b-[28px]">
      <ul className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-2 text-[11px] transition-colors duration-200 ${
                  active ? "text-brand-blue" : "text-text-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
