"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { carouselSlides } from "./landing-data";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = carouselSlides[activeIndex];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/30">
      <div className="relative min-h-[520px]">
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="max-w-xl space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-5 text-white backdrop-blur-xl sm:p-6">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Serviço em destaque
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{slide.title}</h3>
              <p className="text-sm leading-6 text-white/75 sm:text-base">{slide.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() =>
            setActiveIndex((current) => (current - 1 + carouselSlides.length) % carouselSlides.length)
          }
          className="border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-sm">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setActiveIndex((current) => (current + 1) % carouselSlides.length)}
          className="border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
