import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Treatments — Korean Smile Dental" },
      { name: "description", content: "All 18 treatments offered at Korean Smile Dental — preventive, restorative, orthodontic and cosmetic care." },
      { property: "og:title", content: "Treatments — Korean Smile Dental" },
      { property: "og:description", content: "Explore preventive, restorative, orthodontic and cosmetic treatments." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="bg-secondary py-28">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Treatments</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            Eighteen treatments, <span className="italic">one standard.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
            From quiet preventive checkups to full smile transformations — every service is delivered with
            the calm precision of a modern Seoul clinic.
          </p>
        </div>
      </section>

      {SERVICE_CATEGORIES.map((cat, idx) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`py-24 scroll-mt-24 ${idx % 2 === 1 ? "bg-muted" : ""}`}
        >
          <div className="container-luxe grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow mb-3">{cat.tagline}</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">{cat.name}</h2>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed">{cat.blurb}</p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {cat.services.map((s) => (
                  <li key={s.slug} className="py-7 grid md:grid-cols-12 gap-4 items-start group">
                    <div className="md:col-span-4 font-display text-2xl">{s.name}</div>
                    <p className="md:col-span-7 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    <Link
                      to="/booking"
                      search={{ service: s.name }}
                      className="md:col-span-1 text-xs tracking-[0.18em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      Book <ArrowRight size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="py-28 container-luxe text-center">
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mx-auto leading-tight">
          Not sure which treatment is right for you?
        </h2>
        <p className="mt-6 text-muted-foreground max-w-md mx-auto">
          Book a consultation and we'll design a treatment plan tailored to your smile.
        </p>
        <Link to="/booking" className="btn-primary mt-10">Book a Consultation</Link>
      </section>
    </>
  );
}
