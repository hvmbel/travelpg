"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Banner } from "@/lib/types";

type BannerCarouselProps = {
  banners: Banner[];
};

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeBanners = useMemo(() => banners.filter((banner) => banner.title.trim().length > 0), [banners]);

  if (safeBanners.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3" aria-label="Промо-баннеры">
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
        onScroll={(event) => {
          const target = event.currentTarget;
          const nextIndex = Math.round(target.scrollLeft / target.clientWidth);
          const clamped = Math.max(0, Math.min(nextIndex, safeBanners.length - 1));

          if (clamped !== activeIndex) {
            setActiveIndex(clamped);
          }
        }}
      >
        {safeBanners.map((banner) => {
          const content = (
            <article
              className="h-[120px] w-full min-w-full snap-start rounded-2xl p-5 text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${banner.gradient_from}, ${banner.gradient_to})`,
              }}
            >
              <p className="text-xl font-bold leading-tight">{banner.title}</p>
              {banner.subtitle ? <p className="mt-2 text-sm font-semibold text-white/90">{banner.subtitle}</p> : null}
            </article>
          );

          if (banner.link_to) {
            return (
              <Link key={banner.id} href={banner.link_to} className="block w-full min-w-full snap-start">
                {content}
              </Link>
            );
          }

          return (
            <div key={banner.id} className="w-full min-w-full snap-start">
              {content}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-1.5" aria-label="Индикатор баннеров">
        {safeBanners.map((banner, index) => (
          <span
            key={banner.id}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-5 bg-brand-blue" : "w-2 bg-text-muted/40"}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}
