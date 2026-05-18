import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Korean Smile Dental | Kilimani, Nairobi" },
      { name: "description", content: "Visit Korean Smile Dental Clinic on Ndemi Road, Kilimani, Nairobi. Call or WhatsApp 0746 888 934 to book your consultation." },
      { property: "og:title", content: "Contact — Korean Smile Dental" },
      { property: "og:description", content: "Ndemi Road, Kilimani, Nairobi · 0746 888 934" },
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
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
            Visit our modern Kilimani clinic, or reach our team directly on call or WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-24 container-luxe grid md:grid-cols-2 gap-px bg-border border border-border">
        {[
          { icon: MapPin, title: "Visit", lines: ["Ndemi Road, Kilimani", "Nairobi, Kenya"] },
          { icon: Clock, title: "Hours", lines: ["Mon – Fri · 09:00 – 19:00", "Sat · 10:00 – 16:00"] },
          { icon: Phone, title: "Call", lines: ["0746 888 934", "Speak directly with our team"] },
          { icon: MessageCircle, title: "WhatsApp", lines: ["0746 888 934", "Fastest way to book a consultation"] },
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

      <section className="py-28 container-luxe">
        <div className="aspect-[16/9] w-full border border-border overflow-hidden">
          <iframe
            title="Korean Smile Dental — Ndemi Road, Kilimani, Nairobi"
            src="https://www.google.com/maps?q=Ndemi+Road,+Kilimani,+Nairobi&output=embed"
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="py-20 container-luxe text-center flex flex-col sm:flex-row items-center justify-center gap-8">
        <a
          href="https://www.instagram.com/_koreansmiledental/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 link-underline text-sm tracking-[0.18em] uppercase font-medium"
        >
          <Instagram size={16} /> @_koreansmiledental
        </a>
        <a
          href="https://www.facebook.com/900985239767350"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 link-underline text-sm tracking-[0.18em] uppercase font-medium"
        >
          <Facebook size={16} /> Facebook
        </a>
      </section>
    </>
  );
}
