import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-thali.jpg";
import vegThali from "@/assets/dish-veg-thali.jpg";
import muttonThali from "@/assets/dish-mutton-thali.jpg";
import seafood from "@/assets/dish-seafood.jpg";
import interior from "@/assets/restaurant-interior.jpg";
import vada from "@/assets/dish-vada.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import chai from "@/assets/dish-chai.jpg";
import chef from "@/assets/chef-action.jpg";
import spices from "@/assets/spices.jpg";
import konkan from "@/assets/konkan.jpg";
import family from "@/assets/family-dining.jpg";
import {
  Star, MapPin, Phone, Clock, Utensils, Truck, ShoppingBag, Quote,
  Award, Heart, Leaf, Flame, ChevronDown, Instagram, Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteNav } from "@/components/SiteNav";
import { ReservationForm } from "@/components/ReservationForm";
import { Gallery } from "@/components/Gallery";
import { useReveal } from "@/hooks/use-reveal";

const reviews = [
  { name: "Rohan Patil", rating: 5, text: "Nice place for food in low cost. Good service by staff. The Special Veg Thali was delicious — felt like home-cooked Maharashtrian meal.", date: "2 weeks ago", source: "Google" },
  { name: "Sneha Kulkarni", rating: 5, text: "Quality and quantity of dishes were sufficient for 3 people. Mutton thali is a must-try, masala has the perfect balance of heat and depth.", date: "1 month ago", source: "Google" },
  { name: "Amit Desai", rating: 4, text: "Clean atmosphere. Good service. Tasty sea food — the fish curry rice plate brought back coastal Konkan memories.", date: "1 month ago", source: "Google" },
  { name: "Priya Sawant", rating: 5, text: "Stopped here on the way to Goa and ended up extending our break. Bhakri, mutton sukka and solkadhi — absolutely authentic.", date: "3 weeks ago", source: "Zomato" },
  { name: "Vikram Joshi", rating: 4, text: "Pure value for money. ₹250 thali with unlimited refills. Staff is humble and quick. Great rest stop on NH-66.", date: "2 months ago", source: "Google" },
  { name: "Anjali Naik", rating: 5, text: "Family-friendly, LGBTQ+ friendly, kitchen is spotless. Tried their Special Veg Thali — sweet, spicy, tangy, all perfectly balanced.", date: "3 months ago", source: "TripAdvisor" },
  { name: "Mahesh Pawar", rating: 5, text: "The masala chai alone is worth a stop. Add hot vada-sambar and you have my idea of a perfect breakfast.", date: "5 months ago", source: "Google" },
  { name: "Shweta Bhosale", rating: 4, text: "Great Konkani thali, generous portions. The solkadhi is the real hero. Highway parking is plenty.", date: "6 months ago", source: "Zomato" },
  { name: "Rajesh Mane", rating: 5, text: "Coming here for 12 years. Nothing has changed — same heart, same flavours, same warm staff. A true highway gem.", date: "8 months ago", source: "Google" },
];

type MenuCategory = "Thalis" | "Mains" | "Coastal" | "Snacks" | "Desserts & Drinks";
const menuData: Record<MenuCategory, { name: string; marathi: string; desc: string; price: string; img?: string; tag?: string }[]> = {
  Thalis: [
    { name: "Special Veg Thali", marathi: "स्पेशल व्हेज थाळी", desc: "3 sabzis, dal, rice, bhakri, koshimbir, papad, sweet, pickle, raita.", price: "₹220", img: vegThali, tag: "Bestseller" },
    { name: "Mutton Thali", marathi: "मटण थाळी", desc: "Slow-cooked Malvani mutton rassa, sukka, bhakri, solkadhi, rice.", price: "₹380", img: muttonThali, tag: "Chef's Pick" },
    { name: "Chicken Thali", marathi: "चिकन थाळी", desc: "Country-style chicken curry with masala rice, chapati & sides.", price: "₹320" },
    { name: "Mini Thali", marathi: "मिनी थाळी", desc: "A lighter spread for solo diners — 2 sabzi, dal, rice, roti.", price: "₹160" },
  ],
  Mains: [
    { name: "Chicken Biryani", marathi: "चिकन बिर्याणी", desc: "Long-grain rice slow-cooked with chicken, whole spices & saffron.", price: "₹260", img: biryani, tag: "Popular" },
    { name: "Paneer Butter Masala", marathi: "पनीर बटर मसाला", desc: "Cottage cheese in silken tomato-cashew gravy.", price: "₹220" },
    { name: "Dal Tadka", marathi: "दाल तडका", desc: "Yellow lentils tempered with cumin, garlic & ghee.", price: "₹150" },
    { name: "Tandoori Roti / Naan", marathi: "तंदूरी रोटी / नान", desc: "Fresh from the clay oven.", price: "₹30 / ₹50" },
  ],
  Coastal: [
    { name: "Konkan Fish Thali", marathi: "कोंकणी मच्छी थाळी", desc: "Surmai or Bangda fish, kokum-coconut curry, rice & solkadhi.", price: "₹350", img: seafood, tag: "Coastal" },
    { name: "Prawns Masala", marathi: "कोलंबी मसाला", desc: "Tiger prawns in roasted coconut Malvani masala.", price: "₹420" },
    { name: "Bombil Fry", marathi: "बोंबिल फ्राय", desc: "Crisp semolina-coated Bombay duck fish.", price: "₹280" },
    { name: "Solkadhi", marathi: "सोलकढी", desc: "Refreshing kokum-coconut digestive drink.", price: "₹50" },
  ],
  Snacks: [
    { name: "Medu Vada Sambar", marathi: "मेदू वडा सांबार", desc: "Crispy lentil donuts with hot sambar & coconut chutney.", price: "₹80", img: vada },
    { name: "Misal Pav", marathi: "मिसळ पाव", desc: "Spicy sprouted curry topped with farsan, served with pav.", price: "₹100" },
    { name: "Kanda Bhaji", marathi: "कांदा भजी", desc: "Onion fritters — perfect with monsoon chai.", price: "₹70" },
    { name: "Vada Pav", marathi: "वडा पाव", desc: "Maharashtra's beloved street snack.", price: "₹30" },
  ],
  "Desserts & Drinks": [
    { name: "Gulab Jamun", marathi: "गुलाब जामुन", desc: "Warm milk-dumplings drenched in saffron syrup.", price: "₹60", img: dessert },
    { name: "Shrikhand", marathi: "श्रीखंड", desc: "Hung curd whisked with sugar, cardamom & saffron.", price: "₹80" },
    { name: "Masala Chai", marathi: "मसाला चहा", desc: "Stovetop tea with ginger, cardamom & fresh milk.", price: "₹25", img: chai },
    { name: "Lassi (Sweet/Salt)", marathi: "लस्सी", desc: "Thick churned yogurt drink.", price: "₹70" },
  ],
};

const galleryImages = [
  { src: vegThali, alt: "Veg Thali" },
  { src: muttonThali, alt: "Mutton Thali" },
  { src: seafood, alt: "Konkan Seafood" },
  { src: biryani, alt: "Chicken Biryani" },
  { src: vada, alt: "Medu Vada" },
  { src: dessert, alt: "Gulab Jamun" },
  { src: chai, alt: "Masala Chai" },
  { src: interior, alt: "Restaurant Interior" },
  { src: chef, alt: "Chef at Work" },
  { src: spices, alt: "Spice Palette" },
  { src: family, alt: "Family Dining" },
  { src: konkan, alt: "Konkan Coast" },
];

const Index = () => {
  const revealRoot = useReveal();
  const [activeCat, setActiveCat] = useState<MenuCategory>("Thalis");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={revealRoot} className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />

      {/* HERO */}
      <section id="top" className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Authentic Maharashtrian thali at Mahalaxmi"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(${1 + scrollY * 0.0003})` }}
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grain pointer-events-none" />

        {/* Top floating badge */}
        <div className="absolute top-28 right-8 hidden md:flex flex-col items-center gap-1 text-cream animate-float-slow">
          <span className="font-marathi text-gold text-sm tracking-widest">अतिथि देवो भव</span>
          <div className="w-px h-8 bg-gold/60" />
        </div>

        <div className="container relative z-10 pb-24 md:pb-32 text-cream">
          <div className="max-w-4xl animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-16 bg-gold" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-gold">Vaibhavwadi · Konkan · Since 2003</span>
            </div>
            <h1 className="font-marathi text-5xl md:text-7xl text-gold mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              महालक्ष्मी
            </h1>
            <h2 className="font-display text-6xl md:text-[9rem] font-light leading-[0.92] text-balance">
              Hotel <span className="italic text-gold">&</span><br />Restaurant
            </h2>
            <p className="mt-10 max-w-xl text-lg md:text-xl text-cream/80 leading-relaxed font-light">
              A roadside legend serving generous Maharashtrian thalis,<br className="hidden md:block" /> slow-cooked mutton & coastal Konkan seafood for over two decades.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a href="#reserve">
                <Button size="lg" className="bg-gradient-spice text-primary-foreground rounded-none px-10 h-14 text-sm tracking-widest uppercase shadow-warm hover:scale-[1.02] transition-transform">
                  Reserve a Table
                </Button>
              </a>
              <a href="#menu">
                <Button size="lg" variant="outline" className="rounded-none px-10 h-14 text-sm tracking-widest uppercase border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-ink">
                  View Menu
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream flex flex-col items-center gap-2 animate-shimmer">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Bottom corner stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-6 text-cream">
          <div className="text-right">
            <div className="font-display text-4xl text-gold">4.2★</div>
            <div className="text-[10px] tracking-widest uppercase text-cream/70">666 Google Reviews</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-ink text-cream py-6 overflow-hidden border-y border-cream/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 font-display text-2xl text-gold/90">
              <span>★ Authentic Maharashtrian</span><span className="text-cream/30">·</span>
              <span>★ Konkan Seafood</span><span className="text-cream/30">·</span>
              <span>★ Open till midnight</span><span className="text-cream/30">·</span>
              <span>★ Family friendly</span><span className="text-cream/30">·</span>
              <span>★ ₹200–400 per person</span><span className="text-cream/30">·</span>
              <span>★ Highway dining since 2003</span><span className="text-cream/30">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { icon: Utensils, title: "Dine-in", sub: "Cosy family seating for 80" },
            { icon: ShoppingBag, title: "Takeaway", sub: "Hot, packed, ready in 15" },
            { icon: Truck, title: "Delivery", sub: "No-contact, local area" },
            { icon: Heart, title: "Family Friendly", sub: "LGBTQ+ welcome · all ages" },
          ].map(({ icon: Icon, title, sub }, i) => (
            <div key={title} className="reveal text-center group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-secondary grid place-items-center group-hover:bg-gradient-spice group-hover:text-cream transition-all duration-500">
                <Icon className="w-7 h-7 text-spice group-hover:text-cream transition-colors" />
              </div>
              <h3 className="font-display text-2xl mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-24 md:py-32 relative overflow-hidden">
        <div className="container grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 reveal">
            <span className="text-[11px] tracking-[0.4em] uppercase text-spice">Our Story</span>
            <h2 className="font-display text-5xl md:text-7xl mt-5 mb-7 leading-[0.95]">
              Rooted in <em className="text-spice not-italic relative">Konkan
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-spice" /></em><br/>raised on tradition.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
              For over twenty years, Mahalaxmi has been the chosen pit-stop for travellers between Mumbai, Goa & Kolhapur — a place where the kitchen never compromises, and every plate carries the warmth of a home meal.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our recipes come from generations of Konkan cooks. The masalas are still ground in-house. The fish still arrives fresh from the coast. And the chai is still brewed in clay pots, just the way you remember.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <Stat n="20+" l="Years serving" />
              <Stat n="666" l="Reviews" />
              <Stat n="4.2★" l="Rating" />
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6 reveal">
            <div className="space-y-4 md:space-y-6 pt-12">
              <img src={chef} alt="Chef at flame" loading="lazy" className="w-full aspect-[3/4] object-cover shadow-soft" />
              <img src={family} alt="Family dining" loading="lazy" className="w-full aspect-square object-cover shadow-soft" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img src={interior} alt="Interior" loading="lazy" className="w-full aspect-square object-cover shadow-soft" />
              <img src={konkan} alt="Konkan coast" loading="lazy" className="w-full aspect-[3/4] object-cover shadow-soft" />
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 bg-secondary relative">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Flame, t: "Slow-cooked masalas", d: "Hand-ground daily on traditional sil-batta. No shortcuts. Ever." },
              { icon: Leaf, t: "Farm to plate", d: "Vegetables sourced from neighbouring Konkan villages every morning." },
              { icon: Award, t: "Trusted by travellers", d: "A multi-generational rest-stop on the Mumbai–Goa highway." },
            ].map((p, i) => (
              <div key={p.t} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <p.icon className="w-10 h-10 mx-auto text-spice mb-4" strokeWidth={1.2} />
                <h3 className="font-display text-2xl mb-2">{p.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 md:py-32 relative overflow-hidden">
        <img src={spices} alt="" aria-hidden className="absolute -top-32 -right-32 w-[500px] opacity-10 rotate-12 pointer-events-none" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="text-[11px] tracking-[0.4em] uppercase text-spice ornament">The Menu</span>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95]">From Our Kitchen</h2>
            <p className="text-muted-foreground mt-5 text-lg">A curated selection. The full menu is happily handed at your table.</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-14 reveal">
            {(Object.keys(menuData) as MenuCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 md:px-7 py-3 text-sm tracking-widest uppercase border transition-all duration-300 ${
                  activeCat === cat
                    ? "bg-ink text-cream border-ink"
                    : "border-border text-muted-foreground hover:border-spice hover:text-spice"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
            {menuData[activeCat].map((d, i) => (
              <article
                key={d.name}
                className="reveal flex gap-5 group cursor-default border-b border-border pb-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {d.img && (
                  <div className="w-24 h-24 shrink-0 overflow-hidden">
                    <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h3 className="font-display text-2xl truncate group-hover:text-spice transition-colors">
                      {d.name}
                      {d.tag && <span className="ml-2 text-[10px] tracking-widest uppercase bg-gold/20 text-spice px-1.5 py-0.5 align-middle">{d.tag}</span>}
                    </h3>
                    <span className="text-spice font-medium whitespace-nowrap">{d.price}</span>
                  </div>
                  <div className="font-marathi text-sm text-muted-foreground mb-2">{d.marathi}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <a href="tel:08208826268" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-spice hover:text-spice/80 group">
              Call to order <span className="block w-10 h-px bg-spice group-hover:w-16 transition-all" />
            </a>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={spices}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translate3d(0, ${(scrollY - 2400) * 0.15}px, 0)` }}
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container relative text-center text-cream max-w-3xl reveal">
          <Quote className="w-12 h-12 mx-auto text-gold mb-6 opacity-70" />
          <p className="font-display text-3xl md:text-5xl leading-[1.2] italic text-balance">
            "Coming here for 12 years. Nothing has changed — same heart, same flavours, same warm staff."
          </p>
          <div className="mt-8 text-xs tracking-[0.4em] uppercase text-gold">— Rajesh Mane · Google Review</div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6 reveal">
            <div>
              <span className="text-[11px] tracking-[0.4em] uppercase text-spice">Through the lens</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95]">Gallery</h2>
            </div>
            <p className="text-muted-foreground max-w-md">A glimpse of the dishes, the kitchen, and the warmth that brings people back.</p>
          </div>
          <div className="reveal">
            <Gallery images={galleryImages} />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-16 items-end">
            <div className="md:col-span-2 reveal">
              <span className="text-[11px] tracking-[0.4em] uppercase text-spice">Guest Voices</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95]">Loved by 666 diners.<br /><em className="text-spice">And counting.</em></h2>
            </div>
            <div className="reveal text-center md:text-right">
              <div className="font-display text-7xl text-spice leading-none">4.2</div>
              <div className="flex justify-center md:justify-end mt-2 mb-1">
                {[1,2,3,4].map(i=><Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
                <Star className="w-5 h-5 fill-gold/40 text-gold" />
              </div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground">Across Google · Zomato · TripAdvisor</div>
            </div>
          </div>

          {/* Distribution */}
          <div className="max-w-2xl mb-16 reveal space-y-2">
            {[
              { stars: 5, pct: 62 },
              { stars: 4, pct: 24 },
              { stars: 3, pct: 9 },
              { stars: 2, pct: 3 },
              { stars: 1, pct: 2 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-4 text-sm">
                <span className="w-12 flex items-center gap-1">{stars}<Star className="w-3 h-3 fill-gold text-gold" /></span>
                <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-spice transition-all duration-1000" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-12 text-right text-muted-foreground">{pct}%</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="reveal relative bg-card p-7 border border-border hover:border-spice/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-warm group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Quote className="absolute top-5 right-5 w-9 h-9 text-spice/15 group-hover:text-spice/30 transition-colors" />
                <div className="flex mb-4">
                  {Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} className="w-4 h-4 fill-gold text-gold" />)}
                  {Array.from({ length: 5 - r.rating }).map((_, idx) => <Star key={idx} className="w-4 h-4 text-gold/30" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 text-[15px]">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-gradient-spice flex items-center justify-center text-cream font-display text-lg shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date} · {r.source}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reserve" className="py-24 md:py-32 relative overflow-hidden bg-ink text-cream">
        <img src={interior} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="container relative grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="text-[11px] tracking-[0.4em] uppercase text-gold">Reserve</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4 mb-7 leading-[0.95]">A table awaits<br/><em className="text-gold">your arrival.</em></h2>
            <p className="text-cream/80 leading-relaxed text-lg max-w-md">
              Whether it's a quick highway pit-stop or a long family lunch, leave us a note and we'll keep your seat warm.
            </p>
            <div className="mt-10 space-y-4 text-cream/90">
              <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-gold"/> Open daily · 6 AM – 12 AM</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold"/> <a href="tel:08208826268" className="hover:text-gold">082088 26268</a></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold"/> Vaibhavwadi, Maharashtra 416810</div>
            </div>
          </div>
          <div className="reveal">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 reveal">
            <span className="text-[11px] tracking-[0.4em] uppercase text-spice">Good to Know</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4">Frequently Asked</h2>
          </div>
          <div className="reveal">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Do you serve Jain / pure vegetarian food?", a: "Yes. Our Veg Thali and most curries can be prepared Jain on request — just let your server know." },
                { q: "Is the restaurant family & LGBTQ+ friendly?", a: "Absolutely. Mahalaxmi welcomes everyone. We have family booths and high-chairs for kids." },
                { q: "Do you accept walk-ins, or should we reserve?", a: "Walk-ins are welcome, but on weekends and holidays we strongly recommend reserving — especially for groups of 4+." },
                { q: "Is there parking on the highway?", a: "Yes — ample parking for cars and tour buses, right outside the restaurant." },
                { q: "What are your average prices?", a: "₹200–400 per person for a full meal. Snacks and chai start at ₹25." },
                { q: "Do you cater for groups or events?", a: "Yes — we host birthdays, small weddings and private parties. Call us to plan." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-display text-xl md:text-2xl text-left hover:text-spice py-6">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="bg-ink text-cream">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-20 flex flex-col justify-center reveal">
            <span className="text-[11px] tracking-[0.4em] uppercase text-gold">Visit</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4 mb-10 leading-[0.95]">Find Mahalaxmi</h2>
            <div className="space-y-7 text-cream/90 max-w-md">
              <Detail icon={MapPin} title="Address">231 Mahalaxmi Hotel, Vaibhavwadi,<br/>Maharashtra 416810 · Plus Code FPWR+3Q</Detail>
              <Detail icon={Phone} title="Reservations"><a href="tel:08208826268" className="hover:text-gold">082088 26268</a></Detail>
              <Detail icon={Clock} title="Hours">Open daily · 6 AM – 12 AM</Detail>
              <Detail icon={Utensils} title="Average Cost">₹200–400 per person</Detail>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <a href="https://maps.google.com/?q=Mahalaxmi+Hotel+Vaibhavwadi" target="_blank" rel="noopener">
                <Button className="bg-gold hover:bg-gold/90 text-ink rounded-none px-8 h-12 tracking-widest uppercase text-xs">Get Directions</Button>
              </a>
              <a href="tel:08208826268">
                <Button variant="outline" className="rounded-none px-8 h-12 border-cream/30 bg-transparent text-cream hover:bg-cream hover:text-ink tracking-widest uppercase text-xs">Call Now</Button>
              </a>
            </div>
          </div>
          <div className="min-h-[500px] md:min-h-0 bg-cream/5">
            <iframe
              title="Mahalaxmi Hotel location"
              className="w-full h-full min-h-[500px] grayscale-[60%] hover:grayscale-0 transition-all duration-700"
              src="https://maps.google.com/maps?q=Vaibhavwadi%20Maharashtra%20416810&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-16 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-spice text-cream grid place-items-center font-display text-xl">म</span>
                <div>
                  <div className="font-display text-2xl">Mahalaxmi</div>
                  <div className="font-marathi text-sm text-muted-foreground">महालक्ष्मी हॉटेल</div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
                A roadside legend in Vaibhavwadi serving authentic Maharashtrian & Konkan cuisine since 2003.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-spice mb-4">Explore</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#story" className="hover:text-spice">Our Story</a></li>
                <li><a href="#menu" className="hover:text-spice">Menu</a></li>
                <li><a href="#gallery" className="hover:text-spice">Gallery</a></li>
                <li><a href="#reviews" className="hover:text-spice">Reviews</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-spice mb-4">Connect</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="tel:08208826268" className="hover:text-spice">082088 26268</a></li>
                <li><a href="#visit" className="hover:text-spice">Vaibhavwadi, MH</a></li>
              </ul>
              <div className="flex gap-3 mt-5">
                <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center border border-border hover:bg-spice hover:text-cream hover:border-spice transition-colors"><Instagram className="w-4 h-4"/></a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 grid place-items-center border border-border hover:bg-spice hover:text-cream hover:border-spice transition-colors"><Facebook className="w-4 h-4"/></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Mahalaxmi Hotel & Restaurant · All rights reserved</span>
            <span className="font-marathi text-sm">अन्नदाता सुखी भव</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <div className="font-display text-4xl text-spice">{n}</div>
    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{l}</div>
  </div>
);

const Detail = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <Icon className="w-5 h-5 text-gold shrink-0 mt-1" />
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-1">{title}</div>
      <div className="text-cream/90">{children}</div>
    </div>
  </div>
);

export default Index;
