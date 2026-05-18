import { createFileRoute, Link } from "@tanstack/react-router";
import clinic from "@/assets/clinic-interior.png";
import dentist from "@/assets/dentist.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Korean Smile Dental" },
      { name: "description", content: "About Korean Smile Dental — a premium Korean-inspired dental practice combining clinical precision with quiet luxury." },
      { property: "og:title", content: "About — Korean Smile Dental" },
      { property: "og:description", content: "Premium Korean-inspired dental care, delivered with discretion and craft." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-secondary py-28">
        <div className="container-luxe grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6">About</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
              Dentistry, <span className="italic">the Korean way.</span>
            </h1>
            <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
              Korean Smile Dental was founded on a simple idea: that going to the dentist
              should feel as considered as a visit to a luxury skincare clinic in Seoul.
              Every detail — from the lighting in the room to the finish of a single veneer —
              is designed around your comfort and the result you came for.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img src={clinic} alt="Clinic interior" loading="lazy" width={1280} height={960} className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      <section className="py-28 container-luxe">
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {[
            { n: "01", t: "Clinical precision", b: "Korean-trained protocols, modern instruments and digital imaging at every stage." },
            { n: "02", t: "Considered design", b: "A calm, minimal environment — the opposite of a typical clinic visit." },
            { n: "03", t: "Patient first", b: "Unhurried consultations, transparent pricing, and one dedicated team." },
          ].map((p) => (
            <div key={p.n} className="bg-background p-10">
              <div className="eyebrow mb-4">{p.n}</div>
              <h3 className="font-display text-2xl">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 bg-muted">
        <div className="container-luxe grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img src={dentist} alt="Lead dentist" loading="lazy" width={1024} height={1280} className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">Philosophy</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              The most beautiful smile is one that <span className="italic">looks like yours.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Cosmetic dentistry should never feel cosmetic. Our team studies the proportions of your face,
              the line of your lip, the colour of your skin — and shapes a result that feels effortlessly natural.
            </p>
          </div>
        </div>
      </section>

      <section className="py-28 container-luxe text-center">
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mx-auto">Visit us.</h2>
        <p className="mt-6 text-muted-foreground max-w-md mx-auto">
          Begin with a quiet, no-pressure consultation. We'll listen first.
        </p>
        <Link to="/booking" className="btn-primary mt-10">Book a Visit</Link>
      </section>
    </>
  );
}
