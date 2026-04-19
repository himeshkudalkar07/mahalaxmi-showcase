import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#reserve", label: "Reserve" },
  { href: "#visit", label: "Visit" },
];

export const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/85 border-b border-border/60 shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="relative">
            <span className={`block w-10 h-10 rounded-full grid place-items-center font-display text-xl font-semibold transition-colors ${scrolled ? "bg-spice text-cream" : "bg-gold text-ink"}`}>म</span>
            <span className="absolute inset-0 rounded-full border border-gold/60 animate-spin-slow" />
          </span>
          <div className="leading-tight">
            <div className={`font-display text-xl font-semibold ${scrolled ? "text-foreground" : "text-cream"}`}>Mahalaxmi</div>
            <div className={`text-[10px] tracking-[0.25em] uppercase ${scrolled ? "text-muted-foreground" : "text-cream/70"}`}>Hotel & Restaurant · Est. 2003</div>
          </div>
        </a>

        <div className={`hidden lg:flex items-center gap-9 text-sm font-medium ${scrolled ? "text-foreground" : "text-cream"}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#reserve" className="hidden md:block">
            <Button size="sm" className="bg-gradient-spice text-primary-foreground rounded-none px-5 h-10 hover:shadow-warm transition-shadow">
              Reserve Table
            </Button>
          </a>
          <a href="tel:08208826268" className="hidden md:block">
            <Button size="sm" variant="outline" className={`rounded-none h-10 ${scrolled ? "" : "border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-ink"}`}>
              <Phone className="w-3.5 h-3.5 mr-2" /> Call
            </Button>
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-cream"}`}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-ink text-cream ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-display border-b border-cream/10 pb-3">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#reserve" onClick={() => setOpen(false)} className="flex-1">
              <Button className="w-full bg-gradient-spice text-primary-foreground rounded-none">Reserve</Button>
            </a>
            <a href="tel:08208826268" className="flex-1">
              <Button variant="outline" className="w-full rounded-none border-cream/30 bg-transparent text-cream">Call</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
