import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Instagram — Korean Smile Dental" },
      { name: "description", content: "Follow Korean Smile Dental on Instagram — @_koreansmiledental. Real smiles, treatments and behind-the-scenes from our Kilimani clinic." },
      { property: "og:title", content: "Instagram — Korean Smile Dental" },
      { property: "og:description", content: "Real smiles and stories from @_koreansmiledental." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: InstagramPage,
});

const INSTAGRAM_URL = "https://www.instagram.com/_koreansmiledental/";

function InstagramPage() {
  return (
    <>
      <section className="bg-secondary py-28">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Instagram</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            Real smiles, <span className="italic">shared daily.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
            Follow <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-underline">@_koreansmiledental</a> for
            patient transformations, treatment insights and a glimpse inside our Kilimani clinic.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex"
          >
            <Instagram size={16} /> Follow on Instagram
          </a>
        </div>
      </section>

      <section className="py-20 container-luxe">
        <div className="max-w-[540px] mx-auto bg-muted border border-border">
          <iframe
            src="https://www.instagram.com/_koreansmiledental/embed"
            title="Korean Smile Dental on Instagram"
            className="w-full"
            style={{ height: "780px", border: 0 }}
            loading="lazy"
            scrolling="no"
            allowTransparency
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-[0.18em] uppercase">
          87 posts · 1,141 followers · Kilimani, Nairobi
        </p>
      </section>

      <section className="py-28 container-luxe text-center bg-muted">
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mx-auto leading-tight">
          Could yours be next?
        </h2>
        <Link to="/booking" className="btn-primary mt-10">Start your transformation</Link>
      </section>
    </>
  );
}
