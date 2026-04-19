import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReservationForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Reservation requested",
      description: "We'll call you shortly to confirm your table at Mahalaxmi.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cream/95 text-ink p-8 md:p-10 shadow-warm space-y-5 grain">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-xs tracking-widest uppercase text-spice">Name</Label>
          <Input id="name" required placeholder="Your full name" className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice text-base" />
        </div>
        <div>
          <Label htmlFor="phone" className="text-xs tracking-widest uppercase text-spice">Phone</Label>
          <Input id="phone" required type="tel" placeholder="+91 ..." className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice text-base" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date" className="text-xs tracking-widest uppercase text-spice flex items-center gap-1.5"><Calendar className="w-3 h-3"/> Date</Label>
          <Input id="date" required type="date" className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice text-base" />
        </div>
        <div>
          <Label htmlFor="time" className="text-xs tracking-widest uppercase text-spice flex items-center gap-1.5"><Clock className="w-3 h-3"/> Time</Label>
          <Input id="time" required type="time" defaultValue="19:30" className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice text-base" />
        </div>
        <div>
          <Label htmlFor="guests" className="text-xs tracking-widest uppercase text-spice flex items-center gap-1.5"><Users className="w-3 h-3"/> Guests</Label>
          <Input id="guests" required type="number" min={1} max={20} defaultValue={2} className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice text-base" />
        </div>
      </div>

      <div>
        <Label htmlFor="notes" className="text-xs tracking-widest uppercase text-spice">Special requests</Label>
        <Textarea id="notes" rows={3} placeholder="Allergies, occasions, seating preference…" className="mt-2 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-spice resize-none" />
      </div>

      <Button type="submit" disabled={submitted} className="w-full bg-gradient-spice text-primary-foreground rounded-none h-12 text-sm tracking-widest uppercase hover:shadow-warm transition-all">
        {submitted ? <><Check className="w-4 h-4 mr-2" /> Request received</> : "Request Reservation"}
      </Button>
      <p className="text-xs text-ink/60 text-center">We confirm by phone within 30 minutes during opening hours.</p>
    </form>
  );
};
