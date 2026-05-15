import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

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
          <a
            href="https://www.instagram.com/_koreansmiledental/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm link-underline"
          >
            <Instagram size={16} /> @_koreansmiledental
          </a>
        </div>

        <div>
          <div className="eyebrow text-background/60 mb-4">Visit</div>
          <ul className="space-y-3 text-sm text-background/80">
            <li className="flex gap-2"><MapPin size={14} className="mt-1 shrink-0" /> By appointment only</li>
            <li className="flex gap-2"><Phone size={14} className="mt-1 shrink-0" /> Available on request</li>
            <li className="flex gap-2"><Mail size={14} className="mt-1 shrink-0" /> hello@koreansmiledental.com</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-background/60 mb-4">Explore</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services" className="link-underline text-background/80">Services</Link></li>
            <li><Link to="/gallery" className="link-underline text-background/80">Smile Gallery</Link></li>
            <li><Link to="/about" className="link-underline text-background/80">About</Link></li>
            <li><Link to="/booking" className="link-underline text-background/80">Book a Visit</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <span>© {new Date().getFullYear()} Korean Smile Dental. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}
