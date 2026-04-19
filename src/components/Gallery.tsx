import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const Gallery = ({ images }: { images: { src: string; alt: string }[] }) => {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a !== null ? (a + 1) % images.length : a));
      if (e.key === "ArrowLeft") setActive((a) => (a !== null ? (a - 1 + images.length) % images.length : a));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden aspect-square ${i % 5 === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500 flex items-end p-4">
              <span className="text-cream text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {img.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
        >
          <button onClick={() => setActive(null)} className="absolute top-6 right-6 text-cream hover:text-gold p-2" aria-label="Close">
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a !== null ? (a - 1 + images.length) % images.length : a)); }}
            className="absolute left-4 md:left-10 text-cream hover:text-gold p-3 hover:scale-110 transition-transform"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img src={images[active].src} alt={images[active].alt} className="max-w-[90vw] max-h-[85vh] object-contain shadow-warm" onClick={(e) => e.stopPropagation()} />
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a !== null ? (a + 1) % images.length : a)); }}
            className="absolute right-4 md:right-10 text-cream hover:text-gold p-3 hover:scale-110 transition-transform"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-8 left-0 right-0 text-center text-cream/80 text-sm tracking-widest uppercase">
            {images[active].alt} · {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
