import heroImg from "@/assets/hero-thali.jpg";
import vegThali from "@/assets/dish-veg-thali.jpg";
import muttonThali from "@/assets/dish-mutton-thali.jpg";
import seafood from "@/assets/dish-seafood.jpg";
import interior from "@/assets/restaurant-interior.jpg";
import { Star, MapPin, Phone, Clock, Utensils, Truck, ShoppingBag, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Rohan Patil", rating: 5, text: "Nice place for food in low cost. Good service by staff. The Special Veg Thali was delicious — felt like home-cooked Maharashtrian meal.", date: "2 weeks ago" },
  { name: "Sneha Kulkarni", rating: 5, text: "Quality and quantity of dishes were sufficient for 3 people. Mutton thali is a must-try, masala has the perfect balance of heat and depth.", date: "1 month ago" },
  { name: "Amit Desai", rating: 4, text: "Clean atmosphere. Good service. Tasty sea food — the fish curry rice plate brought back coastal Konkan memories.", date: "1 month ago" },
  { name: "Priya Sawant", rating: 5, text: "Stopped here on the way to Goa and ended up extending our break. Bhakri, mutton sukka and solkadhi — absolutely authentic.", date: "3 weeks ago" },
  { name: "Vikram Joshi", rating: 4, text: "Pure value for money. ₹250 thali with unlimited refills. Staff is humble and quick. Great rest stop on NH-66.", date: "2 months ago" },
  { name: "Anjali Naik", rating: 5, text: "Family-friendly, LGBTQ+ friendly, and the kitchen is spotless. Tried their Special Veg Thali — sweet, spicy, tangy, all perfectly balanced.", date: "3 months ago" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <nav className="container flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2">
            <span className="text-2xl font-display font-semibold text-spice">महा</span>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold">Mahalaxmi</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Hotel & Restaurant</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#menu" className="hover:text-spice transition-colors">Menu</a>
            <a href="#about" className="hover:text-spice transition-colors">About</a>
            <a href="#reviews" className="hover:text-spice transition-colors">Reviews</a>
            <a href="#visit" className="hover:text-spice transition-colors">Visit</a>
          </div>
          <a href="tel:08208826268">
            <Button variant="default" size="sm" className="bg-spice hover:bg-spice/90 text-primary-foreground rounded-none">
              <Phone className="w-3.5 h-3.5 mr-2" /> Call
            </Button>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img src={heroImg} alt="Authentic Maharashtrian thali at Mahalaxmi" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative z-10 pb-20 md:pb-28 text-cream">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Since the road to Konkan remembers us</span>
            </div>
            <h1 className="font-marathi text-5xl md:text-7xl text-gold mb-2">महालक्ष्मी</h1>
            <h2 className="font-display text-5xl md:text-8xl font-light leading-[0.95] text-balance">
              Hotel <span className="italic text-gold">&</span> Restaurant
            </h2>
            <p className="mt-8 max-w-xl text-lg text-cream/80 leading-relaxed">
              A roadside legend in Vaibhavwadi, serving generous Maharashtrian thalis, slow-cooked mutton and Konkan seafood for over a generation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#menu"><Button size="lg" className="bg-gradient-spice text-primary-foreground rounded-none px-8 h-12 shadow-warm">Explore the Menu</Button></a>
              <a href="#visit"><Button size="lg" variant="outline" className="rounded-none px-8 h-12 border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-ink">Find Us</Button></a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">{[1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-gold text-gold" />)}<Star className="w-4 h-4 fill-gold/40 text-gold" /></div>
                <span className="text-cream/90"><strong className="text-gold">4.2</strong> · 666 reviews</span>
              </div>
              <span className="text-cream/40">|</span>
              <span className="text-cream/80">₹200–400 per person</span>
              <span className="text-cream/40">|</span>
              <span className="text-cream/80">Indian · Maharashtrian · Konkani</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="bg-ink text-cream py-8">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Utensils, title: "Dine-in", sub: "Family seating" },
            { icon: ShoppingBag, title: "Takeaway", sub: "Hot & ready" },
            { icon: Truck, title: "No-contact Delivery", sub: "Local area" },
            { icon: Clock, title: "Open Late", sub: "Until 12 AM" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="w-7 h-7 text-gold shrink-0" />
              <div>
                <div className="font-display text-lg">{title}</div>
                <div className="text-xs text-cream/60">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-spice">Our Story</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4 mb-6 leading-[1.05]">
              A taste of <em className="text-spice">Maharashtra</em>, served with heart.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tucked along the highway in Vaibhavwadi, Mahalaxmi has been the chosen pit-stop for travellers, families and locals alike. We are proud of three things — clean kitchens, generous portions, and recipes that haven't changed in decades.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're craving a piping-hot Special Veg Thali, fiery mutton rassa, or a Konkan-style fish curry, every plate leaves our kitchen the way our grandmothers would approve.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <Stat n="20+" l="Years serving" />
              <Stat n="666" l="Happy reviews" />
              <Stat n="4.2★" l="Google rating" />
            </div>
          </div>
          <div className="relative">
            <img src={interior} alt="Warm interior of Mahalaxmi restaurant" className="w-full h-[520px] object-cover shadow-warm" loading="lazy" width={1600} height={1024} />
            <div className="absolute -bottom-6 -left-6 bg-gradient-gold p-6 shadow-soft hidden md:block">
              <div className="font-marathi text-3xl text-ink">स्वागत आहे</div>
              <div className="text-xs uppercase tracking-widest text-ink/70 mt-1">You are welcome</div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-spice ornament">Popular</span>
            <h2 className="font-display text-5xl md:text-6xl mt-6">From Our Kitchen</h2>
            <p className="text-muted-foreground mt-4">The dishes our guests come back for, again and again.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: vegThali, name: "Special Veg Thali", marathi: "स्पेशल व्हेज थाळी", desc: "A festival on a plate — 3 sabzis, dal, rice, bhakri, koshimbir, papad, sweet, pickle.", price: "₹220" },
              { img: muttonThali, name: "Mutton Thali", marathi: "मटण थाळी", desc: "Slow-cooked Malvani mutton rassa with sukka, bhakri, solkadhi & rice.", price: "₹380" },
              { img: seafood, name: "Konkan Seafood Plate", marathi: "कोंकणी सी-फूड", desc: "Day-fresh fish & prawn curry, kokum-coconut gravy, steamed rice.", price: "₹350" },
            ].map((d) => (
              <article key={d.name} className="group bg-card overflow-hidden shadow-soft hover:shadow-warm transition-all duration-500">
                <div className="relative h-72 overflow-hidden">
                  <img src={d.img} alt={d.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-2xl">{d.name}</h3>
                    <span className="text-spice font-medium">{d.price}</span>
                  </div>
                  <div className="font-marathi text-sm text-muted-foreground mb-3">{d.marathi}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground italic">…and a full menu of curries, breads, biryanis, and desserts.</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-spice ornament">Guest Voices</span>
            <h2 className="font-display text-5xl md:text-6xl mt-6">What People Say</h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="font-display text-6xl text-spice">4.2</span>
              <div>
                <div className="flex">{[1,2,3,4].map(i=><Star key={i} className="w-5 h-5 fill-gold text-gold" />)}<Star className="w-5 h-5 fill-gold/40 text-gold" /></div>
                <div className="text-sm text-muted-foreground mt-1">based on 666 Google reviews</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <article key={i} className="relative bg-card p-7 border border-border hover:border-spice/40 transition-colors group">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-spice/15 group-hover:text-spice/30 transition-colors" />
                <div className="flex mb-4">
                  {Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} className="w-4 h-4 fill-gold text-gold" />)}
                  {Array.from({ length: 5 - r.rating }).map((_, idx) => <Star key={idx} className="w-4 h-4 text-gold/30" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-spice flex items-center justify-center text-cream font-display text-lg">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[5,4,3,2,1].slice(0,3).map((stars) => {
              const pct = stars === 5 ? 62 : stars === 4 ? 24 : 9;
              return (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="w-6">{stars}★</span>
                  <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-spice" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="py-24 md:py-32 bg-ink text-cream">
        <div className="container grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Plan a visit</span>
            <h2 className="font-display text-5xl md:text-6xl mt-4 mb-8">Find Mahalaxmi</h2>
            <div className="space-y-6 text-cream/90">
              <Detail icon={MapPin} title="Address">231 Mahalaxmi Hotel, Vaibhavwadi,<br/>Maharashtra 416810 · FPWR+3Q</Detail>
              <Detail icon={Phone} title="Reservations"><a href="tel:08208826268" className="hover:text-gold">082088 26268</a></Detail>
              <Detail icon={Clock} title="Hours">Open daily · Closes 12 AM</Detail>
              <Detail icon={Utensils} title="Average Cost">₹200–400 per person</Detail>
            </div>
            <div className="mt-10 flex gap-4">
              <a href="https://maps.google.com/?q=Mahalaxmi+Hotel+Vaibhavwadi" target="_blank" rel="noopener">
                <Button className="bg-gold hover:bg-gold/90 text-ink rounded-none">Get Directions</Button>
              </a>
              <a href="tel:08208826268">
                <Button variant="outline" className="rounded-none border-cream/30 bg-transparent text-cream hover:bg-cream hover:text-ink">Call Us</Button>
              </a>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80">
              <span className="w-2 h-2 rounded-full bg-gold animate-shimmer" /> LGBTQ+ friendly · Family welcome
            </div>
          </div>
          <div className="aspect-[4/5] md:aspect-auto bg-cream/5 border border-cream/10 overflow-hidden">
            <iframe
              title="Mahalaxmi Hotel location"
              className="w-full h-full min-h-[400px]"
              src="https://maps.google.com/maps?q=Vaibhavwadi%20Maharashtra%20416810&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-spice">महा</span>
            <span>© {new Date().getFullYear()} Mahalaxmi Hotel & Restaurant</span>
          </div>
          <div className="font-marathi text-base">अन्नदाता सुखी भव</div>
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <div className="font-display text-3xl text-spice">{n}</div>
    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
  </div>
);

const Detail = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <Icon className="w-5 h-5 text-gold shrink-0 mt-1" />
    <div>
      <div className="text-xs uppercase tracking-widest text-gold/80 mb-1">{title}</div>
      <div className="text-cream/90">{children}</div>
    </div>
  </div>
);

export default Index;
