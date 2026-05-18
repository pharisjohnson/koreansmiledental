import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse } from "lucide-react";
import heroImg from "@/assets/hero-smile.png";
import veneersImg from "@/assets/veneers.jpg";
import smile1 from "@/assets/smile-1.jpg";
import smile2 from "@/assets/smile-2.jpg";
import smile3 from "@/assets/smile-3.jpg";
import { SERVICE_CATEGORIES } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Korean Smile Dental — Premium Korean-Inspired Dental Care" },
      { name: "description", content: "Cosmetic, restorative and orthodontic dental care delivered with the precision of a modern Seoul clinic. Veneers, whitening, Invisalign, implants and more." },
      { property: "og:title", content: "Korean Smile Dental" },
      { property: "og:description", content: "Premium Korean-inspired dental care — book your visit." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-secondary -mt-20 pt-20">
        <div className="container-luxe grid lg:grid-cols-12 gap-12 items-center min-h-[88vh] py-16">
          <div className="lg:col-span-6 fade-in-up">
            <div className="eyebrow mb-6">Korean Smile Dental</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              The smile<br/>
              <span className="italic">you've imagined</span>,<br/>
              quietly perfected.
            </h1>
            <p className="mt-8 max-w-md text-base text-muted-foreground leading-relaxed">
              A premium dental practice inspired by the precision of modern Seoul clinics —
              delivering cosmetic, restorative and orthodontic care that feels as elegant as it looks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/booking" className="btn-primary">Book a Visit <ArrowRight size={14} /></Link>
              <Link to="/services" className="btn-outline">Explore Treatments</Link>
            </div>
            <div className="mt-14 flex items-center gap-8 text-xs text-muted-foreground tracking-[0.18em] uppercase">
              <span>18 Treatments</span>
              <span className="w-px h-3 bg-border" />
              <span>Concierge Care</span>
              <span className="w-px h-3 bg-border" />
              <span>Korean Standards</span>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={heroImg}
                alt="Radiant Korean smile"
                width={1280}
                height={1600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border border-border p-6 max-w-[260px] hidden md:block">
              <div className="eyebrow mb-2">Now welcoming</div>
              <div className="font-display text-2xl">New patients</div>
              <div className="text-xs text-muted-foreground mt-2">Same-week consultations available</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-28 container-luxe">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Sparkles, title: "Cosmetic precision", body: "Veneers, whitening and smile design crafted with Korean attention to detail." },
            { icon: ShieldCheck, title: "Gentle technology", body: "Low-dose digital imaging, modern anaesthesia, and pain-free protocols." },
            { icon: HeartPulse, title: "Concierge care", body: "Calm, unhurried appointments with one dedicated team from start to finish." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t border-border pt-8">
              <Icon size={22} strokeWidth={1.4} />
              <h3 className="font-display text-2xl mt-4">{title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — VENEERS */}
      <section className="bg-muted py-28">
        <div className="container-luxe grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:col-start-1">
            <img src={veneersImg} alt="Porcelain veneer" loading="lazy" width={1024} height={1280} className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="eyebrow mb-4">Signature treatment</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              The Korean Smile, <span className="italic">in porcelain.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Ultra-thin veneers shaped and shaded to your face — bright but never artificial.
              Designed to look like the smile you were always meant to have.
            </p>
            <Link to="/services" className="inline-flex mt-8 link-underline text-sm tracking-[0.18em] uppercase font-medium">
              View all treatments →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-28 container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-3">Treatments</div>
            <h2 className="font-display text-4xl md:text-5xl">Care, end to end.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
            From routine maintenance to full smile transformations — every treatment delivered to a Korean clinical standard.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {SERVICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/services"
              hash={cat.slug}
              className="bg-background p-10 hover:bg-muted transition-colors group"
            >
              <div className="eyebrow mb-3">{cat.tagline}</div>
              <h3 className="font-display text-3xl mb-3">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{cat.blurb}</p>
              <span className="text-xs tracking-[0.18em] uppercase font-medium link-underline">
                {cat.services.length} treatments →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="py-28 bg-foreground text-background">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow text-background/60 mb-3">Smile Gallery</div>
              <h2 className="font-display text-4xl md:text-5xl">Real smiles, refined.</h2>
            </div>
            <Link to="/gallery" className="text-xs tracking-[0.18em] uppercase font-medium link-underline">
              View gallery →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[smile1, smile2, smile3].map((src, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden bg-background/10">
                <img src={src} alt={`Patient smile ${i + 1}`} loading="lazy" width={896} height={1120} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 container-luxe text-center">
        <div className="eyebrow mb-4">Begin</div>
        <h2 className="font-display text-4xl md:text-6xl max-w-2xl mx-auto leading-tight">
          Your smile journey starts <span className="italic">with a quiet conversation.</span>
        </h2>
        <div className="mt-10">
          <Link to="/booking" className="btn-primary">Book your visit <ArrowRight size={14} /></Link>
        </div>
      </section>
    </>
  );
}
