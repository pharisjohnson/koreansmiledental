import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Korean Smile Dental" },
      { name: "description", content: "Get in touch with Korean Smile Dental. Appointments, enquiries and visits — by appointment only." },
      { property: "og:title", content: "Contact — Korean Smile Dental" },
      { property: "og:description", content: "Reach the Korean Smile Dental team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-secondary py-28">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Contact</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            We'd love to <span className="italic">hear from you.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 container-luxe grid md:grid-cols-2 gap-px bg-border border border-border">
        {[
          { icon: MapPin, title: "Visit", lines: ["By appointment only", "Address shared upon booking"] },
          { icon: Clock, title: "Hours", lines: ["Mon – Fri · 09:00 – 19:00", "Sat · 10:00 – 16:00"] },
          { icon: Phone, title: "Call", lines: ["Available on request", "Reach us by email first"] },
          { icon: Mail, title: "Email", lines: ["hello@koreansmiledental.com", "Replies within one business day"] },
        ].map(({ icon: Icon, title, lines }) => (
          <div key={title} className="bg-background p-12">
            <Icon size={20} strokeWidth={1.4} />
            <h3 className="font-display text-2xl mt-4">{title}</h3>
            {lines.map((l) => (
              <p key={l} className="text-sm text-muted-foreground mt-2 leading-relaxed">{l}</p>
            ))}
          </div>
        ))}
      </section>

      <section className="py-28 container-luxe text-center">
        <a
          href="https://www.instagram.com/_koreansmiledental/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 link-underline text-sm tracking-[0.18em] uppercase font-medium"
        >
          <Instagram size={16} /> Follow on Instagram — @_koreansmiledental
        </a>
      </section>
    </>
  );
}
