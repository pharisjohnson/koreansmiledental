import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="container-luxe py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2 max-w-sm">
          <div className="font-display text-2xl mb-3">Korean Smile Dental</div>
          <p className="text-sm text-background/70 leading-relaxed">
            Premium Korean-inspired dental care. Cosmetic, restorative and orthodontic
            treatments delivered with the precision and discretion of a modern Seoul clinic.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <a
              href="https://www.instagram.com/_koreansmiledental/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm link-underline"
            >
              <Instagram size={16} /> @_koreansmiledental
            </a>
            <a
              href="https://www.facebook.com/900985239767350"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm link-underline"
            >
              <Facebook size={16} /> Korean Smile Dental Clinic
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow text-background/60 mb-4">Visit</div>
          <ul className="space-y-3 text-sm text-background/80">
            <li className="flex gap-2"><MapPin size={14} className="mt-1 shrink-0" /><span>Ndemi Road, Kilimani, Nairobi</span></li>
            <li className="flex gap-2"><Phone size={14} className="mt-1 shrink-0" /><span>0746 888 934 (Call / WhatsApp)</span></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-background/60 mb-4">Explore</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services" className="link-underline text-background/80">Services</Link></li>
            <li><Link to="/gallery" className="link-underline text-background/80">Instagram</Link></li>
            <li><Link to="/about" className="link-underline text-background/80">About</Link></li>
            <li><Link to="/booking" className="link-underline text-background/80">Book a Visit</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <span>© {new Date().getFullYear()} Korean Smile Dental. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Your Smile, Our Passion</span>
        </div>
      </div>
    </footer>
  );
}
